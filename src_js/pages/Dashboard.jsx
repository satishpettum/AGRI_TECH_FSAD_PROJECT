import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, TrendingUp, FileText, Settings, Sprout, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Dashboard() {
    const { user, loading, role, profile } = useAuth();
    if (loading)
        return <div className="flex min-h-screen items-center justify-center"><Sprout className="h-8 w-8 animate-pulse text-primary"/></div>;
    if (!user)
        return <Navigate to="/login"/>;
    const roleLabels = { farmer: '🌾 Farmer', expert: '🎓 Expert', admin: '⚙️ Admin', public: '👁️ Public' };
    const dashboardCards = [
        { icon: BookOpen, title: 'Resources', desc: 'Browse guides and educational content', to: '/resources', color: 'bg-primary/10 text-primary' },
        { icon: Users, title: 'Experts', desc: 'Connect with agricultural specialists', to: '/experts', color: 'bg-secondary/20 text-accent' },
        { icon: MessageSquare, title: 'Community', desc: 'Join discussions and share experiences', to: '/community', color: 'bg-primary/10 text-primary' },
        { icon: TrendingUp, title: 'Market Insights', desc: 'View trends and opportunities', to: '/resources', color: 'bg-secondary/20 text-accent' },
    ];
    if (role === 'expert' || role === 'admin') {
        dashboardCards.push({ icon: FileText, title: 'Create Content', desc: 'Publish guides and articles', to: '/resources', color: 'bg-primary/10 text-primary' });
    }
    if (role === 'admin') {
        dashboardCards.push({ icon: Settings, title: 'Admin Panel', desc: 'Manage platform and users', to: '/dashboard', color: 'bg-destructive/10 text-destructive' });
    }
    return (<div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome, {profile?.full_name || 'User'}
            </h1>
            <p className="font-body text-muted-foreground mt-1">
              {roleLabels[role || 'public']} Dashboard • Your agricultural hub
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboardCards.map((card) => (<Link to={card.to} key={card.title}>
                <Card className="group cursor-pointer transition-all hover:shadow-warm hover:-translate-y-1 h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`rounded-xl p-3 ${card.color}`}>
                      <card.icon className="h-6 w-6"/>
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-sm text-muted-foreground">{card.desc}</p>
                  </CardContent>
                </Card>
              </Link>))}
          </div>

          {/* Quick Stats for farmers */}
          {role === 'farmer' && (<div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <Sprout className="mx-auto h-8 w-8 text-secondary mb-2"/>
                  <div className="font-display text-2xl font-bold">12</div>
                  <div className="font-body text-sm opacity-80">Resources Saved</div>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <GraduationCap className="mx-auto h-8 w-8 text-secondary mb-2"/>
                  <div className="font-display text-2xl font-bold">3</div>
                  <div className="font-body text-sm opacity-80">Expert Consultations</div>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="mx-auto h-8 w-8 text-secondary mb-2"/>
                  <div className="font-display text-2xl font-bold">8</div>
                  <div className="font-body text-sm opacity-80">Community Posts</div>
                </CardContent>
              </Card>
            </div>)}
        </div>
      </main>
      <Footer />
    </div>);
}
