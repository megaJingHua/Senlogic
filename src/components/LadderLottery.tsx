import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Gift, Users, Ticket, Search, Copy, Check, ArrowLeft, Calendar, Ban, History, Database, Save, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

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
  session?: any;
}

export function LadderLottery({ onClose, session }: LadderLotteryProps) {
  const [step, setStep] = useState<'setup' | 'playing' | 'result' | 'history'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerDraws, setNewPlayerDraws] = useState(1);
  const [newPrizeName, setNewPrizeName] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPrize, setDrawnPrize] = useState<Prize | null>(null);
  const [lotteryId, setLotteryId] = useState('');
  const [copied, setCopied] = useState(false);
  const [lotteryTimestamp, setLotteryTimestamp] = useState<number>(0);
  const [showExcludeModal, setShowExcludeModal] = useState(false);
  const [excludingPlayer, setExcludingPlayer] = useState<Player | null>(null);
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ff545811`;

  // 將數據編碼到ID中
  const generateIdWithData = (data: LotteryData): string => {
    const jsonString = JSON.stringify(data);
    const base64 = btoa(encodeURIComponent(jsonString));
    return `LOTTERY-${base64}`;
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

  // 重新開始
  const restart = () => {
    setStep('setup');
    setPlayers([]);
    setPrizes([]);
    setLotteryId('');
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

  // 獲取歷史記錄
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/lottery`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      if (!response.ok) {
        console.error('無法獲取歷史記錄:', response.statusText);
        return;
      }
      const result = await response.json();
      if (result.success && result.data) {
        setHistoryRecords(result.data);
      }
    } catch (error) {
      console.error('獲取歷史記錄失敗:', error);
    }
  };

  // 保存當前抽獎結果
  const saveResult = async () => {
    if (!session) {
      toast.error('請先登入才能保存結果！');
      return;
    }

    setIsSaving(true);
    setSaveStatus('saving');
    try {
      const data: LotteryData = {
        timestamp: lotteryTimestamp,
        players: players,
        prizes: prizes
      };
      const response = await fetch(`${API_BASE}/lottery/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          lotteryId: lotteryId,
          data: data
        })
      });
      if (!response.ok) {
        throw new Error('無法保存結果');
      }
      const result = await response.json();
      if (result.success) {
        setSaveStatus('success');
        toast.success('結果已保存！');
        await fetchHistory();
      } else {
        throw new Error(result.error || '保存失敗');
      }
    } catch (error) {
      console.error('保存結果失敗:', error);
      setSaveStatus('error');
      toast.error('保存失敗');
    } finally {
      setIsSaving(false);
      // 3秒後重置狀態
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // 刪除歷史記錄
  const deleteRecord = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('確定要刪除這筆記錄嗎？此操作無法復原。')) return;

    try {
      const response = await fetch(`${API_BASE}/lottery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.access_token || publicAnonKey}`
        }
      });
      
      if (response.ok) {
        toast.success('記錄已刪除');
        // 從列表中移除
        setHistoryRecords(prev => prev.filter(record => {
           // 這裡需要根據 record 的 ID 來過濾，但 record 結構不確定，假設 id 屬性存在
           // 注意：get /lottery API 返回的結構包含 id
           return record.id !== id;
        }));
      } else {
        throw new Error('刪除失敗');
      }
    } catch (error) {
      console.error('刪除記錄失敗:', error);
      toast.error('刪除失敗');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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

            {/* Start and History Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 space-y-4"
            >
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

              {/* View History Button - Only show if there are records */}
              {historyRecords.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    fetchHistory();
                    setStep('history');
                  }}
                  className="w-full py-4 rounded-3xl shadow-xl bg-gradient-to-r from-indigo-400 to-purple-500 text-white flex items-center justify-center gap-3"
                >
                  <Database className="w-6 h-6" />
                  📊 查看所有保存的抽獎紀錄
                </motion.button>
              )}
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
                    layout
                    onClick={() => selectPlayer(player)}
                    whileHover={canDraw ? { scale: 1.05 } : {}}
                    whileTap={canDraw ? { scale: 0.95 } : {}}
                    className={`p-6 rounded-2xl shadow-lg transition-all ${
                      currentPlayer?.id === player.id
                        ? 'bg-yellow-100 ring-4 ring-yellow-400'
                        : player.remainingDraws === 0
                        ? 'bg-gray-100 opacity-60'
                        : canDraw
                        ? 'bg-white cursor-pointer hover:shadow-xl'
                        : 'bg-white opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-gray-800">{player.name}</div>
                      <div className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        剩 {player.remainingDraws} 次
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {player.prizes.map((prizeName, i) => (
                        <div key={i} className="flex items-center gap-2 text-pink-600 text-sm">
                          <span>🎁</span>
                          <span>{prizeName}</span>
                        </div>
                      ))}
                      {player.remainingDraws === 0 && player.prizes.length === 0 && (
                        <div className="text-gray-400 text-sm">未中獎</div>
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
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-gray-900 mb-2">🎉 抽獎結果 🎉</h2>
                <p className="text-gray-600">{formatDate(lotteryTimestamp)}</p>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {players.map((player) => (
                  <div key={player.id} className="bg-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm">
                        👤
                      </span>
                      {player.name}
                    </h3>
                    {player.prizes.length > 0 ? (
                      <ul className="space-y-2">
                        {player.prizes.map((prize, i) => (
                          <li key={i} className="flex items-center gap-2 text-pink-600 bg-white p-3 rounded-xl shadow-sm">
                            <span className="text-2xl">🎁</span>
                            <span className="font-medium">{prize}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400 italic bg-white p-3 rounded-xl text-center">
                        未獲得禮物
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {session ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveResult}
                    disabled={isSaving || saveStatus === 'success'}
                    className={`px-8 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-white ${
                      saveStatus === 'success' ? 'bg-green-500' :
                      saveStatus === 'error' ? 'bg-red-500' :
                      'bg-gradient-to-r from-blue-400 to-indigo-500'
                    }`}
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saveStatus === 'success' ? (
                      <>
                        <Check className="w-5 h-5" />
                        已保存
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        保存結果
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-2 text-orange-500 bg-orange-50 px-4 py-2 rounded-xl">
                    <LogIn className="w-5 h-5" />
                    <span className="text-sm">登入後即可保存抽獎記錄</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restart}
                  className="px-8 py-3 rounded-2xl shadow-lg bg-gray-100 text-gray-700 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  開始新遊戲
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* History Step */}
        {step === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-600" />
                歷史抽獎紀錄
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('setup')}
                className="bg-white px-4 py-2 rounded-xl shadow text-gray-600"
              >
                返回
              </motion.button>
            </div>

            <div className="grid gap-4">
              {historyRecords.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl shadow-lg text-gray-500">
                  尚無保存的記錄
                </div>
              ) : (
                historyRecords.map((record) => (
                  <motion.div
                    key={record.id} // 假設 API 返回 id
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      setLotteryTimestamp(record.timestamp);
                      setPlayers(record.players);
                      setPrizes(record.prizes);
                      setLotteryId(record.id || generateIdWithData(record));
                      setStep('result');
                    }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-purple-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                          <Gift className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-gray-900 font-bold text-lg">
                            {formatDate(record.timestamp)}
                          </div>
                          <div className="text-gray-500 text-sm flex gap-3">
                            <span>👥 {record.players?.length || 0} 位玩家</span>
                            <span>🎁 {record.prizes?.length || 0} 個禮物</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      {session && (
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => deleteRecord(record.id, e)} // 傳遞 record ID
                          className="p-2 rounded-full text-red-400 hover:text-red-600 transition-colors"
                          title="刪除此記錄"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Exclude Modal */}
        <AnimatePresence>
          {showExcludeModal && excludingPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowExcludeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Ban className="w-6 h-6 text-red-500" />
                    設定禁止抽取的禮物
                  </h3>
                  <button onClick={() => setShowExcludeModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">
                  點擊禮物將其加入禁止列表，<span className="font-bold text-blue-600">{excludingPlayer.name}</span> 將不會抽到這些禮物。
                </p>

                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto mb-6">
                  {prizes.map(prize => {
                    const isExcluded = excludingPlayer.excludedPrizes.includes(prize.name);
                    return (
                      <button
                        key={prize.id}
                        onClick={() => toggleExcludePrize(prize.name)}
                        className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                          isExcluded
                            ? 'bg-red-100 text-red-700 ring-2 ring-red-400'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xl">{isExcluded ? '🚫' : '🎁'}</span>
                        <span className="truncate">{prize.name}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowExcludeModal(false)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  完成設定
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}