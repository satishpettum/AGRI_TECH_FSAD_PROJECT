import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-farm.jpg';
import { Sprout, Users, BookOpen, TrendingUp, Globe, ShieldCheck, MessageSquare, Leaf } from 'lucide-react';
const stats = [
    { value: '10K+', label: 'Farmers Connected' },
    { value: '500+', label: 'Expert Guides' },
    { value: '50+', label: 'Sectors Covered' },
    { value: '100+', label: 'Initiatives Active' },
];
const features = [
    { icon: BookOpen, title: 'Educational Resources', desc: 'Access comprehensive guides, tutorials, and best practices for modern farming techniques.' },
    { icon: Users, title: 'Expert Network', desc: 'Connect directly with agricultural experts for personalized guidance and mentorship.' },
    { icon: TrendingUp, title: 'Market Insights', desc: 'Stay updated with market trends, pricing data, and sector-specific opportunities.' },
    { icon: Globe, title: 'Cross-Sector Links', desc: 'Bridge farming with technology, finance, healthcare, and other vital sectors.' },
    { icon: MessageSquare, title: 'Community Forums', desc: 'Join discussions, share experiences, and learn from fellow farmers worldwide.' },
    { icon: ShieldCheck, title: 'Government Schemes', desc: 'Discover subsidies, loans, and government programs available for farmers.' },
];
export default function Index() {
    return (<div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <img src={heroImage} alt="Lush green farmland at golden hour" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-hero-overlay"/>
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary">
              <Leaf className="h-4 w-4"/> Empowering Agriculture
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Cultivating a <span className="text-secondary">Brighter</span> Future
            </h1>
            <p className="font-body text-lg text-primary-foreground/80 md:text-xl">
              Join thousands of farmers, experts, and advocates building a sustainable agricultural ecosystem. Access resources, connect with sectors, and transform livelihoods.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/signup">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold text-base px-8">
                  Join Now — It's Free
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-base px-8">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-primary py-8">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (<div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-secondary md:text-4xl">{s.value}</div>
              <div className="font-body text-sm text-primary-foreground/70 mt-1">{s.label}</div>
            </div>))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-section-warm py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Everything Farmers Need</h2>
            <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
              A comprehensive platform designed to empower farmers with knowledge, connections, and opportunities across every sector.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (<Card key={f.title} className="group border-border/50 bg-background transition-all hover:shadow-warm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-6 w-6"/>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-2xl bg-primary p-12 text-center md:p-16">
            <Sprout className="mx-auto mb-4 h-12 w-12 text-secondary"/>
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Transform Agriculture?
            </h2>
            <p className="font-body mt-4 max-w-xl mx-auto text-primary-foreground/80">
              Whether you're a farmer seeking resources, an expert wanting to share knowledge, or simply passionate about agriculture — there's a place for you here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-8">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body px-8">
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
