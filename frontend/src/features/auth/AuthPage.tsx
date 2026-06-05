import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, ShieldAlert, User, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Panel } from '../../components/ui/Panel';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/auth.store';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: 'patient' | 'doctor' | 'assistant' | 'admin' | 'super_admin';
    firstName: string;
    lastName: string;
  };
  accessToken: string;
  refreshToken: string;
}

export function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'assistant' | 'admin'>('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const body = isRegister
        ? { email, password, firstName, lastName, role }
        : { email, password };

      const res = await api<AuthResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body)
      });

      setAuth(res.user, res.accessToken, res.refreshToken);
      
      // Redirect based on role
      if (res.user.role === 'patient') navigate('/patient');
      else if (res.user.role === 'doctor') navigate('/doctor');
      else if (res.user.role === 'assistant') navigate('/assistant');
      else if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'super_admin') navigate('/super-admin');
      else navigate('/');

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Panel className="relative border border-primary/20 bg-background/50 shadow-glow backdrop-blur-2xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,hsl(var(--primary)/0.15),transparent_16rem)]" />
          
          <div className="mb-6 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {isRegister ? <UserPlus size={24} /> : <KeyRound size={24} />}
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-foreground">
              {isRegister ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className="mt-1 text-sm text-foreground/60">
              {isRegister ? 'Register for Doctor Hub care network' : 'Sign in to access your dashboard'}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <ShieldAlert size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid gap-3 grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">First Name</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 text-foreground/30" size={16} />
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-md border border-border bg-background/50 py-2 pl-9 pr-3 text-sm transition focus:border-primary focus:outline-none"
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Last Name</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 text-foreground/30" size={16} />
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-md border border-border bg-background/50 py-2 pl-9 pr-3 text-sm transition focus:border-primary focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-foreground/30" size={16} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-background/50 py-2 pl-9 pr-3 text-sm transition focus:border-primary focus:outline-none"
                  placeholder="jane.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Password</label>
              <div className="relative mt-1">
                <KeyRound className="absolute left-3 top-3 text-foreground/30" size={16} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border bg-background/50 py-2 pl-9 pr-3 text-sm transition focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Register As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  className="mt-1 w-full rounded-md border border-border bg-background/50 py-2 px-3 text-sm transition focus:border-primary focus:outline-none"
                >
                  <option value="patient" className="bg-background">Patient</option>
                  <option value="doctor" className="bg-background">Doctor</option>
                  <option value="assistant" className="bg-background">Assistant</option>
                  <option value="admin" className="bg-background">Admin</option>
                </select>
              </div>
            )}

            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-5 text-center text-xs text-foreground/50">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="font-bold text-primary hover:underline focus:outline-none"
            >
              {isRegister ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
