import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Target, Heart, Globe } from 'lucide-react';

const values = [
{ icon: Target, title: 'Mission', desc: 'To bridge the gap between farmers and modern resources, ensuring sustainable livelihoods and food security for all.' },
{ icon: Heart, title: 'Community First', desc: 'We believe in the power of community. Every farmer deserves access to knowledge, markets, and expert support.' },
{ icon: Globe, title: 'Global Impact', desc: 'Connecting agricultural ecosystems across countries to share innovations and create cross-sector opportunities.' }];


export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container text-center">
            <Leaf className="mx-auto h-12 w-12 text-secondary mb-4" />
            <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">About AgriConnect</h1>
            <p className="font-body mt-4 max-w-2xl mx-auto text-primary-foreground/80 text-lg">
              We're on a mission to inspire society about the importance of farming and help farmers benefit from partnerships across every sector of the economy.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-section-warm">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v) =>
              <Card key={v.title} className="text-center">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
                      <v.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="font-body text-muted-foreground leading-relaxed space-y-4">
              <p>
                AgriConnect was born from a simple observation: farmers — the backbone of our civilization — often lack access to the resources, technology, and market connections that could transform their livelihoods.
              </p>
              <p>
                Our platform brings together farmers, agricultural experts, government agencies, tech innovators, and the public to create a thriving ecosystem where knowledge flows freely and opportunities are accessible to all.
              </p>
              <p>
                From educational resources and expert consultations to community discussions and cross-sector partnerships, AgriConnect is building the future of sustainable agriculture — one connection at a time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}