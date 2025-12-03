import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, RotateCcw, Home, Play, Pause } from 'lucide-react';

interface MusicRhythmProps {
  onClose: () => void;
}

interface Note {
  id: number;
  lane: number;
  position: number;
  emoji: string;
}

const noteEmojis = ['🎵', '🎶', '🎼', '🎹'];

export function MusicRhythm({ onClose }: MusicRhythmProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(50);
  const [nextNoteId, setNextNoteId] = useState(0);
  const [hitFeedback, setHitFeedback] = useState<{ lane: number; type: 'perfect' | 'good' | 'miss' } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const spawnLoopRef = useRef<NodeJS.Timeout | null>(null);

  const lanes = 4;
  const maxPosition = 100;
  const hitZone = { min: 85, max: 95 };
  const perfectZone = { min: 88, max: 92 };

  // 開始遊戲
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotes([]);
    setNextNoteId(0);
    setIsWon(false);
  };

  // 停止遊戲
  const stopGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnLoopRef.current) clearInterval(spawnLoopRef.current);
  };

  // 遊戲循環 - 移動音符
  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = setInterval(() => {
        setNotes(prevNotes => {
          const updatedNotes = prevNotes
            .map(note => ({ ...note, position: note.position + 2 }))
            .filter(note => {
              // 移除超出範圍的音符（未擊中）
              if (note.position > maxPosition) {
                setCombo(0);
                setHitFeedback({ lane: note.lane, type: 'miss' });
                setTimeout(() => setHitFeedback(null), 300);
                return false;
              }
              return true;
            });
          return updatedNotes;
        });
      }, gameSpeed);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameSpeed]);

  // 生成音符
  useEffect(() => {
    if (isPlaying) {
      spawnLoopRef.current = setInterval(() => {
        const lane = Math.floor(Math.random() * lanes);
        const emoji = noteEmojis[Math.floor(Math.random() * noteEmojis.length)];
        setNotes(prevNotes => [
          ...prevNotes,
          { id: nextNoteId, lane, position: 0, emoji }
        ]);
        setNextNoteId(prev => prev + 1);
      }, 1200);
    }

    return () => {
      if (spawnLoopRef.current) clearInterval(spawnLoopRef.current);
    };
  }, [isPlaying, nextNoteId]);

  // 檢查獲勝條件
  useEffect(() => {
    if (score >= 50) {
      setIsWon(true);
      stopGame();
    }
  }, [score]);

  // 處理按鍵點擊
  const handleLaneClick = (lane: number) => {
    if (!isPlaying) return;

    const notesInLane = notes.filter(note => note.lane === lane);
    const closestNote = notesInLane.find(
      note => note.position >= hitZone.min && note.position <= hitZone.max
    );

    if (closestNote) {
      const isPerfect =
        closestNote.position >= perfectZone.min &&
        closestNote.position <= perfectZone.max;
      
      const points = isPerfect ? 10 : 5;
      setScore(score + points);
      setCombo(combo + 1);
      setMaxCombo(Math.max(maxCombo, combo + 1));
      setHitFeedback({ lane, type: isPerfect ? 'perfect' : 'good' });
      setTimeout(() => setHitFeedback(null), 300);

      // 移除被擊中的音符
      setNotes(prevNotes => prevNotes.filter(note => note.id !== closestNote.id));
    } else {
      setCombo(0);
      setHitFeedback({ lane, type: 'miss' });
      setTimeout(() => setHitFeedback(null), 300);
    }
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      const keyMap: { [key: string]: number } = {
        'a': 0, 's': 1, 'd': 2, 'f': 3,
        'A': 0, 'S': 1, 'D': 2, 'F': 3,
      };

      if (keyMap[e.key] !== undefined) {
        handleLaneClick(keyMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, notes, score, combo]);

  const resetGame = () => {
    stopGame();
    setNotes([]);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsWon(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-4">
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
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🎵
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="w-5 h-5" />
              重新開始
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="text-pink-900 mb-2">音樂節奏</h1>
            <p className="text-gray-600">跟著節奏點擊按鍵！</p>
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
            <div className="text-pink-600 text-3xl flex items-center justify-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              {score}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">連擊</div>
            <div className="text-rose-600 text-3xl">
              {combo > 0 ? `${combo}x` : '-'}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-gray-600 mb-1">最高連擊</div>
            <div className="text-red-600 text-3xl">{maxCombo}x</div>
          </div>
        </motion.div>

        {/* Start Button */}
        {!isPlaying && !isWon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startGame}
              className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-12 py-6 rounded-full shadow-2xl text-2xl flex items-center gap-3 mx-auto hover:shadow-xl transition-shadow"
            >
              <Play className="w-8 h-8 fill-current" />
              開始遊戲
            </motion.button>
          </motion.div>
        )}

        {/* Game Area */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-4 shadow-2xl mb-8 overflow-hidden"
          >
            {/* Note Lanes */}
            <div className="flex gap-2 relative h-[500px]">
              {Array.from({ length: lanes }).map((_, laneIndex) => (
                <div
                  key={laneIndex}
                  className="flex-1 relative bg-gradient-to-b from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200"
                >
                  {/* Hit Zone Indicator */}
                  <div
                    className="absolute left-0 right-0 bg-pink-200/50 border-y-2 border-pink-400"
                    style={{
                      top: `${hitZone.min}%`,
                      height: `${hitZone.max - hitZone.min}%`,
                    }}
                  />

                  {/* Perfect Zone Indicator */}
                  <div
                    className="absolute left-0 right-0 bg-pink-300/50"
                    style={{
                      top: `${perfectZone.min}%`,
                      height: `${perfectZone.max - perfectZone.min}%`,
                    }}
                  />

                  {/* Notes */}
                  <AnimatePresence>
                    {notes
                      .filter(note => note.lane === laneIndex)
                      .map(note => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute left-0 right-0 flex justify-center"
                          style={{ top: `${note.position}%` }}
                        >
                          <div className="text-4xl">{note.emoji}</div>
                        </motion.div>
                      ))}
                  </AnimatePresence>

                  {/* Hit Feedback */}
                  <AnimatePresence>
                    {hitFeedback && hitFeedback.lane === laneIndex && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <div
                          className={`text-3xl ${
                            hitFeedback.type === 'perfect'
                              ? 'text-yellow-500'
                              : hitFeedback.type === 'good'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {hitFeedback.type === 'perfect'
                            ? '⭐'
                            : hitFeedback.type === 'good'
                            ? '✅'
                            : '❌'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Click Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLaneClick(laneIndex)}
                    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-400 to-rose-400 rounded-b-2xl text-white shadow-lg flex items-center justify-center"
                  >
                    <span className="text-2xl">
                      {['A', 'S', 'D', 'F'][laneIndex]}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg text-center"
        >
          <h3 className="text-pink-900 mb-3">遊戲說明</h3>
          <p className="text-gray-600 mb-2">
            當音符落在粉紅色區域時，點擊對應按鈕或按下鍵盤 A、S、D、F 鍵！
          </p>
          <p className="text-gray-600">
            ⭐ Perfect 區域（深色）= 10 分 | ✅ Good 區域 = 5 分
          </p>
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
                
                <h2 className="text-pink-900 text-center mb-4">節奏大師！</h2>
                <p className="text-gray-600 text-center mb-6">你的節奏感超棒！</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-pink-50 rounded-xl p-3">
                    <span className="text-gray-700">最終得分</span>
                    <span className="text-pink-600">{score} 分</span>
                  </div>
                  <div className="flex items-center justify-between bg-rose-50 rounded-xl p-3">
                    <span className="text-gray-700">最高連擊</span>
                    <span className="text-rose-600">{maxCombo}x</span>
                  </div>
                  <div className="flex items-center justify-between bg-red-50 rounded-xl p-3">
                    <span className="text-gray-700">獲得積分</span>
                    <span className="text-red-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-current" />
                      130
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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
