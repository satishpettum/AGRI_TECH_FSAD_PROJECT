import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Star, MessageSquare, Search, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { fetchExperts } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const ROLE_SPECIFIC_EXPERTS_CONFIG = {
  farmer: {
    title: 'Find Agricultural Experts',
    description: 'Connect with leading specialists for personalized guidance and mentorship on your farming journey.',
    buttonText: 'Contact Expert',
    ctaAction: 'contact',
    heroBg: 'bg-emerald-600',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50'
  },
  expert: {
    title: 'Expert Community',
    description: 'Connect and collaborate with other agricultural experts to improve farming practices worldwide.',
    buttonText: 'View Profile',
    ctaAction: 'view',
    heroBg: 'bg-indigo-600',
    accentColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50'
  },
  public: {
    title: 'Meet Our Experts',
    description: 'Learn from experienced agricultural professionals and discover their insights about sustainable farming.',
    buttonText: 'Learn More',
    ctaAction: 'learn',
    heroBg: 'bg-slate-800',
    accentColor: 'text-slate-600',
    accentBg: 'bg-slate-100'
  }
};

export default function Experts() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const pageConfig = ROLE_SPECIFIC_EXPERTS_CONFIG[role] || ROLE_SPECIFIC_EXPERTS_CONFIG.public;

  const { data: experts = [], isLoading, isError, error } = useQuery({
    queryKey: ['experts'],
    queryFn: fetchExperts,
    staleTime: 1000 * 60,
  });

  const filtered = useMemo(() => {
    return experts.filter((expert) => {
      const query = search.toLowerCase();
      return (
        expert.name.toLowerCase().includes(query) ||
        expert.specialty.toLowerCase().includes(query) ||
        expert.location.toLowerCase().includes(query)
      );
    });
  }, [experts, search]);

  const handleAction = (expert) => {
    if (pageConfig.ctaAction === 'contact') {
      window.location.href = `mailto:${expert.contactEmail}`;
    } else if (pageConfig.ctaAction === 'view') {
      navigate(`/experts/${expert.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-10 animate-fade-in">
        <div className="container max-w-7xl">
          {/* Role-specific hero section */}
          <div className={`mb-10 rounded-3xl ${pageConfig.heroBg} p-10 text-white shadow-sm relative overflow-hidden`}>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
            <div className="relative z-10">
               <h1 className="text-4xl font-bold tracking-tight">{pageConfig.title}</h1>
               <p className="mt-3 max-w-2xl text-lg opacity-90">{pageConfig.description}</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search experts by name, specialty, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-base bg-white border-slate-200 rounded-full focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-slate-500 font-medium">Loading experts…</div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">
              Failed to load experts: {error?.message || 'Please refresh the page.'}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((e) => (
                <Card key={e.id} className="group hover:shadow-hover hover:-translate-y-1 bg-white border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all">
                  <CardContent className="p-6 text-center flex flex-col h-full items-center">
                    <div className="relative inline-block mb-5">
                      <Avatar className={`h-24 w-24 border-4 border-white shadow-sm ${pageConfig.heroBg} text-white`}>
                        <AvatarFallback className="text-2xl font-bold">{e.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {role === 'expert' && (
                        <div className="absolute bottom-1 right-1 rounded-full bg-primary p-1 border-2 border-white shadow-sm">
                          <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">{e.name}</h3>
                    <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-600 hover:bg-slate-200 border-0">{e.specialty}</Badge>
                    <p className="mt-3 text-sm text-slate-500 line-clamp-3 mb-4">{e.bio}</p>
                    
                    <div className="mt-auto w-full pt-4 border-t border-slate-100">
                       <div className="flex items-center justify-between text-sm mb-4">
                         <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                           <MapPin className="h-4 w-4" /> {e.location}
                         </div>
                         <div className="flex items-center gap-1.5 text-slate-500">
                           <Star className="h-4 w-4 text-amber-400 fill-current" />
                           <span className="font-bold text-slate-700">{e.rating?.toFixed(1)}</span>
                           <span className="text-xs">({e.reviews})</span>
                         </div>
                       </div>
                       
                       <Button
                         onClick={() => handleAction(e)}
                         className={`w-full gap-2 shadow-sm font-medium ${
                           role === 'farmer' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                           role === 'expert' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :
                           'bg-slate-800 hover:bg-slate-900 text-white'
                         }`}
                         size="sm"
                       >
                         <MessageSquare className="h-4 w-4" /> {pageConfig.buttonText}
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mt-6">
              <Search className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No experts matched your search.</p>
              <p className="text-slate-500 mt-1">Try another keyword or specialty.</p>
              <Button variant="outline" className="mt-6 border-slate-300 bg-white hover:bg-slate-50" onClick={() => setSearch('')}>Clear Search</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
