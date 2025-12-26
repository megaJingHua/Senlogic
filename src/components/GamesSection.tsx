import { motion } from 'motion/react';
import { Star, Trophy, Target, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { MemoryGame } from './MemoryGame';
import { MathAdventure } from './MathAdventure';
import { LadderLottery } from './LadderLottery';
import { projectId } from '../utils/supabase/info';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ff545811`;

export function GamesSection() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [session, setSession] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [dailyStats, setDailyStats] = useState({ count: 0, points: 0 });

  const games = [
    {
      id: 1,
      title: '數字冒險',
      description: '在有趣的冒險中學習數學',
      emoji: '🔢',
      color: 'from-orange-300 to-amber-400',
      difficulty: '簡單',
      points: 100
    },
    {
      id: 3,
      title: '記憶大師',
      description: '訓練你的超強記憶力',
      emoji: '🧠',
      color: 'from-purple-300 to-pink-400',
      difficulty: '中等',
      points: 150
    },
    {
      id: 7,
      title: '抽禮物',
      description: '設定玩家和禮物，開始抽獎',
      emoji: '🎁',
      color: 'from-purple-300 to-pink-400',
      difficulty: '簡單',
      points: 180
    }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchDailyStats(session.access_token);
      }
    });

    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/game/leaderboard`);
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const fetchDailyStats = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/game/daily-challenge`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDailyStats({ count: data.count, points: data.points });
      }
    } catch (error) {
      console.error('Error fetching daily stats:', error);
    }
  };

  const handleSaveScore = async (gameId: number, score: number, gameName: string) => {
    if (!session) return;
    try {
      const res = await fetch(`${API_BASE}/game/score`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ gameId, score, gameName }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`分數已儲存！目前排名第 ${data.leaderboard.findIndex((p: any) => p.timestamp === Date.now()) + 1} 名`); // Rough estimate
        fetchLeaderboard();
        fetchDailyStats(session.access_token);
      }
    } catch (error) {
      console.error('Error saving score:', error);
      toast.error('無法儲存分數');
    }
  };

  // 根據選擇的遊戲顯示對應的遊戲畫面
  if (selectedGame === 1) {
    return <MathAdventure onClose={() => setSelectedGame(null)} onSaveScore={(score) => handleSaveScore(1, score, '數字冒險')} session={session} />;
  }
  if (selectedGame === 3) {
    return <MemoryGame onClose={() => setSelectedGame(null)} onSaveScore={(score) => handleSaveScore(3, score, '記憶大師')} session={session} />;
  }
  if (selectedGame === 7) {
    return <LadderLottery onClose={() => setSelectedGame(null)} session={session} />;
  }

  const achievements = [
    { icon: Trophy, label: '遊戲達人', count: leaderboard.length > 0 ? leaderboard.length * 5 : 12 }, // Mock or Real
    { icon: Star, label: '每日挑戰', count: dailyStats.count },
    { icon: Target, label: '累積積分', count: dailyStats.points },
    { icon: Zap, label: '連勝紀錄', count: 23 }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block text-6xl mb-4"
        >
          🎮
        </motion.div>
        <h2 className="text-amber-900 mb-4">小朋友好玩遊戲區</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          選擇你喜歡的遊戲，開始有趣的學習之旅！每個遊戲都能幫助你變得更聰明喔！
        </p>
        {!session && (
          <p className="text-sm text-orange-500 mt-2">
            💡 爸爸媽媽登入後，可以幫你記錄分數和查看排名喔！
          </p>
        )}
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-3"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-gray-900 mb-1">{achievement.label}</div>
              <div className="text-orange-500">{achievement.count}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className={`bg-gradient-to-br ${game.color} p-8 relative overflow-hidden`}>
                <motion.div
                  animate={
                    game.id === 1
                      ? { y: [0, -10, 0] }
                      : { rotate: [0, 10, -10, 0], y: [0, -10, 0] }
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-8xl text-center"
                >
                  {game.emoji}
                </motion.div>
                
                {/* Floating particles */}
                <motion.div
                  animate={{ y: [-20, -40, -20], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 text-2xl"
                >
                  ✨
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">{game.title}</h3>
                  <span className="text-orange-500 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {game.points}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    {game.difficulty}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedGame(game.id)}
                  >
                    開始玩
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              🏆
            </motion.div>
            <h3 className="text-amber-900">本週排行榜</h3>
          </div>
          <span className="text-gray-600">前10名可獲得獎勵！</span>
        </div>

        {leaderboard.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {leaderboard.map((player, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 text-center shadow-md relative overflow-hidden"
              >
                <div className="text-3xl mb-2">{player.userName}</div>
                <div className="text-orange-500 font-bold text-xl">{player.score} 分</div>
                
                {/* Rank Badge */}
                <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-400' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-400' : 'bg-blue-200'
                }`}>
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            目前還沒有人上榜，快來當第一名！
          </div>
        )}
      </motion.div>
    </section>
  );
}