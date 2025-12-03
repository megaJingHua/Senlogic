import { motion } from 'motion/react';
import { Star, Trophy, Target, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { MemoryGame } from './MemoryGame';
import { MathAdventure } from './MathAdventure';
import { AlphabetForest } from './AlphabetForest';
import { PuzzleParadise } from './PuzzleParadise';
import { MusicRhythm } from './MusicRhythm';
import { ScienceExperiment } from './ScienceExperiment';

export function GamesSection() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

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
      id: 2,
      title: '字母森林',
      description: '探索字母的奇妙世界',
      emoji: '🌳',
      color: 'from-green-300 to-emerald-400',
      difficulty: '簡單',
      points: 120
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
      id: 4,
      title: '拼圖樂園',
      description: '動手完成美麗的拼圖',
      emoji: '🧩',
      color: 'from-blue-300 to-cyan-400',
      difficulty: '簡單',
      points: 80
    },
    {
      id: 5,
      title: '音樂節奏',
      description: '跟著節奏一起跳舞',
      emoji: '🎵',
      color: 'from-pink-300 to-rose-400',
      difficulty: '中等',
      points: 130
    },
    {
      id: 6,
      title: '科學實驗',
      description: '探索科學的神奇魔力',
      emoji: '🔬',
      color: 'from-teal-300 to-green-400',
      difficulty: '困難',
      points: 200
    }
  ];

  const achievements = [
    { icon: Trophy, label: '遊戲達人', count: 12 },
    { icon: Star, label: '每日挑戰', count: 45 },
    { icon: Target, label: '完美通關', count: 8 },
    { icon: Zap, label: '連勝紀錄', count: 23 }
  ];

  // 根據選擇的遊戲顯示對應的遊戲畫面
  if (selectedGame === 1) {
    return <MathAdventure onClose={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 2) {
    return <AlphabetForest onClose={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 3) {
    return <MemoryGame onClose={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 4) {
    return <PuzzleParadise onClose={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 5) {
    return <MusicRhythm onClose={() => setSelectedGame(null)} />;
  }
  if (selectedGame === 6) {
    return <ScienceExperiment onClose={() => setSelectedGame(null)} />;
  }

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
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
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
          <span className="text-gray-600">前3名可獲得獎勵！</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {['🥇 小明', '🥈 小華', '🥉 小美'].map((player, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 text-center shadow-md"
            >
              <div className="text-3xl mb-2">{player}</div>
              <div className="text-orange-500">{5000 - index * 500} 分</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}