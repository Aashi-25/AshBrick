import { useState } from 'react';
import { supabase } from '../lib/supabase';
<<<<<<< HEAD
import { Eye, EyeOff, Loader2, Factory } from 'lucide-react';
=======
import { Eye, EyeOff, Loader2 } from 'lucide-react';
>>>>>>> upstream/main

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('❌ Passwords do not match.');
      return;
    }

<<<<<<< HEAD
    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters.');
      return;
    }

=======
>>>>>>> upstream/main
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage('❌ ' + error.message);
    } else {
      setMessage('✅ Password updated successfully. You can now log in.');
<<<<<<< HEAD
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
=======
>>>>>>> upstream/main
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
<<<<<<< HEAD
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">AshBrick</span>
          </div>
          <h1 className="text-xl font-semibold text-center">Reset Your Password</h1>
        </div>

        <div className="p-6 space-y-6">
          {message && (
            <div className={`text-sm text-center px-4 py-3 rounded-xl ${
              message.includes('✅')
                ? 'bg-green-500/10 text-green-300 border border-green-400/30'
                : 'bg-red-500/10 text-red-300 border border-red-400/30'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-xl placeholder-white/50 text-white focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full py-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-xl placeholder-white/50 text-white focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Resetting...</span>
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="text-center">
            <a 
              href="/" 
              className="text-sm text-green-400 hover:text-green-500 font-medium"
            >
              ← Back to Login
            </a>
          </div>
        </div>
=======
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/10">
        <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>

        {message && (
          <div className={`text-sm text-center px-4 py-2 rounded ${
            message.includes('✅')
              ? 'bg-green-500/10 text-green-300 border border-green-400/30'
              : 'bg-red-500/10 text-red-300 border border-red-400/30'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-xl placeholder-white/50 text-white focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full py-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-xl placeholder-white/50 text-white focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Resetting...</span>
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
>>>>>>> upstream/main
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ResetPassword;
=======
export default ResetPassword;
>>>>>>> upstream/main
