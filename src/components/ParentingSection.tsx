import { motion } from 'motion/react';
import { Heart, BookOpen, Users, MessageCircle, TrendingUp, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ParentingSectionProps {
  onArticleClick: (articleId: number) => void;
}

export function ParentingSection({ onArticleClick }: ParentingSectionProps) {
  const articles = [
    {
      id: 1,
      title: '如何培養孩子的自律能力',
      excerpt: '自律是孩子成長過程中最重要的能力之一。本文將分享如何透過日常生活中的小習慣，幫助孩子建立良好的自我管理能力...',
      category: '品格教育',
      readTime: '5 分鐘',
      likes: 234,
      image: 'https://images.unsplash.com/photo-1758598737528-77505cac475f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMHJlYWRpbmd8ZW58MXx8fHwxNzY0NjU1OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-pink-300 to-rose-400'
    },
    {
      id: 2,
      title: '親子溝通的黃金法則',
      excerpt: '良好的親子溝通是建立親密關係的基礎。了解這些溝通技巧，讓你和孩子的對話更有效、更溫暖...',
      category: '溝通技巧',
      readTime: '7 分鐘',
      likes: 189,
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBoYXBweXxlbnwxfHx8fDE3NjQ2NTU5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-blue-300 to-cyan-400'
    },
    {
      id: 3,
      title: '培養孩子的創造力與想像力',
      excerpt: '創造力是未來最重要的競爭力。透過這些方法，激發孩子無限的創意潛能...',
      category: '創意發展',
      readTime: '6 分鐘',
      likes: 312,
      image: 'https://images.unsplash.com/photo-1639454025136-d785f1776c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBnYW1lcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NDY1NTk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-purple-300 to-pink-400'
    },
    {
      id: 4,
      title: '建立良好的睡眠習慣',
      excerpt: '充足的睡眠對孩子的成長至關重要。學習如何幫助孩子建立規律的作息...',
      category: '健康生活',
      readTime: '4 分鐘',
      likes: 267,
      image: 'https://images.unsplash.com/photo-1758598737528-77505cac475f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMHJlYWRpbmd8ZW58MXx8fHwxNzY0NjU1OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-300 to-emerald-400'
    },
    {
      id: 5,
      title: '情緒管理從小開始',
      excerpt: '教導孩子認識和管理情緒，是給他們一生的禮物。這些實用策略將幫助你引導孩子...',
      category: '情緒教育',
      readTime: '8 分鐘',
      likes: 421,
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBoYXBweXxlbnwxfHx8fDE3NjQ2NTU5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-300 to-amber-400'
    },
    {
      id: 6,
      title: '數位時代的教養挑戰',
      excerpt: '如何在科技環境中保護孩子，同時培養他們的數位素養？找到平衡的關鍵...',
      category: '數位教養',
      readTime: '6 分鐘',
      likes: 356,
      image: 'https://images.unsplash.com/photo-1639454025136-d785f1776c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBnYW1lcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NDY1NTk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-teal-300 to-cyan-400'
    }
  ];

  const categories = [
    { icon: Heart, label: '品格教育', count: 24 },
    { icon: MessageCircle, label: '溝通技巧', count: 18 },
    { icon: Users, label: '親子關係', count: 32 },
    { icon: TrendingUp, label: '學習發展', count: 27 }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block text-6xl mb-4"
        >
          💝
        </motion.div>
        <h2 className="text-amber-900 mb-4">家長教養文章</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          專業的教養建議、實用的育兒技巧，陪伴您和孩子一起成長
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mb-3 group-hover:shadow-lg"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-gray-900 mb-1">{category.label}</div>
              <div className="text-gray-500">{category.count} 篇文章</div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* About Author */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-center text-center md:w-1/3">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-6xl mb-4 shadow-xl"
              >
                👩‍💻
              </motion.div>
              <h3 className="text-gray-900">寶哥媽咪（Mega）</h3>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700">工程師</span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700">媽媽</span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700">學習者</span>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-amber-900 mb-4">關於作者</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                每天在工程師、媽媽、學習者三種身份間切換。平常熱愛紀錄寶哥的成長與情緒教養細節，思考怎麼讓孩子更有安全感、界線感、也更會用邏輯理解世界。
              </p>
              <div className="bg-white/60 rounded-2xl p-4 border-l-4 border-orange-500">
                <p className="text-gray-600 italic">
                  所有文章皆由作者與 AI 共同討論、編寫，再由作者依照親子實戰經驗調整，以���現最貼近育兒現場的內容。
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Article */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl overflow-hidden shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full mb-4">
                精選文章
              </span>
              <h3 className="text-amber-900 mb-4">如何培養孩子的自律能力</h3>
              <p className="text-gray-700 mb-6">
                自律是孩子成長過程中最重要的能力之一。本文將分享如何透過日常生活中的小習慣，
                幫助孩子建立良好的自我管理能力，為未來奠定堅實的基礎。
              </p>
              <div className="flex items-center gap-6 mb-6">
                <span className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  5 分鐘閱讀
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-4 h-4 fill-current text-rose-500" />
                  234 個讚
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                onClick={() => onArticleClick(1)}
              >
                <BookOpen className="w-5 h-5" />
                閱讀全文
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={articles[0].image}
                alt="Featured Article"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-6xl"
            >
              📚
            </motion.div>
          </motion.div>
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
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${article.color} text-white px-4 py-1 rounded-full`}>
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {article.likes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}