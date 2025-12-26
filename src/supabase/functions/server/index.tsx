import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ff545811/health", (c) => {
  return c.json({ status: "ok" });
});

// Helper to get Supabase Client
const getSupabaseClient = async () => {
  const { createClient } = await import("jsr:@supabase/supabase-js@2.49.8");
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
};

// ==========================================
// TABLE 1: REGISTERED ACCOUNTS (Users)
// Storage: Supabase Auth + KV Mirror
// Key Schema: user:profile:{userId}
// Value: { id, email, name, createdAt }
// ==========================================

// Sign Up Route (Auto Confirm)
app.post("/make-server-ff545811/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing email or password" }, 400);
    }

    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Parent' },
      email_confirm: true
    });

    if (error) {
      throw error;
    }

    // Create Profile in KV "Table"
    if (data.user) {
      await kv.set(`user:profile:${data.user.id}`, {
        id: data.user.id,
        email: data.user.email,
        name: name || 'Parent',
        createdAt: Date.now()
      });
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: error.message }, 400);
  }
});

// ==========================================
// TABLE 2: USER SETTINGS
// Storage: KV Store
// Key Schema: user:settings:{userId}
// Value: { limit: number, updatedAt: number }
// ==========================================

// Get User Settings (Time Limit)
app.get("/make-server-ff545811/settings/time-limit", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ error: "Unauthorized" }, 401);

    const token = authHeader.split(" ")[1];
    const supabase = await getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return c.json({ error: "Invalid token" }, 401);
    }

    const settings = await kv.get(`user:settings:${user.id}`);
    
    return c.json({ 
      success: true, 
      limit: settings?.limit || 0 // 0 means no limit
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

// Save User Settings (Time Limit)
app.post("/make-server-ff545811/settings/time-limit", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ error: "Unauthorized" }, 401);

    const token = authHeader.split(" ")[1];
    const supabase = await getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return c.json({ error: "Invalid token" }, 401);
    }

    const { limit } = await c.req.json();
    
    // Save to KV "Table"
    await kv.set(`user:settings:${user.id}`, { 
      limit: parseInt(limit) || 0,
      updatedAt: Date.now()
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Save settings error:", error);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

// ==========================================
// TABLE 3: ARTICLE VIEWS
// Storage: KV Store
// Key Schema: article:views:{articleId}
// Value: number
// ==========================================

// Get all article views
app.get("/make-server-ff545811/articles/views", async (c) => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from("kv_store_ff545811")
      .select("key, value")
      .like("key", "article:views:%");
      
    if (error) throw error;
    
    const viewsMap: Record<string, number> = {};
    data?.forEach(item => {
      const id = item.key.replace("article:views:", "");
      viewsMap[id] = Number(item.value);
    });
    
    return c.json({ success: true, data: viewsMap });
  } catch (error) {
    console.error("Get all views error:", error);
    return c.json({ error: "Failed to fetch views" }, 500);
  }
});

// Increment Article Views
app.post("/make-server-ff545811/articles/:id/views", async (c) => {
  try {
    const articleId = c.req.param("id");
    if (!articleId) return c.json({ error: "Missing article ID" }, 400);

    const key = `article:views:${articleId}`;
    const current = await kv.get(key);
    const views = (typeof current === 'number' ? current : 0) + 1;
    
    await kv.set(key, views);
    
    return c.json({ success: true, views });
  } catch (error) {
    console.error("Increment views error:", error);
    return c.json({ error: "Failed to increment views" }, 500);
  }
});

// ==========================================
// OTHER TABLES (Games, Lottery, etc.)
// ==========================================

// Save Game Score & Update Leaderboard
app.post("/make-server-ff545811/game/score", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ error: "Unauthorized" }, 401);

    const token = authHeader.split(" ")[1];
    const supabase = await getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return c.json({ error: "Invalid token" }, 401);
    }

    const body = await c.req.json();
    const { gameId, score, gameName } = body;
    
    if (!gameId || score === undefined) {
      return c.json({ error: "Missing gameId or score" }, 400);
    }

    const timestamp = Date.now();
    const userName = user.user_metadata?.name || 'Unknown Player';

    // 1. Save individual score record
    const scoreRecord = {
      userId: user.id,
      userName,
      gameId,
      score,
      timestamp
    };
    await kv.set(`score:${gameId}:${timestamp}:${user.id}`, scoreRecord);

    // 2. Update Daily Challenge Count
    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `daily_challenge:${today}:${user.id}`;
    const currentDaily = await kv.get(dailyKey) || { count: 0, points: 0 };
    await kv.set(dailyKey, {
      count: currentDaily.count + 1,
      points: currentDaily.points + score,
      lastPlayed: timestamp
    });

    // 3. Update Weekly Leaderboard
    const leaderboardKey = `leaderboard:weekly:${gameId}`;
    let leaderboard = await kv.get(leaderboardKey) || [];
    
    // Add new score
    leaderboard.push({
      userName,
      score,
      timestamp
    });

    // Sort by score desc, then timestamp asc
    leaderboard.sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);

    // Keep top 10
    leaderboard = leaderboard.slice(0, 10);

    await kv.set(leaderboardKey, leaderboard);

    return c.json({ success: true, leaderboard });

  } catch (error) {
    console.error("Save score error:", error);
    return c.json({ error: "Failed to save score" }, 500);
  }
});

