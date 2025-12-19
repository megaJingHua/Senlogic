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

    // Sort by savedAt timestamp (newest first)
    const sorted = results
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