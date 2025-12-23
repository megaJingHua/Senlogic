import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home, Heart } from 'lucide-react';

interface MathAdventureProps {
  onClose: () => void;
  onSaveScore?: (score: number) => void;
  session?: any;
}

interface Question {
  num1: number;
  num2: number;
  operator: '+' | '-';
  correctAnswer: number;
}

export function MathAdventure({ onClose, onSaveScore, session }: MathAdventureProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // 生成新問題
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';
    
    let correctAnswer: number;
    let finalNum1 = num1;
    let finalNum2 = num2;
    
    if (operator === '-') {
      // 確保減法結果不為負數
      finalNum1 = Math.max(num1, num2);
      finalNum2 = Math.min(num1, num2);
      correctAnswer = finalNum1 - finalNum2;
    } else {
      correctAnswer = num1 + num2;
    }

    setQuestion({ num1: finalNum1, num2: finalNum2, operator, correctAnswer });
    setUserAnswer('');
    setIsCorrect(null);
    setShowFeedback(false);
  };

  // 初始化遊戲
  useEffect(() => {
    generateQuestion();
  }, []);

  // 檢查獲勝條件
  useEffect(() => {
    if (score >= 10 && !isWon) {
      setIsWon(true);
      if (session && onSaveScore && !hasSaved) {
        onSaveScore(100); // Base points for winning
        setHasSaved(true);
      }
    }
  }, [score, isWon, session, onSaveScore, hasSaved]);

  // 檢查遊戲結束
  useEffect(() => {
    if (lives <= 0) {
      setIsGameOver(true);
      if (session && onSaveScore && !hasSaved && score > 0) {
        onSaveScore(score * 10); // 10 points per correct answer
        setHasSaved(true);
      }
    }
  }, [lives, session, onSaveScore, hasSaved, score]);

  // 處理答案提交
  const handleSubmit = () => {
    if (!question || userAnswer === '') return;

    const answer = parseInt(userAnswer);
    const correct = answer === question.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    setTotalQuestions(totalQuestions + 1);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setLives(lives - 1);
      setTimeout(() => {
        if (lives > 1) {
          generateQuestion();
        }
      }, 1500);
    }
  };

  // 重新開始遊戲
  const resetGame = () => {
    setScore(0);
    setLives(3);
    setTotalQuestions(0);
    setIsWon(false);
    setIsGameOver(false);
    setHasSaved(false);
    generateQuestion();
  };

  // 處理鍵盤輸入
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 p-4">
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
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🔢
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="w-5 h-5" />
              重新開始
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-orange-900 mb-2">數字冒險</h1>
            <p className="text-gray-600">快速計算答案，挑戰你的數學能力！</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">得分</div>
            <div className="text-orange-600 text-3xl flex items-center justify-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              {score}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">生命值</div>
            <div className="text-red-600 text-3xl flex items-center justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < lives ? 'fill-current' : 'opacity-20'}`}
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">題數</div>
            <div className="text-amber-600 text-3xl">{totalQuestions}</div>
          </div>
        </motion.div>

        {/* Question Card */}
        {question && !isWon && !isGameOver && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: showFeedback ? [1, 1.2, 1] : 1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-6 text-6xl md:text-8xl mb-6">
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-orange-600"
                  >
                    {question.num1}
                  </motion.span>
                  <motion.span
                    className="text-amber-500"
                  >
                    {question.operator}
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    className="text-orange-600"
                  >
                    {question.num2}
                  </motion.span>
                  <span className="text-gray-400">=</span>
                  <span className="text-amber-500">?</span>
                </div>
              </motion.div>

              <div className="max-w-md mx-auto">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={showFeedback}
                  placeholder="輸入答案..."
                  className="w-full text-center text-4xl p-4 border-4 border-orange-300 rounded-2xl focus:border-orange-500 focus:outline-none mb-6 bg-orange-50"
                  autoFocus
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={showFeedback || userAnswer === ''}
                  className={`w-full py-4 rounded-2xl shadow-lg text-white transition-all ${
                    showFeedback || userAnswer === ''
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-400 to-amber-500 hover:shadow-xl'
                  }`}
                >
                  確認答案
                </motion.button>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    {isCorrect ? (
                      <div className="bg-green-100 border-2 border-green-400 rounded-2xl p-6">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 0.5 }}
                          className="text-6xl mb-2"
                        >
                          ✅
                        </motion.div>
                        <p className="text-green-700 text-2xl">太棒了！答對了！</p>
                      </div>
                    ) : (
                      <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-6">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="text-6xl mb-2"
                        >
                          ❌
                        </motion.div>
                        <p className="text-red-700 text-2xl">答錯了！</p>
                        <p className="text-red-600 mt-2">正確答案是：{question.correctAnswer}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

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
                
                <h2 className="text-orange-900 text-center mb-4">恭喜過關！</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-orange-50 rounded-xl p-3">
                    <span className="text-gray-700">答對題數</span>
                    <span className="text-orange-600">{score} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-50 rounded-xl p-3">
                    <span className="text-gray-700">總題數</span>
                    <span className="text-amber-600">{totalQuestions} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-yellow-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      100
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
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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

        {/* Game Over Modal */}
        <AnimatePresence>
          {isGameOver && (
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
                <div className="text-8xl text-center mb-4">😢</div>
                
                <h2 className="text-gray-900 text-center mb-4">遊戲結束</h2>
                <p className="text-gray-600 text-center mb-6">沒關係，繼續加油！</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-orange-50 rounded-xl p-3">
                    <span className="text-gray-700">答對題數</span>
                    <span className="text-orange-600">{score} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-50 rounded-xl p-3">
                    <span className="text-gray-700">總題數</span>
                    <span className="text-amber-600">{totalQuestions} 題</span>
                  </div>
                </div>

                {session && hasSaved && (
                  <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-xl text-center text-sm">
                    ✨ 分數已儲存 ({score * 10} 分)
                  </div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    再試一次
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