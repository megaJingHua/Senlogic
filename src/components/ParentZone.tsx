import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Lock, LogIn, UserPlus, Clock, Save, LogOut, CheckCircle, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ff545811`;

export function ParentZone() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Settings States
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [savingSettings, setSavingSettings] = useState(false);

  // Check initial session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        fetchSettings(session.access_token);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchSettings(session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSettings = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/settings/time-limit`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTimeLimit(data.limit);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('無法載入設定');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('登入成功！');
    } catch (error: any) {
      toast.error(error.message || '登入失敗');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      // Use our server endpoint for auto-confirm signup
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || '註冊失敗');
      
      toast.success('註冊成功！請直接登入');
      setAuthMode('login');
    } catch (error: any) {
      toast.error(error.message || '註冊失敗');
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('已登出');
  };

  const handleSaveSettings = async () => {
    if (!session) return;
    setSavingSettings(true);
    try {
      const res = await fetch(`${API_BASE}/settings/time-limit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ limit: timeLimit }),
      });
      
      if (!res.ok) throw new Error('保存失敗');
      
      toast.success('設定已保存！');
    } catch (error) {
      toast.error('無法保存設定');
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">家長專區</h1>
                  <p className="text-orange-50">管理小朋友的遊戲時間與查看學習進度</p>
                </div>
              </div>
              {session && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
                >
                  <LogOut className="w-5 h-5" />
                  <span>登出</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-8">
            {!session ? (
              // Auth Forms
              <div className="max-w-md mx-auto">
                <div className="flex gap-4 mb-8 bg-orange-50 p-2 rounded-full">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-3 rounded-full text-center font-medium transition-all ${
                      authMode === 'login'
                        ? 'bg-white shadow-md text-orange-600'
                        : 'text-gray-500 hover:bg-orange-100/50'
                    }`}
                  >
                    登入帳號
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-3 rounded-full text-center font-medium transition-all ${
                      authMode === 'signup'
                        ? 'bg-white shadow-md text-orange-600'
                        : 'text-gray-500 hover:bg-orange-100/50'
                    }`}
                  >
                    註冊新帳號
                  </button>
                </div>

                <motion.form
                  key={authMode}
                  initial={{ opacity: 0, x: authMode === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={authMode === 'login' ? handleLogin : handleSignup}
                  className="space-y-4"
                >
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">家長暱稱</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none bg-gray-50 focus:bg-white transition-colors"
                          placeholder="例如：小明媽媽"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">電子郵件</label>
                    <div className="relative">
                      <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">密碼</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange-400 focus:outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="至少 6 位數"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                  >
                    {formLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        {authMode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        {authMode === 'login' ? '登入系統' : '立即註冊'}
                      </>
                    )}
                  </button>
                </motion.form>
              </div>
            ) : (
              // Dashboard
              <div className="grid md:grid-cols-2 gap-8">
                {/* Time Limit Settings */}
                <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-500">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">遊戲時間限制</h3>
                      <p className="text-gray-500 text-sm">設定小朋友每天可以玩遊戲的時間</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center justify-between text-gray-700 mb-4 font-medium">
                        每日上限 (分鐘)
                        <span className="text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
                          {timeLimit === 0 ? '無限制' : `${timeLimit} 分鐘`}
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        step="15"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>無限制</span>
                        <span>30分</span>
                        <span>60分</span>
                        <span>90分</span>
                        <span>120分</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-sm text-gray-600 border border-orange-100">
                      <p className="mb-2">💡 <strong>溫馨提示：</strong></p>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        <li>設為 0 分鐘表示不限制遊玩時間</li>
                        <li>時間限制會應用在「好玩遊戲區」的所有遊戲</li>
                        <li>建議適度休息，保護眼睛健康</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleSaveSettings}
                      disabled={savingSettings}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      {savingSettings ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          保存設定
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Coming Soon Features */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100 opacity-80">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">小孩帳號管理</h3>
                    </div>
                    <p className="text-gray-600 mb-4">即將推出：為家裡每個寶貝建立專屬檔案，分開記錄學習進度與獎勵。</p>
                    <button disabled className="text-indigo-400 text-sm font-medium border border-indigo-200 px-4 py-2 rounded-full">
                      開發中...
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border border-pink-100 opacity-80">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-500">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">實體獎勵兌換</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      即將推出：在好玩遊戲區獲得好成績，將有機會兌換實體貼紙與小禮物喔！
                    </p>
                    <button disabled className="text-pink-400 text-sm font-medium border border-pink-200 px-4 py-2 rounded-full">
                      敬請期待
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}