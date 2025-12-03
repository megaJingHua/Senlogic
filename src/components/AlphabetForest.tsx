import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';

interface AlphabetForestProps {
  onClose: () => void;
}

interface Letter {
  id: number;
  letter: string;
  emoji: string;
  word: string;
}

const alphabetData: Omit<Letter, 'id'>[] = [
  { letter: 'A', emoji: '🍎', word: 'Apple' },
  { letter: 'B', emoji: '🎈', word: 'Balloon' },
  { letter: 'C', emoji: '🐱', word: 'Cat' },
  { letter: 'D', emoji: '🐶', word: 'Dog' },
  { letter: 'E', emoji: '🐘', word: 'Elephant' },
  { letter: 'F', emoji: '🦊', word: 'Fox' },
  { letter: 'G', emoji: '🍇', word: 'Grape' },
  { letter: 'H', emoji: '🏠', word: 'House' },
  { letter: 'I', emoji: '🍦', word: 'Ice cream' },
  { letter: 'J', emoji: '🧃', word: 'Juice' },
  { letter: 'K', emoji: '🔑', word: 'Key' },
  { letter: 'L', emoji: '🦁', word: 'Lion' },
];

export function AlphabetForest({ onClose }: AlphabetForestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<Letter[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // 生成選項
  const generateOptions = (correctIndex: number) => {
    const correct = { ...alphabetData[correctIndex], id: 0 };
    const incorrectOptions: Letter[] = [];
    
    // 隨機選擇3個錯誤選項
    const availableIndices = alphabetData
      .map((_, i) => i)
      .filter(i => i !== correctIndex);
    
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomIndex];
      incorrectOptions.push({ ...alphabetData[selectedIndex], id: i + 1 });
      availableIndices.splice(randomIndex, 1);
    }

    // 混合正確和錯誤選項
    const allOptions = [correct, ...incorrectOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  useEffect(() => {
    generateOptions(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (score >= 10) {
      setIsWon(true);
    }
  }, [score]);

  const handleAnswer = (selectedLetter: string) => {
    if (showFeedback) return;

    const correct = selectedLetter === alphabetData[currentIndex].letter;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < alphabetData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setShowFeedback(false);
      setIsCorrect(null);
    }, 1500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsWon(false);
    setShowFeedback(false);
    setIsCorrect(null);
  };

  const currentLetter = alphabetData[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
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
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🌳
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="w-5 h-5" />
              重新開始
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-green-900 mb-2">字母森林</h1>
            <p className="text-gray-600">找出正確的字母配對吧！</p>
          </div>
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-lg text-center mb-8"
        >
          <div className="text-gray-600 mb-1">得分</div>
          <div className="text-green-600 text-3xl flex items-center justify-center gap-2">
            <Star className="w-6 h-6 fill-current" />
            {score}
          </div>
        </motion.div>

        {/* Question */}
        {!isWon && (
          <motion.div
            key={currentIndex}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          >
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4">這個圖案的英文字母是什麼？</p>
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl mb-4"
              >
                {currentLetter.emoji}
              </motion.div>

              <div className="text-2xl text-gray-700">
                {currentLetter.word}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {options.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(option.letter)}
                  disabled={showFeedback}
                  className={`p-8 rounded-2xl shadow-lg text-6xl transition-all ${
                    showFeedback
                      ? option.letter === currentLetter.letter
                        ? 'bg-green-400 text-white'
                        : isCorrect === false && option.letter === options.find(o => o.letter === currentLetter.letter)?.letter
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-200'
                      : 'bg-gradient-to-br from-green-300 to-emerald-400 text-white hover:shadow-xl'
                  }`}
                >
                  {option.letter}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-center"
                >
                  {isCorrect ? (
                    <div className="bg-green-100 border-2 border-green-400 rounded-2xl p-6">
                      <motion.div
                        animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl mb-2"
                      >
                        ✅
                      </motion.div>
                      <p className="text-green-700 text-2xl">太棒了！</p>
                    </div>
                  ) : (
                    <div className="bg-orange-100 border-2 border-orange-400 rounded-2xl p-6">
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl mb-2"
                      >
                        💪
                      </motion.div>
                      <p className="text-orange-700 text-2xl">繼續加油！</p>
                      <p className="text-orange-600 mt-2">正確答案是：{currentLetter.letter}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Alphabet Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h3 className="text-green-900 text-center mb-4">字母表</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {alphabetData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`text-center p-3 rounded-xl transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-br from-green-300 to-emerald-400 shadow-lg'
                    : 'bg-green-50 hover:bg-green-100'
                }`}
              >
                <div className="text-3xl mb-1">{item.emoji}</div>
                <div className={`${index === currentIndex ? 'text-white' : 'text-green-700'}`}>
                  {item.letter}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Win Modal */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="text-8xl text-center mb-4"
                >
                  🏆
                </motion.div>
                
                <h2 className="text-green-900 text-center mb-4">字母大師！</h2>
                <p className="text-gray-600 text-center mb-6">你已經認識很多字母了！</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
                    <span className="text-gray-700">答對題數</span>
                    <span className="text-green-600">{score} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      120
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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
