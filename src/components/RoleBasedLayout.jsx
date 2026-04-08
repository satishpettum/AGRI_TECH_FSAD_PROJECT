import { ROLE_CONFIG } from '@/lib/roleConfig';
import Header from './Header';
import Footer from './Footer';

/**
 * RoleBasedLayout - Applies role-specific styling to the entire page
 * Changes background colors, accents, and overall theme based on user role
 */
export default function RoleBasedLayout({ children, role, className = '' }) {
  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.public;

  // Define role-specific background and color schemes
  const roleStyles = {
    farmer: {
      bgGradient: 'from-slate-50 to-emerald-50',
      accentBg: 'bg-emerald-50',
      borderAccent: 'border-emerald-200',
      textAccent: 'text-emerald-700'
    },
    expert: {
      bgGradient: 'from-slate-50 to-indigo-50',
      accentBg: 'bg-indigo-50',
      borderAccent: 'border-indigo-200',
      textAccent: 'text-indigo-700'
    },
    public: {
      bgGradient: 'from-slate-50 to-amber-50',
      accentBg: 'bg-amber-50',
      borderAccent: 'border-amber-200',
      textAccent: 'text-amber-700'
    }
  };

  const style = roleStyles[role] || roleStyles.public;

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b ${style.bgGradient} ${className}`}>
      <Header />
      <main className="flex-1 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
