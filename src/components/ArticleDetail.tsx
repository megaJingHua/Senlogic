import { motion } from 'motion/react';
import { ArrowLeft, Clock, Heart, Share2, Bookmark, User, Calendar, Tag, Eye } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { projectId } from '../utils/supabase/info';

export function ArticleDetail() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const [views, setViews] = useState(0);
  const [allViews, setAllViews] = useState<Record<string, number>>({});
  
  // 當進入文章詳細頁面時自動捲動到頂部並增加閱讀數
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchData = async () => {
      // 1. Fetch all views for popular articles
      try {
        const viewsRes = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ff545811/articles/views`
        );
        const viewsResult = await viewsRes.json();
        if (viewsResult.success && viewsResult.data) {
          setAllViews(viewsResult.data);
        }
      } catch (error) {
        console.error("Failed to fetch all views:", error);
      }

      // 2. Increment current article view
      if (!articleId) return;
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ff545811/articles/${articleId}/views`,
          { method: 'POST' }
        );
        const result = await response.json();
        if (result.success) {
          setViews(result.views);
          // Also update local state for immediate consistency in popular list if needed
          setAllViews(prev => ({
            ...prev,
            [articleId]: result.views
          }));
        }
      } catch (error) {
        console.error("Failed to increment views:", error);
      }
    };

    fetchData();
  }, [articleId]);
  
  const articlesData: { [key: number]: any } = {
    9: {
      id: 9,
      title: '高敏兒不是問題，是天賦：給父母的一封安心信',
      category: '情緒教育',
      readTime: '12 分鐘',
      date: '2024年12月23日',
      author: '寶哥媽咪（Mega）',
      authorBio: '工程師媽媽，與孩子一起成長學習',
      image: "https://images.unsplash.com/photo-1532679839948-7ebc758d26b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG91Z2h0ZnVsJTIwY2hpbGQlMjBuYXR1cmUlMjBzZW5zaXRpdmV8ZW58MXx8fHwxNzY2NDc3MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ['高敏感', '情緒教育', '親子溝通', '天賦開發', '教養心法'],
      content: [
        {
          type: 'paragraph',
          text: '親愛的爸爸媽媽，當您看著自己的孩子，是否曾感到他們與眾不同？他們可能對微小的聲音特別敏感，在陌生環境中顯得退縮，或是對他人的情緒有著異於常人的洞察力。'
        },
        {
          type: 'paragraph',
          text: '您或許會擔心：「我的孩子是不是太膽小？」、「他們是不是太愛哭了？」、「為什麼總是這麼容易焦慮？」請您放心，您的孩子很可能擁有一項獨特而美好的特質——他們是 「高敏感族（Highly Sensitive Person, HSP）」，而這絕不是問題，而是一種天賦。'
        },
        {
          type: 'heading',
          text: '什麼是高敏感？'
        },
        {
          type: 'paragraph',
          text: '「高敏感」並不是一種疾病，也不是性格缺陷，而是一種與生俱來的神經系統特質。高敏感的孩子（簡稱高敏兒）的大腦處理訊息的方式比一般人更深入、更細膩。他們就像一台配備了「超強感測器」的孩子，能接收到更多、更微小的外界刺激：'
        },
        {
          type: 'list',
          items: [
            '感官敏銳：對光線、聲音、氣味、觸感等反應更強烈，例如討厭粗糙的衣服，或被突如其來的聲音嚇到。',
            '情緒豐富：能深刻感受到自身和他人的情緒，同理心強，也更容易被感動或受傷。',
            '反應更深：對新事物、新環境需要更多時間適應，因為他們在腦中處理了更多細節。',
            '觀察細膩：能注意到旁人忽略的細節，有著豐富的內心世界和想像力。'
          ]
        },
        {
          type: 'heading',
          text: '高敏兒的超能力與挑戰'
        },
        {
          type: 'paragraph',
          text: '這些特質帶來了獨特的「超能力」，但也可能伴隨一些「挑戰」：'
        },
        {
          type: 'heading',
          text: '🌟 高敏兒的超能力 (Gifts)'
        },
        {
          type: 'list',
          items: [
            '強大同理心：能深刻理解他人感受，成為很好的傾聽者與朋友。',
            '豐富創造力：對細節的敏銳觀察力與深度思考，常在藝術、文學、設計等領域展現天賦。',
            '深度思考者：喜歡探索事物的本質，對哲學、科學或任何需要深入鑽研的領域有潛力。',
            '細膩的覺察力：能發現環境中細微的美好與變化，對環境有高度的敏感與欣賞。',
            '高道德感與責任心：對公平正義有強烈追求，對自己和他人有較高標準。'
          ]
        },
        {
          type: 'heading',
          text: '🌪 高敏兒可能面臨的挑戰'
        },
        {
          type: 'list',
          items: [
            '容易被情緒淹沒：吸收過多情緒，導致自身壓力過大或情緒崩潰。',
            '過度刺激（Overstimulation）：在嘈雜或混亂的環境中容易感到不適、疲憊，甚至想逃離。',
            '過度擔憂與焦慮：對未來、社交或失敗有更多考量，容易陷入擔憂情緒。',
            '社交壓力：需要更多獨處時間來恢復能量，可能被誤解為害羞或不合群。',
            '害怕犯錯：因深度思考可能的後果，有時會不敢嘗試或過於追求完美。'
          ]
        },
        {
          type: 'heading',
          text: '給高敏兒父母的安心指南'
        },
        {
          type: 'paragraph',
          text: '作為父母，您可以這樣支持您的孩子：'
        },
        {
          type: 'heading',
          text: '1. 理解與接納是基石'
        },
        {
          type: 'list',
          items: [
            '「這就是他（她）！」：認識到高敏感是孩子天生的一部分，而不是需要被「矯正」的缺點。',
            '情緒的鏡子：了解孩子的情緒反應激烈，常常是接收到太多訊息的正常表現，而非故意搗蛋。'
          ]
        },
        {
          type: 'heading',
          text: '2. 創造一個「避風港」'
        },
        {
          type: 'list',
          items: [
            '安靜的空間：確保家中有一個能讓孩子獨處、放鬆、免受刺激的角落。',
            '減少過度刺激：避免過多嘈雜的環境、緊湊的行程，給予孩子足夠的緩衝時間。',
            '預告變化：任何新的活動、環境或人物，都請提前跟孩子溝通，讓他們有心理準備。'
          ]
        },
        {
          type: 'heading',
          text: '3. 教導情緒調節與自我保護'
        },
        {
          type: 'list',
          items: [
            '命名情緒：幫助孩子認識和說出自己的情緒：「你現在是不是覺得很生氣/難過/害怕？」',
            '建立儀式：引導孩子在情緒高漲時，做一些能平復心情的事（例如深呼吸、抱抱玩偶、聽輕音樂）。',
            '設立界限：教導孩子如何拒絕過多的刺激或要求，保護自己的能量。'
          ]
        },
        {
          type: 'heading',
          text: '4. 發掘與培養天賦'
        },
        {
          type: 'list',
          items: [
            '觀察優勢：留意孩子在哪方面展現出細膩、專注、同理心等特質。',
            '鼓勵獨特：支持他們在藝術、音樂、閱讀、大自然探索等領域發展興趣。',
            '欣賞差異：讓孩子知道他們與眾不同之處正是其力量所在。'
          ]
        },
        {
          type: 'quote',
          text: '您的孩子不是「太脆弱」，而是「太有感」。他們不是「愛找麻煩」，而是「在嘗試理解這個複雜的世界」。'
        },
        {
          type: 'heading',
          text: '結語'
        },
        {
          type: 'paragraph',
          text: '高敏感是一種獨特的天賦，它能讓孩子更深入地體驗生活的美好，擁有更豐富的內心世界。'
        },
        {
          type: 'paragraph',
          text: '作為父母，您的理解、接納與引導，將是高敏兒成長路上最堅實的後盾，幫助他們將這份與生俱來的敏感，轉化為未來人生中最寶貴的禮物。放鬆心情，與您的孩子一同探索這份美好的天賦吧！'
        }
      ]
    },
    8: {
      id: 8,
      title: '寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了',
      category: '親子關係',
      readTime: '8 分鐘',
      date: '2024年12月8日',
      author: '寶哥媽咪（Mega）',
      authorBio: '工程師媽媽，與孩子一起成長學習',
      image: 'https://images.unsplash.com/photo-1730632166954-80098b725e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBodWdnaW5nJTIwY2hpbGQlMjB3YXJtJTIwY29tZm9ydHxlbnwxfHx8fDE3NjY0NzczNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
      date: '2024年12月8日',
      author: '寶哥媽咪（Mega）',
      authorBio: '工程師媽媽，與孩子一起成長學習',
      image: 'https://images.unsplash.com/photo-1612191310678-6660188d61a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjB0YWxraW5nJTIwdG8lMjB0b2RkbGVyJTIwZ2VudGxlJTIwcGFyZW50aW5nfGVufDF8fHx8MTc2NjQ3NzM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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

  // 熱門文章列表 - 根據閱讀次數排序
  const popularArticles = Object.values(articlesData)
    .map((item: any) => ({
      id: item.id,
      title: item.title,
      views: allViews[item.id] || 0
    }))
    .filter((item: any) => item.id !== article.id)
    .sort((a: any, b: any) => b.views - a.views)
    .slice(0, 3);

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
                  <Eye className="w-5 h-5" />
                  {views} 次閱讀
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
                      <div className="text-gray-500 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> 
                        {item.views} 次閱讀
                      </div>
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