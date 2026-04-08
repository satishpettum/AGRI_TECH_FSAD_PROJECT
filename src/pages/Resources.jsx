import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Droplets, Bug, Sprout, DollarSign, Sun, Tractor, Plus, PenTool } from 'lucide-react';
import { fetchResources, fetchFavorites, toggleFavoriteResource } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIG } from '@/lib/roleConfig';

const categoryIcons = {
  Irrigation: Droplets,
  'Pest Control': Bug,
  'Crop Management': Sprout,
  'Market Access': DollarSign,
  'Organic Farming': Sprout,
  Technology: Sun,
};

// Role-specific configurations for Resources page
const ROLE_SPECIFIC_CONFIG = {
  farmer: {
    title: 'Farming Resources',
    description: 'Explore guides, tutorials, and best practices to enhance your farming knowledge and improve crop yields.',
    showCreateButton: false,
    buttonText: 'Save Resource'
  },
  expert: {
    title: 'Knowledge Base',
    description: 'Share your expertise with the farming community. View and create resources to guide farmers.',
    showCreateButton: true,
    buttonText: 'Write Article',
    ctaButton: { text: 'Write New Article', icon: PenTool }
  },
  public: {
    title: 'Learn About Farming',
    description: 'Start your agriculture journey with beginner-friendly guides and educational content.',
    showCreateButton: false,
    buttonText: 'Learn More'
  }
};

export default function Resources() {
  const { role, session } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.public;
  const pageConfig = ROLE_SPECIFIC_CONFIG[role] || ROLE_SPECIFIC_CONFIG.public;

  // Role-specific styling
  const getRoleStyles = () => {
    const styles = {
      farmer: {
        headerBg: 'bg-emerald-600',
        headerText: 'text-white',
        accentColor: 'text-emerald-600',
        accentBg: 'bg-emerald-50',
        buttonClasses: 'bg-emerald-600 hover:bg-emerald-700 text-white'
      },
      expert: {
        headerBg: 'bg-indigo-600',
        headerText: 'text-white',
        accentColor: 'text-indigo-600',
        accentBg: 'bg-indigo-50',
        buttonClasses: 'bg-indigo-600 hover:bg-indigo-700 text-white'
      },
      public: {
        headerBg: 'bg-slate-800',
        headerText: 'text-white',
        accentColor: 'text-slate-600',
        accentBg: 'bg-slate-100',
        buttonClasses: 'bg-slate-800 hover:bg-slate-900 text-white'
      }
    };
    return styles[role] || styles.public;
  };

  const roleStyles = getRoleStyles();

  const { data: resources = [], isLoading, isError, error } = useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
    staleTime: 1000 * 60,
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(session),
    enabled: !!session,
  });

  const favMutation = useMutation({
    mutationFn: (resourceId) => toggleFavoriteResource(session, resourceId),
    onSuccess: () => queryClient.invalidateQueries(['favorites'])
  });

  const categories = useMemo(() => {
    const categorySet = new Set(resources.map((item) => item.category));
    return ['All', ...Array.from(categorySet)];
  }, [resources]);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, search, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-10 animate-fade-in">
        <div className="container max-w-7xl">
          {/* Role-specific hero section */}
          <div className={`mb-10 rounded-3xl ${roleStyles.headerBg} p-10 shadow-sm relative overflow-hidden`}>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h1 className={`text-4xl font-bold tracking-tight ${roleStyles.headerText}`}>{pageConfig.title}</h1>
                <p className={`mt-3 max-w-xl text-lg ${roleStyles.headerText} opacity-90`}>
                  {pageConfig.description}
                </p>
              </div>
              {pageConfig.showCreateButton && pageConfig.ctaButton && (
                <Button className={`${roleStyles.buttonClasses} gap-2 shadow-sm h-12 px-6 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all`}>
                  <pageConfig.ctaButton.icon className="h-5 w-5" />
                  {pageConfig.ctaButton.text}
                </Button>
              )}
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                 placeholder="Search resources..." 
                 value={search} 
                 onChange={(e) => setSearch(e.target.value)} 
                 className="pl-11 h-12 bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 shadow-sm transition-all" 
              />
            </div>
            {session && (
              <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                {role === 'expert' ? (
                  <span>Articles published: <span className={`font-bold ml-1 ${roleStyles.accentColor}`}>12</span></span>
                ) : (
                  <span>Saved resources: <span className={`font-bold ml-1 ${roleStyles.accentColor}`}>{favorites.length}</span></span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
            {categories.map((c) =>
            <Badge
              key={c}
              variant="outline"
              className={`cursor-pointer text-sm px-4 py-2 rounded-full transition-all flex items-center border 
                ${activeCategory === c 
                  ? `${roleStyles.buttonClasses} border-transparent shadow-sm` 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
              onClick={() => setActiveCategory(c)}>
                {c}
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-slate-500 font-medium">Loading resources…</div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">
              Failed to load resources: {error?.message || 'Please refresh the page.'}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => {
                const Icon = categoryIcons[r.category] ?? BookOpen;
                const isSaved = favorites.includes(r.id);

                return (
                  <Card key={r.id} className="group transition-all hover:shadow-hover hover:-translate-y-1 bg-white border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                         <div className={`inline-flex rounded-xl ${roleStyles.accentBg} p-3 ${roleStyles.accentColor} group-hover:scale-110 transition-transform`}>
                           <Icon className="h-6 w-6" />
                         </div>
                         <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0">{r.category}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2 leading-tight">{r.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{r.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100">
                         <div className="flex items-center justify-between">
                           <div className="text-xs font-medium text-slate-400 max-w-[120px] truncate">
                             {r.authorName && <span>By {r.authorName}</span>}
                           </div>
                           
                           <div className="flex gap-2">
                             {r.sourceUrl && (
                               <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition bg-slate-100 text-slate-700 hover:bg-slate-200">
                                 Read
                               </a>
                             )}
                             {session && (
                               <button
                                 className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${isSaved ? `${roleStyles.buttonClasses} shadow-sm` : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'}`}
                                 type="button"
                                 onClick={() => favMutation.mutate(r.id)}>
                                 {role === 'expert' ? (isSaved ? 'Featured' : 'Feature') : (isSaved ? 'Saved' : 'Save')}
                               </button>
                             )}
                           </div>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <BookOpen className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No resources found</p>
              <p className="text-slate-500 mt-1">Try a different search term or category filter.</p>
              <Button variant="outline" className="mt-6 border-slate-300 bg-white hover:bg-slate-50" onClick={() => {setSearch(''); setActiveCategory('All');}}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
