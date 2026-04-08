import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp, Clock, Plus, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetchCommunity, postCommunity } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const ROLE_SPECIFIC_COMMUNITY_CONFIG = {
  farmer: {
    title: 'Farmer Community',
    description: 'Share experiences, ask questions, and learn from fellow farmers.',
    cta: 'New Farm Discussion',
    heroBg: 'bg-emerald-600',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white'
  },
  expert: {
    title: 'Expert Forum',
    description: 'Answer farmer questions, share research, and collaborate with other experts.',
    cta: 'Post Expert Insight',
    heroBg: 'bg-indigo-600',
    accentColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    buttonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white'
  },
  public: {
    title: 'Community Discussions',
    description: 'Join the conversation about agriculture, sustainability, and food production.',
    cta: 'Join Discussion',
    heroBg: 'bg-slate-800',
    accentColor: 'text-slate-600',
    accentBg: 'bg-slate-100',
    buttonClass: 'bg-slate-800 hover:bg-slate-900 text-white'
  }
};

export default function Community() {
  const { user, session, role } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [search, setSearch] = useState('');

  const pageConfig = ROLE_SPECIFIC_COMMUNITY_CONFIG[role] || ROLE_SPECIFIC_COMMUNITY_CONFIG.public;

  const { data: posts = [], isLoading, isError, error } = useQuery({
    queryKey: ['community'],
    queryFn: fetchCommunity,
    staleTime: 1000 * 60,
  });

  const mutation = useMutation({
    mutationFn: ({ title, category, content }) => postCommunity(session, title, category, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['community'] });
      toast({ title: 'Posted', description: 'Your discussion has been shared.' });
      setTitle('');
      setContent('');
      setCategory('General');
      setOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query) || post.authorName.toLowerCase().includes(query));
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, category, content });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-10 animate-fade-in">
        <div className="container max-w-5xl">
          {/* Role-specific hero section */}
          <div className={`mb-10 rounded-3xl ${pageConfig.heroBg} p-10 text-white shadow-sm relative overflow-hidden`}>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{pageConfig.title}</h1>
                <p className="mt-3 max-w-2xl text-lg opacity-90">{pageConfig.description}</p>
              </div>
              {user ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className={`shadow-sm h-12 px-6 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm whitespace-nowrap gap-2`}>
                      <Plus className="h-5 w-5" /> {pageConfig.cta}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-slate-900">
                        {role === 'expert' ? 'Share Expert Insight' : 'Start a Discussion'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                      <Input 
                        placeholder={role === 'expert' ? 'Expert insight title' : 'Discussion title'} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="h-12 border-slate-200 focus:ring-primary/20 shadow-sm" 
                        required 
                      />
                      <Input 
                        placeholder="Category (e.g. Technology, Policy)" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="h-12 border-slate-200 focus:ring-primary/20 shadow-sm" 
                        required 
                      />
                      <Textarea 
                        placeholder={
                          role === 'expert' ? 'Share your expert knowledge and guidance...' :
                          role === 'farmer' ? 'Share your farming experience or ask a question...' :
                          'Share your thoughts or questions...'
                        } 
                        rows={5} 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="resize-none border-slate-200 focus:ring-primary/20 shadow-sm p-4" 
                        required 
                      />
                      <div className="pt-2">
                        <Button type="submit" className={`w-full h-12 text-base font-semibold ${pageConfig.buttonClass}`} disabled={mutation.isPending}>
                          {mutation.isPending ? 'Posting...' : 'Post Discussion'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button className={`${pageConfig.buttonClass} gap-2 shadow-sm h-12 px-6 rounded-full font-medium`} asChild>
                  <a href="/login" className="flex items-center gap-2">
                     <Plus className="h-4 w-4" /> Sign in to Discuss
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 pb-4 border-b border-slate-200">
             <div className="relative w-full md:max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
               <Input 
                 value={search} 
                 onChange={(e) => setSearch(e.target.value)} 
                 placeholder="Search posts, topics, or authors..." 
                 className="pl-12 h-12 bg-white border-slate-200 rounded-full focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-base" 
               />
             </div>
             
             <div className="flex gap-2">
                <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-full h-10 px-4">Latest</Button>
                <Button variant="ghost" className="text-slate-500 rounded-full h-10 px-4 hover:text-slate-900 border border-transparent">Top</Button>
             </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-slate-500 font-medium">Loading discussions…</div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">
              Failed to load community posts: {error?.message || 'Please refresh the page.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group transition-all hover:shadow-hover border border-slate-200 bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-[2px]">
                  <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                     
                     <div className="hidden md:flex flex-col items-center justify-start max-w-[60px]">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10">
                           <ThumbsUp className="h-5 w-5" />
                        </Button>
                        <span className="font-semibold text-slate-700 py-1">{post.likes ?? 0}</span>
                     </div>
                     
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 text-xs font-medium"
                        >
                          {post.category}
                        </Badge>
                        <span className="text-slate-400 text-sm">•</span>
                        <span className="text-sm font-medium text-slate-700">{post.authorName}</span>
                        <span className="text-slate-400 text-sm">•</span>
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Clock className="h-3.5 w-3.5" /> {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
                      <p className="line-clamp-2 text-base text-slate-500 leading-relaxed mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm font-medium">
                         <div className="md:hidden flex items-center gap-1.5 text-slate-500">
                            <ThumbsUp className="h-4 w-4" /> {post.likes ?? 0} Likes
                         </div>
                         <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-primary transition-colors">
                            <MessageSquare className="h-4 w-4" /> Reply
                         </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mt-6">
              <MessageSquare className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No discussions found.</p>
              <p className="text-slate-500 mt-1">Be the first to start a conversation.</p>
              {user && (
                 <Button className={`mt-6 ${pageConfig.buttonClass}`} onClick={() => setOpen(true)}>Start Discussion</Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
