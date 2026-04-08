import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-farm.jpg';
import { Sprout, Users, BookOpen, TrendingUp, Globe, ShieldCheck, MessageSquare, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIG } from '@/lib/roleConfig';

const stats = [
{ value: '10K+', label: 'Farmers Connected' },
{ value: '500+', label: 'Expert Guides' },
{ value: '50+', label: 'Sectors Covered' },
{ value: '100+', label: 'Initiatives Active' }];


const features = [
{ icon: BookOpen, title: 'Educational Resources', desc: 'Access comprehensive guides, tutorials, and best practices for modern farming techniques.' },
{ icon: Users, title: 'Expert Network', desc: 'Connect directly with agricultural experts for personalized guidance and mentorship.' },
{ icon: TrendingUp, title: 'Market Insights', desc: 'Stay updated with market trends, pricing data, and sector-specific opportunities.' },
{ icon: Globe, title: 'Cross-Sector Links', desc: 'Bridge farming with technology, finance, healthcare, and other vital sectors.' },
{ icon: MessageSquare, title: 'Community Forums', desc: 'Join discussions, share experiences, and learn from fellow farmers worldwide.' },
{ icon: ShieldCheck, title: 'Government Schemes', desc: 'Discover subsidies, loans, and government programs available for farmers.' }];

// Role-specific features
const ROLE_SPECIFIC_FEATURES = {
  farmer: [
    { icon: TrendingUp, title: 'Crop Management Tools', desc: 'Track your crops, monitor health, and plan irrigation schedules.' },
    { icon: BookOpen, title: 'Farming Guides', desc: 'Access step-by-step guides for crop cultivation and soil health.' },
    { icon: Users, title: 'Expert Consultation', desc: 'Get direct advice from agricultural experts in your region.' }
  ],
  expert: [
    { icon: BookOpen, title: 'Share Knowledge', desc: 'Write articles and guides to help farmers improve their practices.' },
    { icon: Users, title: 'Answer Queries', desc: 'Respond to farmer questions and build your reputation.' },
    { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Track article views, farmer engagement, and impact metrics.' }
  ],
  public: [
    { icon: Leaf, title: 'Learn Agriculture', desc: 'Beginner-friendly courses and articles about farming.' },
    { icon: Globe, title: 'Understand Food Systems', desc: 'Discover how food gets from farms to your table.' },
    { icon: MessageSquare, title: 'Join Community', desc: 'Connect with like-minded people passionate about sustainable food.' }
  ]
};

export default function Index() {
  const { user, role } = useAuth();
  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.public;

  // Get role-specific hero gradient
  const getHeroGradient = () => {
    const gradients = {
      farmer: 'from-emerald-600/80 via-green-600/80 to-teal-600/80',
      expert: 'from-indigo-600/80 via-blue-600/80 to-slate-900/80',
      public: 'from-amber-600/80 via-orange-600/80 to-rose-600/80'
    };
    return gradients[role] || gradients.public;
  };

  const getRoleButtonColor = () => {
    const colors = {
      farmer: 'bg-emerald-600 text-white hover:bg-emerald-700',
      expert: 'bg-indigo-600 text-white hover:bg-indigo-700',
      public: 'bg-amber-600 text-white hover:bg-amber-700'
    };
    return colors[role] || colors.public;
  };

  // Show personalized dashboard if user is logged in
  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Personalized Welcome Section */}
        <section className={`bg-gradient-to-br ${roleConfig.bgGradient} text-white py-16`}>
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl font-bold mb-4">
                Welcome back!
              </h1>
              <p className="font-body text-lg opacity-90 mb-6">
                {role === 'farmer' && "Ready to enhance your farming practices? Explore resources and connect with experts."}
                {role === 'expert' && "Share your knowledge and help shape the future of agriculture."}
                {role === 'public' && "Continue your agriculture learning journey with our community."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/dashboard">
                  <Button className="bg-white text-slate-900 hover:bg-opacity-90 font-semibold">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Role-specific Quick Actions */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="font-display text-3xl font-bold mb-8">Quick Actions</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {ROLE_SPECIFIC_FEATURES[role]?.map((feature) => (
                <Card key={feature.title} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className={`mb-4 inline-flex rounded-xl p-3 ${roleConfig.bgLight} ${roleConfig.accentColor}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Show general landing page if not logged in
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <img src={heroImage} alt="Lush green farmland at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${getHeroGradient()}`} />
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <Leaf className="h-4 w-4" /> Empowering Agriculture
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Cultivating a <span className="text-yellow-200">Brighter</span> Future
            </h1>
            <p className="font-body text-lg text-white/90 md:text-xl">
              Join thousands of farmers, experts, and advocates building a sustainable agricultural ecosystem. Access resources, connect with sectors, and transform livelihoods.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-opacity-90 font-body font-semibold text-base px-8">
                  Join Now — It's Free
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-body text-base px-8">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-slate-900 py-8">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-emerald-400 md:text-4xl">{s.value}</div>
              <div className="font-body text-sm text-slate-300 mt-1">{s.label}</div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Everything Farmers Need</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
              A comprehensive platform designed to empower farmers with knowledge, connections, and opportunities across every sector.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) =>
            <Card key={f.title} className="group border-slate-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-12 text-center md:p-16 shadow-xl">
            <Sprout className="mx-auto mb-4 h-12 w-12 text-white" />
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Agriculture?
            </h2>
            <p className="font-body mt-4 max-w-xl mx-auto text-white/90">
              Whether you're a farmer seeking resources, an expert wanting to share knowledge, or simply passionate about agriculture — there's a place for you here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-opacity-90 font-body font-semibold px-8">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-body px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}