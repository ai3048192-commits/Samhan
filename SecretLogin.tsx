import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SecretLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("خطأ: " + error.message);
      setLoading(false);
      return;
    }

    // التحقق من الإيميل المخصص للأدمن فقط
    if (data.user?.email === 'abdulrahmansamhan1@gmail.com') {
      navigate('/'); 
    } else {
      alert("غير مصرح لك بالدخول!");
      await supabase.auth.signOut();
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/4 w-72 h-72 bg-orange-500/10 blur-[100px] rounded-full" />
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-sm p-8 bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-black text-white text-center mb-6">دخول الإدارة</h1>
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="البريد الإلكتروني" className="p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orange-500 outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orange-500 outline-none" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all">
          {loading ? 'جاري التحقق...' : 'دخول الإدارة'}
        </button>
      </form>
    </div>
  );
}