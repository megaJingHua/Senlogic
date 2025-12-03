import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home, Shuffle } from 'lucide-react';

interface PuzzleParadiseProps {
  onClose: () => void;
}

interface Tile {
  id: number;
  position: number;
  emoji: string;
}

export function PuzzleParadise({ onClose }: PuzzleParadiseProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [emptyPosition, setEmptyPosition] = useState(8);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const puzzleEmojis = {
    easy: ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '💐', '🌼'],
    medium: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    hard: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒'],
  };

  // 初始化拼圖
  const initPuzzle = () => {
    const emojis = puzzleEmojis[difficulty];
    let positions = Array.from({ length: 9 }, (_, i) => i);
    
    // 洗牌直到找到可解的排列
    do {
      positions = positions.sort(() => Math.random() - 0.5);
    } while (!isSolvable(positions) || isSolved(positions));

    const newTiles = emojis.map((emoji, index) => ({
      id: index,
      position: positions[index],
      emoji,
    }));

    setTiles(newTiles);
    setEmptyPosition(positions[8]);
    setMoves(0);
    setIsWon(false);
  };

  // 檢查是否可解
  const isSolvable = (positions: number[]): boolean => {
    let inversions = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length - 1; j++) {
        if (positions[i] > positions[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  // 檢查是否完成
  const isSolved = (positions: number[]): boolean => {
    for (let i = 0; i < positions.length - 1; i++) {
      if (positions[i] !== i) return false;
    }
    return positions[8] === 8;
  };

  // 檢查當前是否獲勝
  const checkWin = (currentTiles: Tile[]) => {
    const positions = [...Array(9)].map((_, i) => {
      const tile = currentTiles.find(t => t.position === i);
      return tile ? tile.id : 8;
    });
    return isSolved(positions);
  };

  useEffect(() => {
    initPuzzle();
  }, [difficulty]);

  // 處理點擊
  const handleTileClick = (tile: Tile) => {
    const tilePos = tile.position;
    const emptyPos = emptyPosition;

    // 檢查是否相鄰
    const canMove =
      (tilePos === emptyPos - 1 && emptyPos % 3 !== 0) ||
      (tilePos === emptyPos + 1 && tilePos % 3 !== 0) ||
      tilePos === emptyPos - 3 ||
      tilePos === emptyPos + 3;

    if (canMove) {
      const newTiles = tiles.map(t =>
        t.id === tile.id ? { ...t, position: emptyPos } : t
      );
      setTiles(newTiles);
      setEmptyPosition(tilePos);
      setMoves(moves + 1);

      if (checkWin(newTiles)) {
        setIsWon(true);
      }
    }
  };

  const resetGame = () => {
    initPuzzle();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-4">
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🧩
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <Shuffle className="w-5 h-5" />
              重新洗牌
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-blue-900 mb-2">拼圖樂園</h1>
            <p className="text-gray-600">移動拼圖方塊，完成正確的排列！</p>
          </div>
        </motion.div>

        {/* Difficulty Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-3 mb-6"
        >
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDifficulty(level)}
              className={`px-6 py-2 rounded-full shadow-lg transition-all ${
                difficulty === level
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {level === 'easy' ? '簡單' : level === 'medium' ? '中等' : '困難'}
            </motion.button>
          ))}
        </motion.div>

        {/* Moves Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-lg text-center mb-8"
        >
          <div className="text-gray-600 mb-1">移動次數</div>
          <div className="text-blue-600 text-3xl">{moves}</div>
        </motion.div>

        {/* Puzzle Grid */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="bg-white rounded-3xl p-6 shadow-2xl mb-8 max-w-md mx-auto"
        >
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => {
              const tile = tiles.find(t => t.position === index);
              const isEmpty = index === emptyPosition;

              return (
                <motion.div
                  key={index}
                  className="aspect-square"
                >
                  {!isEmpty && tile && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTileClick(tile)}
                      className="w-full h-full bg-gradient-to-br from-blue-300 to-cyan-400 rounded-2xl shadow-lg flex items-center justify-center text-5xl hover:shadow-xl transition-shadow"
                      layout
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      {tile.emoji}
                    </motion.button>
                  )}
                  {isEmpty && (
                    <div className="w-full h-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Solution Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto"
        >
          <h3 className="text-blue-900 text-center mb-4">參考順序</h3>
          <div className="grid grid-cols-3 gap-2">
            {puzzleEmojis[difficulty].map((emoji, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square bg-blue-50 rounded-xl flex items-center justify-center text-3xl"
              >
                {emoji}
              </motion.div>
            ))}
            <div className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300" />
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
                
                <h2 className="text-blue-900 text-center mb-4">拼圖完成！</h2>
                <p className="text-gray-600 text-center mb-6">你真是太厲害了！</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                    <span className="text-gray-700">移動次數</span>
                    <span className="text-blue-600">{moves} 次</span>
                  </div>
                  <div className="flex items-center justify-between bg-cyan-50 rounded-xl p-3">
                    <span className="text-gray-700">難度</span>
                    <span className="text-cyan-600">
                      {difficulty === 'easy' ? '簡單' : difficulty === 'medium' ? '中等' : '困難'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-teal-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-teal-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      80
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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
