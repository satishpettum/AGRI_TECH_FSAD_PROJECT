import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Star, MessageSquare } from 'lucide-react';
const experts = [
    { name: 'Dr. Priya Sharma', specialty: 'Soil Science', location: 'Punjab, India', rating: 4.9, reviews: 124, initials: 'PS' },
    { name: 'Prof. James Okafor', specialty: 'Crop Genetics', location: 'Lagos, Nigeria', rating: 4.8, reviews: 98, initials: 'JO' },
    { name: 'Dr. Maria Santos', specialty: 'Organic Farming', location: 'São Paulo, Brazil', rating: 4.9, reviews: 156, initials: 'MS' },
    { name: 'Rajesh Kumar', specialty: 'Irrigation Systems', location: 'Rajasthan, India', rating: 4.7, reviews: 87, initials: 'RK' },
    { name: 'Dr. Amina Hassan', specialty: 'Pest Management', location: 'Nairobi, Kenya', rating: 4.8, reviews: 112, initials: 'AH' },
    { name: 'Chen Wei', specialty: 'Agri-Tech', location: 'Shanghai, China', rating: 4.9, reviews: 203, initials: 'CW' },
];
export default function Experts() {
    return (<div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-10 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground">Agricultural Experts</h1>
            <p className="font-body text-muted-foreground mt-2 max-w-xl mx-auto">
              Connect with leading specialists for personalized guidance and mentorship.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experts.map((e) => (<Card key={e.name} className="group transition-all hover:shadow-warm hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto h-20 w-20 mb-4 bg-primary text-primary-foreground">
                    <AvatarFallback className="bg-primary text-primary-foreground font-display text-xl">{e.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-display text-lg font-semibold text-foreground">{e.name}</h3>
                  <Badge variant="outline" className="mt-2 font-body">{e.specialty}</Badge>
                  <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground font-body">
                    <MapPin className="h-3.5 w-3.5"/> {e.location}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-secondary">
                      <Star className="h-4 w-4 fill-current"/>
                      <span className="font-body font-semibold text-sm">{e.rating}</span>
                    </div>
                    <span className="text-muted-foreground font-body text-xs">({e.reviews} reviews)</span>
                  </div>
                  <Button className="mt-4 w-full gap-2 font-body" variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4"/> Connect
                  </Button>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
