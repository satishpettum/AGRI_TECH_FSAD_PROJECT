import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Sprout, DollarSign, Bug, Droplets, Sun, Tractor } from 'lucide-react';
import { useState } from 'react';
const categories = ['All', 'Crop Management', 'Irrigation', 'Pest Control', 'Market Access', 'Organic Farming', 'Technology'];
const sampleResources = [
    { title: 'Modern Irrigation Techniques', category: 'Irrigation', icon: Droplets, desc: 'Learn about drip irrigation, sprinkler systems, and water conservation methods to optimize crop yield.' },
    { title: 'Organic Pest Control Guide', category: 'Pest Control', icon: Bug, desc: 'Natural and eco-friendly ways to manage pests without harming the environment or soil health.' },
    { title: 'Understanding Crop Rotation', category: 'Crop Management', icon: Sprout, desc: 'How rotating crops improves soil fertility, reduces disease, and boosts overall farm productivity.' },
    { title: 'Selling at the Best Price', category: 'Market Access', icon: DollarSign, desc: 'Strategies for accessing direct markets, negotiating prices, and maximizing farm revenue.' },
    { title: 'Solar-Powered Farming', category: 'Technology', icon: Sun, desc: 'Harness solar energy for pumps, lighting, and equipment to reduce costs and go green.' },
    { title: 'Getting Started with Organic', category: 'Organic Farming', icon: Sprout, desc: 'A step-by-step guide to transitioning your farm to certified organic practices.' },
    { title: 'Farm Mechanization Basics', category: 'Technology', icon: Tractor, desc: 'Introduction to affordable farm machinery and tools to boost efficiency for small farms.' },
    { title: 'Government Loan Schemes', category: 'Market Access', icon: DollarSign, desc: 'Comprehensive list of subsidies, loans, and financial aid programs for farmers.' },
];
export default function Resources() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const filtered = sampleResources.filter((r) => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    return (<div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground">Farming Resources</h1>
            <p className="font-body text-muted-foreground mt-2 max-w-xl mx-auto">
              Explore guides, tutorials, and best practices to enhance your farming knowledge.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10"/>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (<Badge key={c} variant={activeCategory === c ? 'default' : 'outline'} className="cursor-pointer font-body text-sm px-4 py-1.5 transition-colors" onClick={() => setActiveCategory(c)}>
                {c}
              </Badge>))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (<Card key={r.title} className="group transition-all hover:shadow-warm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <r.icon className="h-6 w-6"/>
                  </div>
                  <Badge variant="outline" className="mb-3 font-body text-xs">{r.category}</Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{r.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </CardContent>
              </Card>))}
          </div>

          {filtered.length === 0 && (<div className="text-center py-16">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4"/>
              <p className="font-body text-muted-foreground">No resources found. Try a different search or category.</p>
            </div>)}
        </div>
      </main>
      <Footer />
    </div>);
}
