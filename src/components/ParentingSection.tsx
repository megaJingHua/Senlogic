import { motion } from "motion/react";
import {
  Heart,
  BookOpen,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
  Eye,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollToTop } from "./ScrollToTop";
import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function ParentingSection() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [articleViews, setArticleViews] = useState<Record<string, number>>({});
  
  // Fetch dynamic view counts
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ff545811/articles/views`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        const result = await response.json();
        if (result.success && result.data) {
          setArticleViews(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch article views:", error);
      }
    };
    
    fetchViews();
  }, []);

  const articles = [
    {
      id: 9,
      title: "高敏兒不是問題，是天賦：給父母的一封安心信",
      excerpt:
        "親愛的爸爸媽媽，當您看著自己的孩子，是否曾感到他們與眾不同？他們可能對微小的聲音特別敏感，在陌生環境中顯得退縮，或是對他人的情緒有著異於常人的洞察力。別擔心，這是一種獨特的天賦。",
      category: "情緒教育",
      readTime: "12 分鐘",
      image: "https://images.unsplash.com/photo-1532679839948-7ebc758d26b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG91Z2h0ZnVsJTIwY2hpbGQlMjBuYXR1cmUlMjBzZW5zaXRpdmV8ZW58MXx8fHwxNzY2NDc3MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-green-300 to-emerald-400",
    },
    {
      id: 8,
      title: "寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了",
      excerpt:
        "成為媽媽後，我才真正明白——原來世界上最累、最甜、最難、最有力量的角色，就是「媽媽」。這是送給每一位努力的媽媽的十句話，希望你在最累的時候，能重新看見自己的力量。",
      category: "親子關係",
      readTime: "8 分鐘",
      image:
        "https://images.unsplash.com/photo-1730632166954-80098b725e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBodWdnaW5nJTIwY2hpbGQlMjB3YXJtJTIwY29tZm9ydHxlbnwxfHx8fDE3NjY0NzczNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-amber-300 to-orange-400",
    },
    {
      id: 7,
      title: "三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽",
      excerpt:
        "三歲的孩子不是在挑戰你，他是在尋找安全的大人。當孩子做出讓你困擾的行為時，他其實是在問：「媽媽，你會因為我做錯事就不愛我嗎？」「界線在哪裡？」",
      category: "情緒教育",
      readTime: "10 分鐘",
      image:
        "https://images.unsplash.com/photo-1612191310678-6660188d61a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjB0YWxraW5nJTIwdG8lMjB0b2RkbGVyJTIwZ2VudGxlJTIwcGFyZW50aW5nfGVufDF8fHx8MTc2NjQ3NzM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-rose-300 to-pink-400",
    },
  ];

  // 計算分類文章數 (基於所有文章)
  const categoryStats = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryConfig: Record<string, any> = {
    '情緒教育': { icon: Heart, color: 'text-pink-500', bg: 'bg-pink-100' },
    '親子關係': { icon: Users, color: 'text-orange-500', bg: 'bg-orange-100' },
    '品格教育': { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
    '溝通技巧': { icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-100' }
  };

  const categories = Object.entries(categoryStats).map(([label, count]) => ({
    label,
    count,
    ...categoryConfig[label] || { icon: TrendingUp, color: 'text-gray-500', bg: 'bg-gray-100' }
  }));

  // Filter articles based on selected category
  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

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
        <h2 className="text-amber-900 mb-4">親子文章</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          陪伴您和孩子一起成長
        </p>
      </motion.div>

      {/* Author and Categories Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* About Author - Left Side (Main Focus) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl shadow-xl p-8 h-full flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-6xl mb-4 shadow-xl border-4 border-white/50"
              >
                👩‍💻
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                寶哥媽咪（Mega）
              </h3>
              <div className="flex flex-wrap gap-2 justify-center w-full max-w-[200px]">
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700 text-sm">
                  工程師
                </span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700 text-sm">
                  媽媽
                </span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-gray-700 text-sm">
                  學習者
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">關於作者</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                每天在工程師、媽媽身份間切換，思考怎麼讓孩子更有安全感、界線感、也更會用邏輯理解世界。平常熱愛自己的工作，下班盡全力陪小孩，假日認真出去玩!
              </p>
              <div className="bg-white/60 rounded-2xl p-4 border-l-4 border-orange-500 text-left">
                <p className="text-gray-600 italic">
                  所有文章皆由作者與 AI
                  共同討論、編寫，再由作者依照親子實戰經驗調整，以呈現最貼近育兒現場的內容。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories - Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 font-bold ml-2">文章分類</h3>
            {selectedCategory && (
              <button 
                onClick={() => setSearchParams({})}
                className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                清除篩選
              </button>
            )}
          </div>
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.label;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearchParams({ category: category.label })}
                className={`rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4 group w-full text-left ${
                  isSelected 
                    ? "bg-orange-50 ring-2 ring-orange-400" 
                    : "bg-white"
                }`}
              >
                <div className={`w-12 h-12 ${category.bg} rounded-xl flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className={`font-bold transition-colors ${
                    isSelected ? "text-orange-600" : "text-gray-900 group-hover:text-orange-500"
                  }`}>
                    {category.label}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {category.count} 篇文章
                  </div>
                </div>
                <div className={`transition-colors ${
                  isSelected ? "text-orange-500" : "text-gray-300 group-hover:text-orange-400"
                }`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-lg">
              {selectedCategory}
            </span>
            的文章
          </h3>
        </motion.div>
      )}

      {featuredArticle ? (
        <>
          {/* Featured Article */}
          <motion.div
            key={featuredArticle.id}
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
                    {selectedCategory ? "最新文章" : "精選文章"}
                  </span>
                  <h3 className="text-amber-900 mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />{featuredArticle.readTime}閱讀
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-4 h-4 text-blue-500" />
                      {articleViews[featuredArticle.id] || 0} 次閱讀
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                    onClick={() => navigate(`/parenting/${featuredArticle.id}`)}
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
                    src={featuredArticle.image}
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
            {gridArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/parenting/${article.id}`)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden shrink-0">
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

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-gray-500 mt-auto">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {articleViews[article.id] || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-3xl shadow-sm"
        >
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl text-gray-800 font-bold mb-2">此分類暫無文章</h3>
          <p className="text-gray-500">
            請選擇其他分類，或查看所有文章
          </p>
          <button 
            onClick={() => setSearchParams({})}
            className="mt-6 text-orange-500 hover:text-orange-600 underline"
          >
            查看所有文章
          </button>
        </motion.div>
      )}
      <ScrollToTop />
    </section>
  );
}