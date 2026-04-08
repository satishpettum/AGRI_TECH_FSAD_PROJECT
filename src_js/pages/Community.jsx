import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp, Clock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
const sampleDiscussions = [
    { title: 'Best crops for dry climate?', category: 'Crop Management', author: 'Farmer Singh', replies: 24, likes: 45, time: '2 hours ago' },
    { title: 'Has anyone tried vertical farming?', category: 'Technology', author: 'Sarah Green', replies: 18, likes: 32, time: '5 hours ago' },
    { title: "Government subsidies for 2026 — what's new?", category: 'Policy', author: 'Rajesh K.', replies: 31, likes: 67, time: '1 day ago' },
    { title: 'Organic certification process explained', category: 'Organic Farming', author: 'Dr. Maria', replies: 12, likes: 28, time: '2 days ago' },
    { title: 'Water management in summer months', category: 'Irrigation', author: 'Amina H.', replies: 19, likes: 41, time: '3 days ago' },
    { title: 'Share your harvest success stories!', category: 'General', author: 'Community Team', replies: 56, likes: 102, time: '4 days ago' },
];
export default function Community() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    return (<div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground">Community</h1>
              <p className="font-body text-muted-foreground mt-1">Share experiences, ask questions, and learn together.</p>
            </div>
            {user ? (<Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 font-body"><Plus className="h-4 w-4"/> New Discussion</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-display">Start a Discussion</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <Input placeholder="Discussion title" className="font-body"/>
                    <Textarea placeholder="Share your thoughts, ask a question..." rows={4} className="font-body"/>
                    <Button className="w-full font-body" onClick={() => setOpen(false)}>Post Discussion</Button>
                  </div>
                </DialogContent>
              </Dialog>) : (<Button asChild className="gap-2 font-body">
                <a href="/login"><Plus className="h-4 w-4"/> Sign in to Discuss</a>
              </Button>)}
          </div>

          <div className="space-y-4">
            {sampleDiscussions.map((d) => (<Card key={d.title} className="group transition-all hover:shadow-warm cursor-pointer">
                <CardContent className="flex items-center gap-4 py-5">
                  <div className="hidden sm:flex rounded-xl bg-primary/10 p-3 text-primary">
                    <MessageSquare className="h-6 w-6"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-semibold text-foreground truncate">{d.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <Badge variant="outline" className="font-body text-xs">{d.category}</Badge>
                      <span className="font-body text-xs text-muted-foreground">by {d.author}</span>
                      <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                        <Clock className="h-3 w-3"/> {d.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-body shrink-0">
                    <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5"/> {d.replies}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5"/> {d.likes}</span>
                  </div>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
