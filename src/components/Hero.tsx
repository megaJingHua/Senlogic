import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const bounceAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>歡迎來到快樂學習園地</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-amber-900 mb-6"
          >
            讓孩子在遊戲中
            <br />
            <span className="text-orange-500">快樂學習成長</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8"
          >
            提供有趣的互動遊戲、專業的教養建議，以及豐富的技術分享。
            讓家長與孩子一起探索、學習、成長。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/games')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              開始遊戲
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/parenting')}
              className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              查看教養文章
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-10 left-10 text-6xl"
          >
            🎮
          </motion.div>

          <motion.div
            animate={bounceAnimation}
            className="absolute top-0 right-10 text-5xl"
          >
            🎨
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-0 text-4xl"
          >
            ⭐
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl p-8 shadow-xl flex items-center justify-center"
              >
                <div className="text-8xl">🎯</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="bg-gradient-to-br from-green-200 to-green-300 rounded-3xl p-8 shadow-xl flex items-center justify-center"
              >
                <div className="text-8xl">🌈</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
                className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl p-8 shadow-xl flex items-center justify-center"
              >
                <div className="text-8xl">🎨</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl p-8 shadow-xl flex items-center justify-center"
              >
                <div className="text-8xl">🚀</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid md:grid-cols-3 gap-6 mt-20"
      >
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => navigate('/games')}
        >
          <div className="text-6xl mb-4">
            🎮
          </div>
          <h3 className="text-gray-900 mb-3">趣味遊戲</h3>
          <p className="text-gray-600 mb-4">
            透過精心設計的互動遊戲，讓學習變得更有趣！包含數學、語文、記憶力訓練等多種類型。
          </p>
          <div className="flex items-center gap-2 text-orange-500">
            <Star className="w-4 h-4 fill-current" />
            <span>6 款精選遊戲</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => navigate('/parenting')}
        >
          <div className="text-6xl mb-4">
            💝
          </div>
          <h3 className="text-gray-900 mb-3">教養指南</h3>
          <p className="text-gray-600 mb-4">
            專業的育兒建議與實用技巧，幫助您培養孩子的品格、溝通能力與情緒管理。
          </p>
          <div className="flex items-center gap-2 text-pink-500">
            <Heart className="w-4 h-4 fill-current" />
            <span>精選教養文章</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => navigate('/tech')}
        >
          <div className="text-6xl mb-4">
            💻
          </div>
          <h3 className="text-gray-900 mb-3">技術分享</h3>
          <p className="text-gray-600 mb-4">
            前端開發技術心得、最佳實踐與實戰經驗，涵蓋 Vue3、.NET、SQL 等主流技術。
          </p>
          <div className="flex items-center gap-2 text-cyan-500">
            <Zap className="w-4 h-4 fill-current" />
            <span>技術深度文章</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
