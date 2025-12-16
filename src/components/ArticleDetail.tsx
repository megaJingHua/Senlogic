import { motion } from 'motion/react';
import { ArrowLeft, Clock, Heart, Share2, Bookmark, User, Calendar, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

export function ArticleDetail() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  
  // 當進入文章詳細頁面時自動捲動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);
  
  const articlesData: { [key: number]: any } = {
    8: {
      id: 8,
      title: '寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了',
      category: '親子關係',
      readTime: '8 分鐘',
      likes: 567,
      date: '2024年12月8日',
      author: '寶哥媽咪（Mega）',
      authorBio: '工程師媽媽，與孩子一起成長學習',
      image: 'https://images.unsplash.com/photo-1762174241767-498fbe248a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZCUyMHdhcm0lMjBodWclMjBjb21mb3J0fGVufDF8fHx8MTc2NTE4MzEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['媽媽', '自我照顧', '親子關係', '情緒支持', '溫柔教養'],
      content: [
        {
          type: 'paragraph',
          text: '成為媽媽後，我才真正明白——原來世界上最累、最甜、最難、最有力量的角色，就是「媽媽」。'
        },
        {
          type: 'paragraph',
          text: '在忙碌又混亂的日常裡，我們常常忘記了自己。忘記我們也會累、會痛、會受傷、會不安。於是，我想把這篇文章獻給每一位努力的媽媽。'
        },
        {
          type: 'paragraph',
          text: '這不是說教，而是一份陪伴。是十句送給你的話，希望你在最累的時候，能重新看見自己的力量。'
        },
        {
          type: 'heading',
          text: '🌸 1. 你不是沒做好，你只是一直在做。'
        },
        {
          type: 'paragraph',
          text: '別人看不見的那些堅持、忍耐、調整，其實每天都在消耗你。但你仍然持續付出，這本身就非常值得被肯定。'
        },
        {
          type: 'heading',
          text: '🌸 2. 孩子需要的不是完美媽媽，而是願意陪著他成長的你。'
        },
        {
          type: 'paragraph',
          text: '你已經足夠、已經很好。孩子感受得到你每天微小但真實的努力。'
        },
        {
          type: 'heading',
          text: '🌸 3. 覺得累，不代表你不愛孩子，只代表你也是人。'
        },
        {
          type: 'paragraph',
          text: '你不是機器，你有情緒、有需求、有界線。允許自己累，是一種勇氣。'
        },
        {
          type: 'heading',
          text: '🌸 4. 你不是孤單一個人，全世界的媽媽都曾在浴室或車裡悄悄崩潰過。'
        },
        {
          type: 'paragraph',
          text: '只是大家不常說出口。你並不奇怪，你只是太用力愛孩子了。'
        },
        {
          type: 'heading',
          text: '🌸 5. 休息不是逃避，而是把自己找回來。'
        },
        {
          type: 'paragraph',
          text: '你休息得越好，越能在明天成為孩子的避風港。'
        },
        {
          type: 'heading',
          text: '🌸 6. 孩子會忘記吃了什麼、玩了什麼，但永遠記得你擁抱他的方式。'
        },
        {
          type: 'paragraph',
          text: '擁抱、溫柔、陪伴，比完美的教養方式更重要。'
        },
        {
          type: 'heading',
          text: '🌸 7. 有些日子真的很難，只要撐過今天，就值得驕傲。'
        },
        {
          type: 'paragraph',
          text: '不需要每天都耀眼，有時候「活著」就是勝利。'
        },
        {
          type: 'heading',
          text: '🌸 8. 不要拿操場邊的媽媽、社群裡的媽媽，跟真實的自己比較。'
        },
        {
          type: 'paragraph',
          text: '每個媽媽的背後都有不眠的夜晚，只是你看不見。'
        },
        {
          type: 'heading',
          text: '🌸 9. 孩子的情緒不是你的錯，而是他正在學習如何成為人。'
        },
        {
          type: 'paragraph',
          text: '他願意在你面前亂，是因為你對他來說最安全。'
        },
        {
          type: 'heading',
          text: '🌸 10. 孩子睡著後，請也抱抱自己：'
        },
        {
          type: 'quote',
          text: '「我今天，已經做得很好了。」你不是在勉強自己，你是在深深地愛著孩子。'
        },
        {
          type: 'heading',
          text: '💛 結語：媽媽，你值得被好好對待'
        },
        {
          type: 'paragraph',
          text: '你照顧孩子，也照顧家庭。但別忘了，你也值得被照顧。'
        },
        {
          type: 'paragraph',
          text: '孩子在你的懷裡長大，而你，也在教養的過程裡重新長成一個更強大、更柔軟的人。'
        },
        {
          type: 'paragraph',
          text: '請記得：'
        },
        {
          type: 'list',
          items: [
            '✨ 你已經做得很好',
            '✨ 孩子真的很幸運',
            '✨ 你從來不是孤單的'
          ]
        },
        {
          type: 'paragraph',
          text: '這世界上有一群媽媽，就像你一樣，在最累的日子裡還是努力把愛撐得那麼大。'
        },
        {
          type: 'paragraph',
          text: '希望這篇文章，在你需要力量的時候，能剛好輕輕住你。'
        }
      ]
    },
    7: {
      id: 7,
      title: '三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽',
      category: '情緒教育',
      readTime: '10 分鐘',
      likes: 489,
      date: '2024年12月8日',
      author: '寶哥媽咪（Mega）',
      authorBio: '工程師媽媽，與孩子一起成長學習',
      image: 'https://images.unsplash.com/photo-1587235587178-e4a6dbe63726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjB0b2RkbGVyJTIwbG92ZXxlbnwxfHx8fDE3NjUxNzI4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['三歲孩子', '情緒教育', '界線設定', '親子關係', '溫柔教養'],
      content: [
        {
          type: 'paragraph',
          text: '最近，我和我三歲的孩子——寶哥，經歷了一段「界線攻防期」。'
        },
        {
          type: 'paragraph',
          text: '有一天，我在幫他刷牙時，他突然伸腳故意踢我。力道不重，但那種「我故意喔，你會怎樣？」的眼神，很明顯。'
        },
        {
          type: 'paragraph',
          text: '如果你有三歲的孩子，你應該懂這個瞬間。孩子不是壞，只是在探索界線、測試情緒，也在問：'
        },
        {
          type: 'quote',
          text: '媽媽，你會因為我做錯事就不愛我嗎？我做這件事，會發生什麼事？'
        },
        {
          type: 'paragraph',
          text: '那天我沒有大吼。我只是很平靜地說：「這樣我會痛，我不舒服。如果你故意這樣，今天媽媽不會陪你睡喔。」'
        },
        {
          type: 'paragraph',
          text: '他愣住了。他知道媽媽是認真的。'
        },
        {
          type: 'paragraph',
          text: '而我也在那一刻再次感受到：三歲的孩子並不是在挑戰你，他是在尋找安全的大人。'
        },
        {
          type: 'heading',
          text: '🍃 1. 三歲的孩子，是「一半懂事、一半混亂」的年紀'
        },
        {
          type: 'paragraph',
          text: '很多媽媽以為 3 歲會比較好帶，但其實 3 歲才是孩子邏輯飛速發展、又最容易情緒混亂的階段。'
        },
        {
          type: 'paragraph',
          text: '他們會：'
        },
        {
          type: 'list',
          items: [
            '明知道不能，還是想試',
            '一秒天使、一秒暴龍',
            '說得出好多話，但情緒還追不上語言',
            '想獨立，卻又還需要人抱'
          ]
        },
        {
          type: 'paragraph',
          text: '他不是叛逆，他只是第一次面對自己的「我想要」與「不行」。'
        },
        {
          type: 'paragraph',
          text: '他混亂，不是壞。他需要媽媽，但又想逃離媽媽。'
        },
        {
          type: 'paragraph',
          text: '這就是三歲。'
        },
        {
          type: 'heading',
          text: '🌱 2. 孩子的「故意」背後，其實是想確定你愛不愛他'
        },
        {
          type: 'paragraph',
          text: '寶哥那天踢我，其實不是調皮，也不是挑釁。那是他的方式在問：「如果我做不好，你還會在嗎？」「界線在哪裡？」'
        },
        {
          type: 'paragraph',
          text: '孩子在安全的人面前，才會展現「最真實的混亂」。也許你家孩子會：'
        },
        {
          type: 'list',
          items: [
            '故意頂嘴',
            '故意弄倒玩具',
            '故意搶你的東西',
            '故意說「我不要」',
            '故意哭給你看'
          ]
        },
        {
          type: 'paragraph',
          text: '請不要急著覺得他壞、他不乖、你教不好。'
        },
        {
          type: 'quote',
          text: '孩子最需要的不是完美媽媽，而是穩定的大人。'
        },
        {
          type: 'paragraph',
          text: '那天晚上，我讓爸爸陪睡。他雖然失望，但他理解了「行為會有後果」。而第二天，他主動願意用語言說：「媽媽，我不會踢你了。」'
        },
        {
          type: 'paragraph',
          text: '孩子的學習，就是這樣一點一點的。'
        },
        {
          type: 'heading',
          text: '🌼 3. 教養不是控制，而是引導孩子的邏輯與情緒'
        },
        {
          type: 'paragraph',
          text: '後來我發現，把生活遊戲化對寶哥很有效：「我們來出任務」、「要找到線索喔」、「照順序完成 Quest」。'
        },
        {
          type: 'paragraph',
          text: '孩子需要的是情境、任務感、明確流程。當你幫他把生活變成可理解的遊戲，孩子會：'
        },
        {
          type: 'list',
          items: [
            '更願意配合',
            '更少情緒失控',
            '更能理解「規則」',
            '更容易建立邏輯'
          ]
        },
        {
          type: 'paragraph',
          text: '其實每個三歲的孩子都在找：「這個世界怎麼運作？」'
        },
        {
          type: 'paragraph',
          text: '大人給得越清楚，他越安心。'
        },
        {
          type: 'heading',
          text: '💛 4. 寫給所有媽媽：你已經做得很好了'
        },
        {
          type: 'paragraph',
          text: '我知道很多媽媽的心情會像我：'
        },
        {
          type: 'list',
          items: [
            '生氣後會自責',
            '設界線時怕孩子不愛你',
            '有時候崩潰',
            '有時候累得想躲起來',
            '有時候問自己是不是做不好'
          ]
        },
        {
          type: 'paragraph',
          text: '但我想說——'
        },
        {
          type: 'quote',
          text: '孩子不需要完美媽媽，他需要有界線、有溫度、有耐心，也會犯錯的媽媽。'
        },
        {
          type: 'paragraph',
          text: '你能溫柔也能堅定；你會累但仍然陪著他；你會失控但隔天早上還是把早餐準備好。'
        },
        {
          type: 'paragraph',
          text: '孩子每天都看得見。'
        },
        {
          type: 'heading',
          text: '🌙 5. 教養不是一天變好的，但孩子會記住你給的方式'
        },
        {
          type: 'paragraph',
          text: '我們陪孩子長大，但其實孩子也在陪我們成為更好的自己。'
        },
        {
          type: 'paragraph',
          text: '如果今天你覺得很難，不代表你做不好。如果你感到累，也不要覺得羞愧。'
        },
        {
          type: 'paragraph',
          text: '孩子不是被吼大、被罵大、被控制大。孩子是：'
        },
        {
          type: 'list',
          items: [
            '被理解',
            '被接住',
            '被引導',
            '被穩定的人陪著',
            '慢慢長大的'
          ]
        },
        {
          type: 'paragraph',
          text: '而某一天，你會突然發現——他比昨天更懂事一點；也比昨天更愛你。'
        },
        {
          type: 'quote',
          text: '這就是教養最溫柔的奇蹟。'
        }
      ]
    }
  };

  const article = articlesData[Number(articleId)] || articlesData[8];

  // 熱門文章列表 - 顯示現有的兩篇文章，但排除當前正在閱讀的文章
  const popularArticles = [
    { 
      id: 8, 
      title: '寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了', 
      views: '567' 
    },
    { 
      id: 7, 
      title: '三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽', 
      views: '489' 
    }
  ].filter(item => item.id !== article.id);

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
              onClick={() => navigate('/parenting')}
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
                {popularArticles.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/parenting/article/${item.id}`)}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer group"
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                        {item.title}
                      </div>
                      <div className="text-gray-500">{item.views} 個讚</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}