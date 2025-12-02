import { motion } from 'motion/react';
import { Code, Terminal, Cpu, Rocket, GitBranch, Zap, Eye, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { Typewriter } from './Typewriter';

export function TechSection() {
  const articles = [
    {
      id: 1,
      title: 'React 19 新特性完整解析',
      excerpt: '深入探討 React 19 帶來的革命性變化，包括 Server Components、新的 Hook 以及性能優化技巧...',
      category: 'React',
      date: '2024-11-28',
      views: 1243,
      tags: ['React', 'Frontend', 'JavaScript'],
      icon: '⚛️',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 2,
      title: 'TypeScript 高級類型系統實戰',
      excerpt: '掌握 TypeScript 的高級類型特性，包括泛型、條件類型、映射類型等進階技巧...',
      category: 'TypeScript',
      date: '2024-11-25',
      views: 987,
      tags: ['TypeScript', 'Programming'],
      icon: '📘',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 3,
      title: 'Next.js 14 App Router 最佳實踐',
      excerpt: 'App Router 的完整指南，從基礎到進階，包含 Server Actions、Streaming 等實戰經驗...',
      category: 'Next.js',
      date: '2024-11-22',
      views: 1567,
      tags: ['Next.js', 'React', 'SSR'],
      icon: '▲',
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 4,
      title: 'Tailwind CSS 性能優化指南',
      excerpt: '學習如何優化 Tailwind CSS 的構建大小，提升載入速度，並實現最佳的開發體驗...',
      category: 'CSS',
      date: '2024-11-20',
      views: 823,
      tags: ['CSS', 'Tailwind', 'Performance'],
      icon: '🎨',
      color: 'from-sky-400 to-cyan-500'
    },
    {
      id: 5,
      title: 'Web 動畫完全指南',
      excerpt: '從 CSS 動畫到 Motion，全面掌握現代 Web 動畫技術，打造流暢的用戶體驗...',
      category: 'Animation',
      date: '2024-11-18',
      views: 1102,
      tags: ['Animation', 'Motion', 'UX'],
      icon: '✨',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 6,
      title: '前端性能監控與優化',
      excerpt: '建立完整的前端性能監控系統，識別瓶頸並實施有效的優化策略...',
      category: 'Performance',
      date: '2024-11-15',
      views: 756,
      tags: ['Performance', 'Monitoring'],
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const techStack = [
    { icon: Code, label: 'Vue3', color: 'bg-emerald-500' },
    { icon: GitBranch, label: 'Git', color: 'bg-orange-500' },
    { icon: Terminal, label: '.NET', color: 'bg-purple-600' },
    { icon: Code, label: 'C#', color: 'bg-violet-600' },
    { icon: Cpu, label: 'SQL', color: 'bg-blue-600' }
  ];

  const codeText = `const 歡迎 = () => {
  return (
    <div>
      <h1>持續學習，不斷進步 🚀</h1>
      <p>分享知識，共同成長 💡</p>
    </div>
  );
};`;

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-12 bg-gray-900 rounded-3xl p-8 overflow-hidden relative"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <pre className="text-green-400 font-mono overflow-x-auto">
          <code>
            <Typewriter text={codeText} delay={30} />
          </code>
        </pre>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white overflow-hidden relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 text-9xl opacity-10"
        >
          ⚙️
        </motion.div>

        <h3 className="mb-6 relative z-10">技術棧</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center group cursor-pointer"
              >
                <div className={`${tech.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-2xl transition-shadow`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  {tech.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Article */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12 relative overflow-hidden rounded-3xl"
      >
        <div className={`bg-gradient-to-r ${articles[0].color} p-8 md:p-12`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-white/90 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                  {articles[0].category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {articles[0].date}
                </span>
              </div>

              <h2 className="text-white mb-4">{articles[0].title}</h2>
              <p className="text-white/90 mb-6">
                {articles[0].excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {articles[0].tags.map((tag, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                >
                  <Code className="w-5 h-5" />
                  閱讀文章
                </motion.button>
                <span className="flex items-center gap-1 text-white">
                  <Eye className="w-4 h-4" />
                  {articles[0].views} 次觀看
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="text-9xl text-center">
                {articles[0].icon}
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 text-6xl opacity-50"
              >
                💡
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, delay: 1, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 text-6xl opacity-50"
              >
                🚀
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1).map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
              <div className={`bg-gradient-to-br ${article.color} p-8 relative overflow-hidden`}>
                <motion.div
                  className="text-6xl text-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring" }}
                >
                  {article.icon}
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 text-white/30 text-4xl"
                >
                  ✦
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-orange-500">{article.category}</span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </span>
                </div>

                <h3 className="text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    閱讀 →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}