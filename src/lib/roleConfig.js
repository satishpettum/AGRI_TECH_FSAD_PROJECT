// Role-based configuration for UI themes and navigation
export const ROLE_CONFIG = {
  farmer: {
    name: 'Farmer',
    color: 'emerald',
    gradient: 'from-emerald-600 via-green-500 to-teal-500',
    icon: 'Sprout',
    bgGradient: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500',
    accentColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    navigation: [
      { to: '/', label: 'Home' },
      { to: '/resources', label: 'Resources' },
      { to: '/experts', label: 'Find Experts' },
      { to: '/community', label: 'Community' },
      { to: '/about', label: 'About' }
    ],
    description: 'Access resources & connect with experts',
    theme: {
      primary: '#059669', // emerald-600
      secondary: '#10b981', // emerald-500
      light: '#d1fae5' // emerald-100
    }
  },
  expert: {
    name: 'Agricultural Expert',
    color: 'indigo',
    gradient: 'from-slate-900 via-indigo-950 to-blue-900',
    icon: 'GraduationCap',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900',
    accentColor: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    navigation: [
      { to: '/', label: 'Home' },
      { to: '/resources', label: 'Articles' },
      { to: '/community', label: 'Farmer Questions' },
      { to: '/about', label: 'About' }
    ],
    description: 'Share knowledge & guide farmers',
    theme: {
      primary: '#4f46e5', // indigo-600
      secondary: '#6366f1', // indigo-500
      light: '#e0e7ff' // indigo-100
    }
  },
  public: {
    name: 'Public / Enthusiast',
    color: 'amber',
    gradient: 'from-amber-600 via-orange-500 to-rose-500',
    icon: 'Eye',
    bgGradient: 'bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500',
    accentColor: 'text-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    buttonPrimary: 'bg-amber-600 hover:bg-amber-700 text-white',
    navigation: [
      { to: '/', label: 'Home' },
      { to: '/resources', label: 'Learn' },
      { to: '/community', label: 'Community' },
      { to: '/about', label: 'About' }
    ],
    description: 'Explore & learn about farming',
    theme: {
      primary: '#b45309', // amber-600
      secondary: '#d97706', // amber-500
      light: '#fef3c7' // amber-100
    }
  }
};

export const getDefaultRole = () => 'public';

export const getThemeClass = (role, element) => {
  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.public;
  return roleConfig[element];
};
