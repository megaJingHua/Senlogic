import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home, Lightbulb } from 'lucide-react';

interface ScienceExperimentProps {
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
}

const scienceQuestions: Question[] = [
  {
    id: 1,
    question: '太陽是什麼？',
    options: ['行星', '恆星', '衛星', '彗星'],
    correctAnswer: 1,
    explanation: '太陽是一顆恆星，它自己會發光發熱！',
    emoji: '☀️'
  },
  {
    id: 2,
    question: '水的三態不包括哪一個？',
    options: ['固態（冰）', '液態（水）', '氣態（水蒸氣）', '電漿態'],
    correctAnswer: 3,
    explanation: '水有固態、液態和氣態三種狀態，電漿態是其他物質的狀態。',
    emoji: '💧'
  },
  {
    id: 3,
    question: '植物進行光合作用需要什麼？',
    options: ['陽光', '水', '二氧化碳', '以上皆是'],
    correctAnswer: 3,
    explanation: '植物需要陽光、水和二氧化碳才能進行光合作用，製造養分！',
    emoji: '🌱'
  },
  {
    id: 4,
    question: '地球上最大的動物是什麼？',
    options: ['大象', '鯨魚', '恐龍', '長頸鹿'],
    correctAnswer: 1,
    explanation: '藍鯨是地球上現存最大的動物，比恐龍還要大！',
    emoji: '🐋'
  },
  {
    id: 5,
    question: '彩虹有幾種顏色？',
    options: ['5種', '6種', '7種', '8種'],
    correctAnswer: 2,
    explanation: '彩虹有7種顏色：紅、橙、黃、綠、藍、靛、紫！',
    emoji: '🌈'
  },
  {
    id: 6,
    question: '人體最大的器官是什麼？',
    options: ['心臟', '肺', '皮膚', '肝臟'],
    correctAnswer: 2,
    explanation: '皮膚是人體最大的器官，它保護我們的身體！',
    emoji: '👤'
  },
  {
    id: 7,
    question: '聲音能在什麼中傳播？',
    options: ['空氣', '水', '固體', '以上皆是'],
    correctAnswer: 3,
    explanation: '聲音可以在空氣、水和固體中傳播，但在真空中無法傳播。',
    emoji: '🔊'
  },
  {
    id: 8,
    question: '地球繞太陽轉一圈需要多久？',
    options: ['一個月', '一季', '一年', '十年'],
    correctAnswer: 2,
    explanation: '地球繞太陽轉一圈需要一年（365天），這就是為什麼我們有四季變化！',
    emoji: '🌍'
  },
  {
    id: 9,
    question: '磁鐵有幾極？',
    options: ['1極', '2極', '3極', '4極'],
    correctAnswer: 1,
    explanation: '磁鐵有N極和S極兩個磁極，同性相斥，異性相吸！',
    emoji: '🧲'
  },
  {
    id: 10,
    question: '哪種動物不是昆蟲？',
    options: ['蝴蝶', '蜜蜂', '蜘蛛', '螞蟻'],
    correctAnswer: 2,
    explanation: '蜘蛛有8隻腳，屬於蛛形綱；昆蟲都有6隻腳！',
    emoji: '🕷️'
  },
];

export function ScienceExperiment({ onClose }: ScienceExperimentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const currentQuestion = scienceQuestions[currentQuestionIndex];

  useEffect(() => {
    if (score >= 8) {
      setIsWon(true);
    }
  }, [score]);

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setAnsweredQuestions(answeredQuestions + 1);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < scienceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // 重新開始
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions(0);
    setIsWon(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 p-4">
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
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                y: [0, -5, 0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🔬
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-teal-400 to-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="w-5 h-5" />
              重新開始
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-teal-900 mb-2">科學實驗</h1>
            <p className="text-gray-600">探索科學的神奇魔力！</p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">答對題數</div>
            <div className="text-teal-600 text-3xl flex items-center justify-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              {score}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">進度</div>
            <div className="text-green-600 text-3xl">
              {currentQuestionIndex + 1}/{scienceQuestions.length}
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        {!isWon && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          >
            {/* Question */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                {currentQuestion.emoji}
              </motion.div>

              <h2 className="text-gray-900 mb-4">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;

                let bgClass = 'bg-gradient-to-br from-teal-300 to-green-400 text-white';
                
                if (showResult) {
                  if (isCorrect) {
                    bgClass = 'bg-green-400 text-white';
                  } else if (isSelected && !isCorrect) {
                    bgClass = 'bg-red-400 text-white';
                  } else {
                    bgClass = 'bg-gray-200 text-gray-500';
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.05 }}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`p-6 rounded-2xl shadow-lg transition-all ${bgClass} ${
                      showExplanation ? 'cursor-default' : 'hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-left">{option}</span>
                      {showResult && isCorrect && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          className="ml-auto text-2xl"
                        >
                          ✅
                        </motion.span>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-2xl"
                        >
                          ❌
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={`rounded-2xl p-6 mb-6 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-orange-100 border-2 border-orange-400'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Lightbulb className={`w-6 h-6 mt-1 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`} />
                      <div>
                        <h3 className={`mb-2 ${
                          selectedAnswer === currentQuestion.correctAnswer
                            ? 'text-green-900'
                            : 'text-orange-900'
                        }`}>
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? '太棒了！答對了！'
                            : '繼續加油！'}
                        </h3>
                        <p className={
                          selectedAnswer === currentQuestion.correctAnswer
                            ? 'text-green-700'
                            : 'text-orange-700'
                        }>
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-400 to-green-500 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {currentQuestionIndex < scienceQuestions.length - 1
                      ? '下一題'
                      : '回到第一題'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-teal-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">💡</span>
            科學小知識
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>🌟 科學幫助我們了解世界的運作方式</p>
            <p>🔭 好奇心是科學家最重要的特質</p>
            <p>🧪 實驗可以證明或推翻我們的想法</p>
            <p>🌍 科學讓我們的生活更便利、更美好</p>
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
                
                <h2 className="text-teal-900 text-center mb-4">科學小博士！</h2>
                <p className="text-gray-600 text-center mb-6">你對科學知識瞭解得真棒！</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-teal-50 rounded-xl p-3">
                    <span className="text-gray-700">答對題數</span>
                    <span className="text-teal-600">{score} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
                    <span className="text-gray-700">答題總數</span>
                    <span className="text-green-600">{answeredQuestions} 題</span>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      200
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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