// Get Leaderboard
app.get("/make-server-ff545811/game/leaderboard", async (c) => {
  try {
    const gameId = c.req.query("gameId");
    
    if (gameId) {
      const leaderboard = await kv.get(`leaderboard:weekly:${gameId}`) || [];
      return c.json({ success: true, data: leaderboard });
    }

    const leaderboard1 = await kv.get(`leaderboard:weekly:1`) || []; // Math
    const leaderboard3 = await kv.get(`leaderboard:weekly:3`) || []; // Memory

    // Combine and sort
    let combined = [...leaderboard1, ...leaderboard3];
    combined.sort((a, b) => b.score - a.score);
    combined = combined.slice(0, 3);

    return c.json({ success: true, data: combined });

  } catch (error) {
    console.error("Get leaderboard error:", error);
    return c.json({ error: "Failed to fetch leaderboard" }, 500);
  }
});

// Get Daily Challenge Stats
app.get("/make-server-ff545811/game/daily-challenge", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    // If not logged in, return 0
    if (!authHeader) return c.json({ success: true, count: 0, points: 0 });

    const token = authHeader.split(" ")[1];
    const supabase = await getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return c.json({ success: true, count: 0, points: 0 });
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `daily_challenge:${today}:${user.id}`;
    const stats = await kv.get(dailyKey) || { count: 0, points: 0 };

    return c.json({ success: true, ...stats });
  } catch (error) {
    console.error("Get daily challenge error:", error);
    return c.json({ error: "Failed to fetch daily stats" }, 500);
  }
});

// Save lottery result
app.post("/make-server-ff545811/lottery/save", async (c) => {
  try {
    const body = await c.req.json();
    const { lotteryId, data } = body;

    if (!lotteryId || !data) {
      return c.json({ error: "Missing lotteryId or data" }, 400);
    }
    
    // Save to KV store with prefix "lottery:"
    await kv.set(`lottery:${lotteryId}`, {
      ...data,
      savedAt: Date.now()
    });

    return c.json({ 
      success: true, 
      message: "Lottery result saved successfully",
      lotteryId 
    });
  } catch (error) {
    console.error("Error saving lottery result:", error);
    return c.json({ 
      error: "Failed to save lottery result", 
      details: error.message 
    }, 500);
  }
});

// Delete lottery result
app.delete("/make-server-ff545811/lottery/:id", async (c) => {
  try {
    const lotteryId = c.req.param("id");

    if (!lotteryId) {
      return c.json({ error: "Missing lottery ID" }, 400);
    }

    // Delete from KV store
    await kv.del(`lottery:${lotteryId}`);

    return c.json({ 
      success: true, 
      message: "Lottery result deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting lottery result:", error);
    return c.json({ 
      error: "Failed to delete lottery result", 
      details: error.message 
    }, 500);
  }
});

// Get lottery result by ID
app.get("/make-server-ff545811/lottery/:id", async (c) => {
  try {
    const lotteryId = c.req.param("id");

    if (!lotteryId) {
      return c.json({ error: "Missing lottery ID" }, 400);
    }

    const result = await kv.get(`lottery:${lotteryId}`);

    if (!result) {
      return c.json({ error: "Lottery not found" }, 404);
    }

    return c.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error("Error fetching lottery result:", error);
    return c.json({ 
      error: "Failed to fetch lottery result", 
      details: error.message 
    }, 500);
  }
});

// Get all lottery results (recent first)
app.get("/make-server-ff545811/lottery", async (c) => {
  try {
    // Get all lottery records
    const results = await kv.getByPrefix("lottery:");

    // If no results, return empty array
    if (!results || results.length === 0) {
      return c.json({ 
        success: true, 
        data: [],
        count: 0
      });
    }

    // getByPrefix only returns values, not keys
    // We need to get the full records with keys
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from("kv_store_ff545811")
      .select("key, value")
      .like("key", "lottery:%");

    if (error) {
      console.error("Error fetching lottery results from DB:", error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return c.json({ 
        success: true, 
        data: [],
        count: 0
      });
    }

    // Sort by savedAt timestamp (newest first)
    const sorted = data
      .map(item => ({
        id: item.key.replace("lottery:", ""),
        ...item.value
      }))
      .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));

    return c.json({ 
      success: true, 
      data: sorted,
      count: sorted.length
    });
  } catch (error) {
    console.error("Error fetching lottery results:", error);
    return c.json({ 
      error: "Failed to fetch lottery results", 
      details: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch);