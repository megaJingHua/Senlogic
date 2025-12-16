import { motion } from "motion/react";
import {
  Heart,
  BookOpen,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollToTop } from "./ScrollToTop";

export function ParentingSection() {
  const navigate = useNavigate();
  const articles = [
    {
      id: 8,
      title: "寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了",
      excerpt:
        "成為媽媽後，我才真正明白——原來世界上最累、最甜、最難、最有力量的角色，就是「媽媽」。這是送給每一位努力的媽媽的十句話，希望你在最累的時候，能重新看見自己的力量。",
      category: "親子關係",
      readTime: "8 分鐘",
      likes: 567,
      image:
        "https://images.unsplash.com/photo-1762174241767-498fbe248a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZCUyMHdhcm0lMjBodWclMjBjb21mb3J0fGVufDF8fHx8MTc2NTE4MzEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-amber-300 to-orange-400",
    },
    {
      id: 7,
      title: "三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽",
      excerpt:
        "三歲的孩子不是在挑戰你，他是在尋找安全的大人。當孩子做出讓你困擾的行為時，他其實是在問：「媽媽，你會因為我做錯事就不愛我嗎？」「界線在哪裡？」",
      category: "情緒教育",
      readTime: "10 分鐘",
      likes: 489,
      image:
        "https://images.unsplash.com/photo-1587235587178-e4a6dbe63726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjB0b2RkbGVyJTIwbG92ZXxlbnwxfHx8fDE3NjUxNzI4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-rose-300 to-pink-400",
    },
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

      {/* Categories and About Author */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Categories - Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 grid grid-cols-2 gap-4"
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

        {/* About Author - Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl shadow-xl p-6 h-full flex flex-col">
            <div className="flex flex-col items-center text-center mb-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-4xl mb-3 shadow-xl"
              >
                👩‍💻
              </motion.div>
              <h3 className="text-gray-900 mb-2">
                寶哥媽咪Mega）
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-white/60 px-2 py-1 rounded-full text-gray-700">
                  工程師
                </span>
                <span className="bg-white/60 px-2 py-1 rounded-full text-gray-700">
                  媽媽
                </span>
                <span className="bg-white/60 px-2 py-1 rounded-full text-gray-700">
                  學習者
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-amber-900 mb-2">關於作者</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                每天在工程師、媽媽身份間切換，思考怎麼讓孩子更有安全感、界線感、也更會用邏輯理解世界。平常熱愛自己的工作，下班盡全力陪小孩，假日認真出去玩!
              </p>
              <div className="bg-white/60 rounded-2xl p-3 border-l-4 border-orange-500">
                <p className="text-gray-600 italic">
                  所有文章皆由作者與 AI
                  共同討論、編寫，再由作者依照親子實戰經驗調整，以呈現最貼近育兒現場的內容。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
              <h3 className="text-amber-900 mb-4">
                三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽
              </h3>
              <p className="text-gray-700 mb-6">
                三歲的孩子不是在挑戰你，他是在尋找安全的大人。當孩子做出讓你困擾的行為時，他其實是在問：「媽媽，你會因為我做錯事就不愛我嗎？」「界線在哪裡？」
              </p>
              <div className="flex items-center gap-6 mb-6">
                <span className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />10 分鐘閱讀
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-4 h-4 fill-current text-rose-500" />
                  489 個讚
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                onClick={() => navigate(`/parenting/${7}`)}
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
            onClick={() => navigate(`/parenting/${article.id}`)}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute top-4 left-4 bg-gradient-to-r ${article.color} text-white px-4 py-1 rounded-full`}
                >
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
      <ScrollToTop />
    </section>
  );
}