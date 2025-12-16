import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Gift, Users, Ticket, Search, Copy, Check, ArrowLeft, Calendar, Ban } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  maxDraws: number;
  remainingDraws: number;
  prizes: string[];
  excludedPrizes: string[]; // 禁止抽取的禮物名稱列表
}

interface Prize {
  id: string;
  name: string;
  isDrawn: boolean;
  drawnBy?: string;
}

interface LotteryData {
  timestamp: number;
  players: Player[];
  prizes: Prize[];
}

interface LadderLotteryProps {
  onClose: () => void;
}

export function LadderLottery({ onClose }: LadderLotteryProps) {
  const [step, setStep] = useState<'setup' | 'playing' | 'result'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerDraws, setNewPlayerDraws] = useState(1);
  const [newPrizeName, setNewPrizeName] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPrize, setDrawnPrize] = useState<Prize | null>(null);
  const [lotteryId, setLotteryId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [copied, setCopied] = useState(false);
  const [lotteryTimestamp, setLotteryTimestamp] = useState<number>(0);
  const [showExcludeModal, setShowExcludeModal] = useState(false);
  const [excludingPlayer, setExcludingPlayer] = useState<Player | null>(null);

  // 將數據編碼到ID中
  const generateIdWithData = (data: LotteryData): string => {
    const jsonString = JSON.stringify(data);
    const base64 = btoa(encodeURIComponent(jsonString));
    return `LOTTERY-${base64}`;
  };

  // 從ID中解析數據
  const parseIdToData = (id: string): LotteryData | null => {
    try {
      if (!id.startsWith('LOTTERY-')) {
        return null;
      }
      const base64 = id.replace('LOTTERY-', '');
      const jsonString = decodeURIComponent(atob(base64));
      const data: LotteryData = JSON.parse(jsonString);
      return data;
    } catch (error) {
      console.error('解析ID失敗:', error);
      return null;
    }
  };

  // 添加玩家
  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const player: Player = {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        maxDraws: newPlayerDraws,
        remainingDraws: newPlayerDraws,
        prizes: [],
        excludedPrizes: []
      };
      setPlayers([...players, player]);
      setNewPlayerName('');
      setNewPlayerDraws(1);
    }
  };

  // 刪除玩家
  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  // 添加禮物
  const addPrize = () => {
    if (newPrizeName.trim()) {
      const prize: Prize = {
        id: `prize-${Date.now()}`,
        name: newPrizeName.trim(),
        isDrawn: false
      };
      setPrizes([...prizes, prize]);
      setNewPrizeName('');
    }
  };

  // 刪除禮物
  const removePrize = (id: string) => {
    const prizeToRemove = prizes.find(p => p.id === id);
    if (prizeToRemove) {
      // 同時從所有玩家的排除列表中移除這個禮物
      setPlayers(players.map(player => ({
        ...player,
        excludedPrizes: player.excludedPrizes.filter(name => name !== prizeToRemove.name)
      })));
    }
    setPrizes(prizes.filter(p => p.id !== id));
  };

  // 打開排除禮物模態框
  const openExcludeModal = (player: Player) => {
    setExcludingPlayer(player);
    setShowExcludeModal(true);
  };

  // 切換排除禮物
  const toggleExcludePrize = (prizeName: string) => {
    if (!excludingPlayer) return;
    
    setPlayers(players.map(p => {
      if (p.id === excludingPlayer.id) {
        const isExcluded = p.excludedPrizes.includes(prizeName);
        return {
          ...p,
          excludedPrizes: isExcluded
            ? p.excludedPrizes.filter(name => name !== prizeName)
            : [...p.excludedPrizes, prizeName]
        };
      }
      return p;
    }));
    
    // 更新 excludingPlayer 狀態
    setExcludingPlayer(prev => {
      if (!prev) return null;
      const isExcluded = prev.excludedPrizes.includes(prizeName);
      return {
        ...prev,
        excludedPrizes: isExcluded
          ? prev.excludedPrizes.filter(name => name !== prizeName)
          : [...prev.excludedPrizes, prizeName]
      };
    });
  };

  // 開始遊戲
  const startGame = () => {
    if (players.length === 0 || prizes.length === 0) {
      alert('請至少添加一位玩家和一個禮物！');
      return;
    }
    const timestamp = Date.now();
    setLotteryTimestamp(timestamp);
    setStep('playing');
  };

  // 選擇玩家進行抽獎
  const selectPlayer = (player: Player) => {
    if (player.remainingDraws > 0 && !isDrawing) {
      setCurrentPlayer(player);
      startDrawing(player);
    }
  };

  // 開始抽獎動畫
  const startDrawing = (player: Player) => {
    setIsDrawing(true);
    
    // 立即顯示結果
    drawPrize(player);
  };

  // 抽取禮物
  const drawPrize = (player: Player) => {
    // 獲取該玩家可以抽取的禮物（排除已抽取和被禁止的）
    const availablePrizes = prizes.filter(p => 
      !p.isDrawn && !player.excludedPrizes.includes(p.name)
    );
    
    if (availablePrizes.length === 0) {
      alert('沒有可抽取的禮物了！');
      setIsDrawing(false);
      setCurrentPlayer(null);
      return;
    }

    const randomPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
    
    // 更新禮物狀態
    setPrizes(prizes.map(p => 
      p.id === randomPrize.id 
        ? { ...p, isDrawn: true, drawnBy: player.name }
        : p
    ));

    // 更新玩家狀態
    setPlayers(players.map(p =>
      p.id === player.id
        ? { 
            ...p, 
            remainingDraws: p.remainingDraws - 1,
            prizes: [...p.prizes, randomPrize.name]
          }
        : p
    ));

    setDrawnPrize(randomPrize);
    
    setTimeout(() => {
      setIsDrawing(false);
      setDrawnPrize(null);
      setCurrentPlayer(null);
    }, 3000);
  };

  // 查看結果並生成ID
  const viewResult = () => {
    const data: LotteryData = {
      timestamp: lotteryTimestamp,
      players: players,
      prizes: prizes
    };
    const id = generateIdWithData(data);
    setLotteryId(id);
    setStep('result');
  };

  // 搜索抽獎結果
  const searchResult = () => {
    if (!searchId.trim()) {
      alert('請輸入抽獎ID！');
      return;
    }

    const data = parseIdToData(searchId.trim());
    if (data) {
      setLotteryTimestamp(data.timestamp);
      setPlayers(data.players);
      setPrizes(data.prizes);
      setLotteryId(searchId.trim());
      setStep('result');
    } else {
      alert('無效的抽獎ID！請確認ID格式正確。');
    }
  };

  // 複製ID
  const copyId = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lotteryId)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          fallbackCopy(lotteryId);
        });
    } else {
      fallbackCopy(lotteryId);
    }
  };

  // 回退的複製方法
  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
      alert('複製失敗，請手動複製ID');
    }
    
    document.body.removeChild(textArea);
  };

  // 重新開始
  const restart = () => {
    setStep('setup');
    setPlayers([]);
    setPrizes([]);
    setLotteryId('');
    setSearchId('');
    setCurrentPlayer(null);
    setDrawnPrize(null);
    setLotteryTimestamp(0);
  };

  // 格式化時間
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full p-3 shadow-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
              <div>
                <h1 className="text-amber-900 flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎁
                  </motion.span>
                  抽禮物遊戲
                </h1>
                <p className="text-gray-600">設定玩家和禮物，開始抽獎吧！</p>
              </div>
            </div>
            {lotteryTimestamp > 0 && step === 'result' && (
              <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="text-amber-900">{formatDate(lotteryTimestamp)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Setup Step */}
        {step === 'setup' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Players Setup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                玩家設定
              </h2>

              <div className="mb-4 space-y-3">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  placeholder="輸入玩家名字"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">抽獎次數</label>
                    <input
                      type="number"
                      min="1"
                      value={newPlayerDraws}
                      onChange={(e) => setNewPlayerDraws(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addPlayer}
                    className="self-end bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    新增
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-50 p-4 rounded-2xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-gray-900">{player.name}</div>
                          <div className="text-gray-500">可抽 {player.maxDraws} 次</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openExcludeModal(player)}
                          className="text-orange-500 p-2"
                          title="設定禁止抽取的禮物"
                        >
                          <Ban className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removePlayer(player.id)}
                          className="text-red-500 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                    {player.excludedPrizes.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-200">
                        <div className="text-xs text-gray-600 mb-1">禁止抽取：</div>
                        <div className="flex flex-wrap gap-1">
                          {player.excludedPrizes.map((prizeName, i) => (
                            <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              🚫 {prizeName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Prizes Setup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-pink-500" />
                禮物設定
              </h2>

              <div className="mb-4 flex gap-3">
                <input
                  type="text"
                  value={newPrizeName}
                  onChange={(e) => setNewPrizeName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPrize()}
                  placeholder="輸入禮物名稱"
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addPrize}
                  className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  新增
                </motion.button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {prizes.map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-pink-50 p-4 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                        className="text-3xl"
                      >
                        🎁
                      </motion.div>
                      <div className="text-gray-900">{prize.name}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removePrize(prize.id)}
                      className="text-red-500 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Search and Start Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 space-y-4"
            >
              {/* Search Section */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-500" />
                  查看歷史抽獎結果
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  💡 提示：抽獎ID包含完整的抽獎結果，任何人只要有ID就能查看結果！
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchResult()}
                    placeholder="輸入完整的抽獎ID（以 LOTTERY- 開頭）"
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={searchResult}
                    className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-8 py-3 rounded-2xl shadow-lg flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    查詢
                  </motion.button>
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startGame}
                disabled={players.length === 0 || prizes.length === 0}
                className={`w-full py-6 rounded-3xl shadow-2xl text-2xl transition-all ${
                  players.length === 0 || prizes.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white'
                }`}
              >
                {players.length === 0 || prizes.length === 0
                  ? '⚠️ 請先添加玩家和禮物'
                  : '🎉 開始抽獎遊戲 🎉'}
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Playing Step */}
        {step === 'playing' && (
          <div className="space-y-6">
            {/* Drawing Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">🎁 抽獎中...</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={viewResult}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                >
                  完成抽獎
                </motion.button>
              </div>

              {/* Gift Box Animation Area */}
              <div className="relative h-96 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl p-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isDrawing && currentPlayer ? (
                    <motion.div
                      key="drawing"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, -10, 10, 0],
                          scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-9xl mb-4"
                      >
                        🎁
                      </motion.div>
                      <h3 className="text-gray-900 mb-2">{currentPlayer.name} 正在抽獎...</h3>
                      <div className="flex gap-1 justify-center">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                            className="w-2 h-2 bg-pink-500 rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : drawnPrize ? (
                    <motion.div
                      key="result"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-9xl mb-4"
                      >
                        🎉
                      </motion.div>
                      <h3 className="text-gray-900 mb-2">恭喜抽到</h3>
                      <p className="text-pink-500 text-4xl">{drawnPrize.name}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl mb-4"
                      >
                        🎁
                      </motion.div>
                      <p className="text-gray-600">點擊下方玩家開始抽獎</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Players Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {players.map((player, index) => {
                const canDraw = player.remainingDraws > 0 && !isDrawing;
                const availableForPlayer = prizes.filter(p => 
                  !p.isDrawn && !player.excludedPrizes.includes(p.name)
                ).length;
                
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: canDraw && availableForPlayer > 0 ? 1.05 : 1 }}
                    onClick={() => canDraw && availableForPlayer > 0 && selectPlayer(player)}
                    className={`bg-white rounded-2xl p-6 shadow-lg ${
                      canDraw && availableForPlayer > 0 ? 'cursor-pointer hover:shadow-xl' : 'opacity-50'
                    } ${currentPlayer?.id === player.id ? 'ring-4 ring-orange-400' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-gray-900">{player.name}</h3>
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {player.remainingDraws}/{player.maxDraws}
                      </div>
                    </div>
                    {availableForPlayer === 0 && player.remainingDraws > 0 && (
                      <div className="text-red-500 text-sm mb-2">⚠️ 無可抽取的禮物</div>
                    )}
                    <div className="space-y-1">
                      {player.prizes.length > 0 ? (
                        player.prizes.map((prize, i) => (
                          <div key={i} className="text-gray-600 flex items-center gap-2">
                            <span className="text-pink-500">🎁</span>
                            {prize}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400">尚未抽獎</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Result Step */}
        {step === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Lottery ID Card */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl shadow-2xl p-8 text-white">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h2 className="mb-2">🎊 抽獎完成！</h2>
                  <p className="text-white/90">
                    抽獎時間：{formatDate(lotteryTimestamp)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restart}
                  className="bg-white text-orange-500 px-6 py-3 rounded-2xl shadow-lg"
                >
                  重新開始
                </motion.button>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Ticket className="w-6 h-6" />
                  <h3 className="text-white">抽獎ID（含完整結果）</h3>
                </div>
                <div className="bg-white/90 rounded-xl p-4 mb-3">
                  <p className="text-gray-800 break-all font-mono text-sm">
                    {lotteryId}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyId}
                    className="flex-1 bg-white text-orange-500 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        已複製
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        複製ID
                      </>
                    )}
                  </motion.button>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  💡 將此ID分享給其他人，他們就能查看完整的抽獎結果！
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Players Results */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  玩家獲獎情況
                </h3>
                <div className="space-y-3">
                  {players.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-blue-50 rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-900">{player.name}</div>
                          <div className="text-gray-500">
                            抽了 {player.maxDraws - player.remainingDraws}/{player.maxDraws} 次
                          </div>
                        </div>
                      </div>
                      {player.excludedPrizes.length > 0 && (
                        <div className="mb-2 text-xs text-gray-600">
                          禁止抽取：{player.excludedPrizes.map((p, i) => (
                            <span key={i} className="text-red-600">
                              {i > 0 && '、'}{p}
                            </span>
                          ))}
                        </div>
                      )}
                      {player.prizes.length > 0 ? (
                        <div className="ml-13 space-y-1">
                          {player.prizes.map((prize, i) => (
                            <div key={i} className="text-gray-700 flex items-center gap-2">
                              <span className="text-pink-500">🎁</span>
                              {prize}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="ml-13 text-gray-400">未抽到任何禮物</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Prizes Status */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-500" />
                  禮物狀態
                </h3>
                <div className="space-y-3">
                  {prizes.map((prize, index) => (
                    <motion.div
                      key={prize.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-2xl p-4 ${
                        prize.isDrawn ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={!prize.isDrawn ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-3xl"
                        >
                          {prize.isDrawn ? '✅' : '🎁'}
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-gray-900">{prize.name}</div>
                          {prize.isDrawn && prize.drawnBy && (
                            <div className="text-green-600">已被 {prize.drawnBy} 抽走</div>
                          )}
                          {!prize.isDrawn && (
                            <div className="text-gray-500">尚未被抽取</div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Exclude Prize Modal */}
        <AnimatePresence>
          {showExcludeModal && excludingPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowExcludeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900 flex items-center gap-2">
                    <Ban className="w-6 h-6 text-orange-500" />
                    設定 {excludingPlayer.name} 禁止抽取的禮物
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowExcludeModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  點擊選擇該玩家無法抽取的禮物
                </p>

                <div className="space-y-2">
                  {prizes.map((prize) => {
                    const isExcluded = excludingPlayer.excludedPrizes.includes(prize.name);
                    return (
                      <motion.div
                        key={prize.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleExcludePrize(prize.name)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all ${
                          isExcluded
                            ? 'bg-red-100 border-2 border-red-400'
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {isExcluded ? '🚫' : '🎁'}
                            </span>
                            <span className={isExcluded ? 'text-red-700' : 'text-gray-900'}>
                              {prize.name}
                            </span>
                          </div>
                          {isExcluded && (
                            <span className="text-red-600 text-sm">已禁止</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExcludeModal(false)}
                  className="w-full mt-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 rounded-2xl shadow-lg"
                >
                  完成設定
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}