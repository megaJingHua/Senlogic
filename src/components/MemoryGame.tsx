import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onClose: () => void;
  onSaveScore?: (score: number) => void;
  session?: any;
}

export function MemoryGame({ onClose, onSaveScore, session }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // 可愛的emoji卡片內容
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  // 初始化遊戲
  const initGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setTimeElapsed(0);
    setIsPlaying(true);
    setHasSaved(false);
  };

  // 計時器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  // 初始化遊戲
  useEffect(() => {
    initGame();
  }, []);

  // 檢查是否獲勝
  useEffect(() => {
    if (matches === emojis.length && matches > 0 && !isWon) {
      setIsWon(true);
      setIsPlaying(false);
      
      // Calculate score based on moves and time (lower is better, but points should be higher for better performance)
      // Base: 200 - (moves * 2) - (time * 1)
      const calculatedScore = Math.max(50, 200 - (moves * 2) - timeElapsed);

      if (session && onSaveScore && !hasSaved) {
        onSaveScore(calculatedScore);
        setHasSaved(true);
      }
    }
  }, [matches, isWon, moves, timeElapsed, session, onSaveScore, hasSaved]);

  // 處理卡片翻轉
  const handleCardClick = (id: number) => {
    const card = cards.find((c) => c.id === id);
    
    // 如果已經翻開或已配對，不處理
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // 更新卡片狀態為翻開
    setCards(cards.map((c) => 
      c.id === id ? { ...c, isFlipped: true } : c
    ));

    // 如果翻開了兩張卡片
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      // 檢查是否配對成功
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // 配對成功
        setTimeout(() => {
          setCards(cards.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
        }, 600);
      } else {
        // 配對失敗，翻回去
        setTimeout(() => {
          setCards(cards.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // 格式化時間
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <Home className="w-5 h-5" />
              返回
            </motion.button>
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🧠
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={initGame}
              className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="w-5 h-5" />
              重新開始
            </motion.button>
          </div>

          <h1 className="text-purple-900 mb-2">記憶大師</h1>
          <p className="text-gray-600">找出相同的卡片配對吧！</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">移動次數</div>
            <div className="text-purple-600 text-2xl">{moves}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">配對成功</div>
            <div className="text-pink-600 text-2xl">{matches}/{emojis.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">時間</div>
            <div className="text-blue-600 text-2xl">{formatTime(timeElapsed)}</div>
          </div>
        </motion.div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: card.id * 0.05 }}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square cursor-pointer"
            >
              <div className="relative w-full h-full">
                {/* Card */}
                <motion.div
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Back */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-lg flex items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl"
                    >
                      ❓
                    </motion.div>
                  </div>

                  {/* Card Front */}
                  <div
                    className={`absolute inset-0 rounded-2xl shadow-lg flex items-center justify-center backface-hidden ${
                      card.isMatched
                        ? 'bg-gradient-to-br from-green-300 to-emerald-400'
                        : 'bg-white'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <motion.div
                      animate={
                        card.isMatched
                          ? { scale: [1, 1.3, 1], rotate: [0, 360, 0] }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                      className="text-6xl"
                    >
                      {card.emoji}
                    </motion.div>
                    
                    {card.isMatched && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 text-2xl"
                      >
                        ✨
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="text-8xl text-center mb-4"
                >
                  🏆
                </motion.div>
                
                <h2 className="text-purple-900 text-center mb-4">恭喜你贏了！</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-purple-50 rounded-xl p-3">
                    <span className="text-gray-700">移動次數</span>
                    <span className="text-purple-600">{moves} 次</span>
                  </div>
                  <div className="flex items-center justify-between bg-pink-50 rounded-xl p-3">
                    <span className="text-gray-700">使用時間</span>
                    <span className="text-pink-600">{formatTime(timeElapsed)}</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-amber-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      {Math.max(50, 200 - (moves * 2) - timeElapsed)}
                    </span>
                  </div>
                </div>

                {session && hasSaved && (
                  <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-xl text-center text-sm">
                    ✨ 分數已儲存到排行榜！
                  </div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={initGame}
                    className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    再玩一次
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    返回首頁
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}