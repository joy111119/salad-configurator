import { useState } from 'react';
import Modal from './Modal';
import { login as loginApi, register as registerApi } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  function reset() {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  }

  function switchMode(m: 'login' | 'register') {
    reset();
    setMode(m);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const data = await registerApi(name, email, password);
        login(data.token, data.name);
        setSuccess(`Account created! Welcome, ${data.name} 🎉`);
        setTimeout(() => { reset(); onClose(); }, 1500);
      } else {
        const data = await loginApi(email, password);
        login(data.token, data.name);
        reset();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  const buttonLabel = loading
    ? mode === 'login' ? 'Logging in...' : 'Creating account...'
    : mode === 'login' ? 'Login' : 'Create Account';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => switchMode('login')}
          disabled={loading}
          className={`flex-1 pb-2 font-semibold text-sm transition-colors ${
            mode === 'login'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => switchMode('register')}
          disabled={loading}
          className={`flex-1 pb-2 font-semibold text-sm transition-colors ${
            mode === 'register'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'register' && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-green-400 disabled:opacity-50"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-green-400 disabled:opacity-50"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-green-400 disabled:opacity-50"
            required
          />
        </div>

        {loading && (
          <p className="text-sm text-gray-500 text-center animate-pulse">
            {mode === 'login' ? 'Logging in...' : 'Creating your account...'} Please wait.
          </p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-2 rounded-lg mt-2 transition-colors"
        >
          {buttonLabel}
        </button>
      </form>
    </Modal>
  );
}

export default LoginModal;
