import { Activity, Bell, Bot, CalendarCheck, LayoutDashboard, LogOut, Shield, Stethoscope, User, Users } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { themes, useThemeStore } from '../../stores/theme.store';
import { useAuthStore } from '../../stores/auth.store';
import { Button } from '../ui/Button';

const nav = [
  { to: '/', label: 'Home', icon: Activity, public: true },
  { to: '/doctors', label: 'Doctors', icon: Stethoscope, public: true },
  { to: '/patient', label: 'Patient', icon: CalendarCheck, role: 'patient' },
  { to: '/doctor', label: 'Doctor', icon: LayoutDashboard, role: 'doctor' },
  { to: '/assistant', label: 'Assistant', icon: Bell, role: 'assistant' },
  { to: '/admin', label: 'Admin', icon: Users, role: 'admin' },
  { to: '/super-admin', label: 'Super Admin', icon: Shield, role: 'super_admin' },
  { to: '/ai', label: 'AI', icon: Bot, protected: true }
];

export function Shell({ children }: PropsWithChildren) {
  const { theme, setTheme, customThemeColors } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Filter links based on user status
  const visibleNav = nav.filter((item) => {
    if (item.public) return true;
    if (!isAuthenticated) return false;
    if (item.protected) return true;
    return item.role === user?.role;
  });

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const customStyles = theme === 'custom' ? {
    '--background': customThemeColors.background,
    '--foreground': customThemeColors.foreground,
    '--primary': customThemeColors.primary,
    '--accent': customThemeColors.accent,
    '--border': customThemeColors.border,
  } as React.CSSProperties : undefined;

  return (
    <div data-theme={theme} style={customStyles} className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3 text-lg font-black tracking-wide">
            <span className="grid size-10 place-items-center rounded-md bg-primary text-slate-950">
              <Stethoscope size={20} />
            </span>
            Doctor Hub
          </Link>
          <div className="flex items-center gap-4">
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value as typeof theme)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              aria-label="Theme"
            >
              {themes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-sm font-semibold">
                  {user.firstName} {user.lastName} ({user.role})
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary border border-primary/20">
                  <User size={16} />
                </span>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="!min-h-9 !px-2 !py-0 text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')} className="!min-h-9">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[15rem_1fr]">
        <nav className="flex gap-2 overflow-x-auto rounded-lg border border-border bg-white/[0.04] p-2 lg:sticky lg:top-20 lg:block lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `mb-1 flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                  isActive ? 'bg-primary text-slate-950' : 'text-foreground/78 hover:bg-white/10'
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
