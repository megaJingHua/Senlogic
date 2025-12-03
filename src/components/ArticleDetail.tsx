import { motion } from 'motion/react';
import { ArrowLeft, Clock, Heart, Share2, Bookmark, User, Calendar, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleDetailProps {
  articleId: number;
  onBack: () => void;
}

export function ArticleDetail({ articleId, onBack }: ArticleDetailProps) {
  const articlesData: { [key: number]: any } = {
    1: {
      id: 1,
      title: '如何培養孩子的自律能力',
      category: '品格教育',
      readTime: '5 分鐘',
      likes: 234,
      date: '2024年11月15日',
      author: '李育兒老師',
      authorBio: '資深兒童教育專家，擁有20年幼教經驗',
      image: 'https://images.unsplash.com/photo-1758598737528-77505cac475f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMHJlYWRpbmd8ZW58MXx8fHwxNzY0NjU1OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['自律', '品格教育', '習慣養成', '親子教養'],
      content: [
        {
          type: 'paragraph',
          text: '自律是孩子成長過程中最重要的能力之一。一個擁有良好自律能力的孩子，不僅在學習上表現優異，在人際關係和未來的職場發展上也會有更好的表現。那麼，作為家長，我們該如何培養孩子的自律能力呢？'
        },
        {
          type: 'heading',
          text: '一、從小事做起，建立良好習慣'
        },
        {
          type: 'paragraph',
          text: '自律的培養需要從日常生活中的小事開始。比如每天固定時間起床、睡前整理書包、完成作業後才能玩耍等。這些看似簡單的規矩，實際上是在幫助孩子建立時間觀念和責任感。'
        },
        {
          type: 'list',
          items: [
            '設定明確的作息時間表，並嚴格執行',
            '鼓勵孩子自己整理房間和玩具',
            '讓孩子參與家務分工，培養責任感',
            '建立獎勵機制，強化正向行為'
          ]
        },
        {
          type: 'heading',
          text: '二、以身作則，成為孩子的榜樣'
        },
        {
          type: 'paragraph',
          text: '孩子最好的老師就是父母。如果我們希望孩子擁有自律的能力，首先自己要做到。當孩子看到父母也在堅持運動、準時作息、有計劃地完成工作時，他們自然會模仿這些行為。'
        },
        {
          type: 'quote',
          text: '父母的言行舉止，是孩子最生動的教材。'
        },
        {
          type: 'heading',
          text: '三、給予適度的自由與選擇'
        },
        {
          type: 'paragraph',
          text: '自律不等於控制。我們需要在規矩和自由之間找到平衡。給孩子一些選擇的空間，讓他們學會為自己的決定負責。比如可以讓孩子選擇先做哪一項作業，或是週末想要進行什麼活動。'
        },
        {
          type: 'paragraph',
          text: '通過這些方法，我們可以逐步培養孩子的自律能力。記住，這是一個長期的過程，需要耐心和堅持。但當你看到孩子能夠獨立管理自己的時間、完成自己的責任時，所有的付出都是值得的。'
        }
      ]
    }
  };

  const article = articlesData[articleId] || articlesData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="mb-8 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              返回文章列表
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-white mb-6 max-w-4xl">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {article.readTime}閱讀
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  {article.likes} 個讚
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
                {article.tags.map((tag: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-1 bg-orange-100 text-orange-700 px-4 py-2 rounded-full"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.content.map((block: any, index: number) => {
                  if (block.type === 'paragraph') {
                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-gray-700 mb-6 leading-relaxed"
                      >
                        {block.text}
                      </motion.p>
                    );
                  }
                  
                  if (block.type === 'heading') {
                    return (
                      <motion.h2
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-amber-900 mt-8 mb-4"
                      >
                        {block.text}
                      </motion.h2>
                    );
                  }
                  
                  if (block.type === 'list') {
                    return (
                      <motion.ul
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-3 mb-6 ml-6"
                      >
                        {block.items.map((item: string, i: number) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                            className="text-gray-700 flex items-start gap-3"
                          >
                            <span className="text-orange-500 mt-1">✓</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    );
                  }
                  
                  if (block.type === 'quote') {
                    return (
                      <motion.blockquote
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="border-l-4 border-orange-500 bg-orange-50 p-6 my-8 rounded-r-2xl"
                      >
                        <p className="text-gray-800 italic">"{block.text}"</p>
                      </motion.blockquote>
                    );
                  }
                  
                  return null;
                })}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-200"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5" />
                  喜歡這篇文章
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Bookmark className="w-5 h-5" />
                  收藏
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  分享
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Popular Articles */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">熱門文章</h3>
              <div className="space-y-4">
                {[
                  { title: '親子溝通的黃金法則', views: '1.2k' },
                  { title: '培養孩子的創造力', views: '980' },
                  { title: '情緒管理從小開始', views: '850' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer group"
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                        {item.title}
                      </div>
                      <div className="text-gray-500">{item.views} 次閱讀</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl shadow-xl p-6 text-white">
              <div className="text-6xl mb-4 text-center">📧</div>
              <h3 className="text-white mb-2 text-center">訂閱電子報</h3>
              <p className="text-white/90 mb-4 text-center">
                每週收到最新的教養文章
              </p>
              <input
                type="email"
                placeholder="輸入您的電子郵件"
                className="w-full px-4 py-3 rounded-full mb-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-orange-500 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                立即訂閱
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}