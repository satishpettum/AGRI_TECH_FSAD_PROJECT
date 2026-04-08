import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Newspaper, CalendarDays, ShoppingBag, Globe2, ArrowRight, Heart, BookOpen, Users, Lightbulb, Video, Download, Share2, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicDashboard({ profile }) {
  const highlightItems = [
    { title: 'Farming 101', desc: 'Learn the basics of modern agriculture', icon: Leaf, color: 'bg-orange-100 text-orange-600', to: '/resources', level: 'Beginner' },
    { title: 'Local Farmers Market', desc: 'Find fresh produce near you', icon: ShoppingBag, color: 'bg-rose-100 text-rose-600', to: '/community', level: 'Community' },
    { title: 'Global Impact', desc: 'How farming shapes the economy', icon: Globe2, color: 'bg-amber-100 text-amber-600', to: '/resources', level: 'Intermediate' },
    { title: 'Upcoming Events', desc: 'Workshops and farm tours', icon: CalendarDays, color: 'bg-yellow-100 text-yellow-600', to: '/community', level: 'Events' },
  ];

  const learningPaths = [
    { title: 'Sustainable Farming Basics', duration: '4 weeks', lessons: 12, completed: 3, difficulty: 'Beginner' },
    { title: 'Organic Gardening at Home', duration: '3 weeks', lessons: 8, completed: 0, difficulty: 'Beginner' },
    { title: 'Understanding Soil Health', duration: '5 weeks', lessons: 15, completed: 5, difficulty: 'Intermediate' },
  ];

  const upcomingEvents = [
    { title: 'Community Farm Visit', date: 'Mar 15, 2026', location: 'Local Farm Co-op', attendees: 24, type: 'Tour' },
    { title: 'Urban Gardening Workshop', date: 'Mar 22, 2026', location: 'City Center', attendees: 15, type: 'Workshop' },
    { title: 'Farmers Market Talk', date: 'Mar 29, 2026', location: 'Downtown Market', attendees: 8, type: 'Talk' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 p-8 shadow-xl">
        <div className="absolute -left-10 -bottom-10 opacity-20">
          <Heart className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 text-white md:w-2/3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm text-white mb-4 backdrop-blur-sm">
            <Globe2 className="h-4 w-4" /> Enthusiast Community
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">Discover the World of Agriculture, {profile?.full_name?.split(' ')[0] || 'Friend'}</h2>
          <p className="font-body text-orange-50 text-lg mb-6 max-w-xl">
            Dive into the journey of food from seed to table. Learn how you can support sustainable farming and become part of the agricultural revolution.
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <Link to="/resources">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-lg">
                Start Learning
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlightItems.map((item, idx) => (
          <Link to={item.to} key={idx}>
            <Card className="group h-full cursor-pointer overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex rounded-2xl p-4 ${item.color} transition-transform group-hover:rotate-12`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{item.level}</Badge>
                </div>
                <h3 className="font-display text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-slate-500">
                  {item.desc}
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold text-orange-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Learning Paths Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-border h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <BookOpen className="text-orange-600" /> Recommended Learning Paths
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Structured courses for different interests</p>
                </div>
                <Link to="/resources">
                  <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPaths.map((path, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-transparent p-5 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{path.title}</h4>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" /> {path.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Lightbulb className="h-4 w-4" /> {path.lessons} lessons
                        </div>
                        <Badge variant="outline" className={path.difficulty === 'Beginner' ? 'text-emerald-700 border-emerald-200' : 'text-amber-700 border-amber-200'}>{path.difficulty}</Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <p className="text-xs text-slate-600">Progress: {path.completed}/{path.lessons}</p>
                        <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400" style={{ width: `${(path.completed / path.lessons) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    {path.completed === 0 ? (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white shrink-0">Start</Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50 shrink-0">Continue</Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm border-border bg-gradient-to-b from-rose-50 to-orange-50">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-white p-6 shadow-md border border-orange-100">
                <Heart className="h-12 w-12 text-rose-500" />
              </div>
              <div>
                <h3 className="font-display text-lg text-slate-900 mb-2">Support Farmers</h3>
                <p className="font-body text-sm text-slate-600 mb-4">
                  Make a real impact by supporting local agricultural initiatives
                </p>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  Get Involved
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border bg-gradient-to-b from-amber-50 to-orange-50">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-white p-6 shadow-md border border-amber-100">
                <Badge className="h-12 w-12 text-amber-600 bg-amber-100" />
              </div>
              <div>
                <h3 className="font-display text-lg text-slate-900 mb-2">Earn Badges</h3>
                <p className="font-body text-sm text-slate-600 mb-4">
                  Unlock achievements as you learn and engage
                </p>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
                  View Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trending Stories */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Newspaper className="text-orange-600" /> Top Trending Stories
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">Inspiring stories from the agricultural community</p>
            </div>
            <Button variant="ghost" size="sm" className="text-orange-600">View More</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {[ 
            { title: "The rise of urban vertical farming in communities", category: "Innovation", read: "5 min read", img: "📊", views: 1230, likes: 89 },
            { title: "How supporting local farmers builds resilient economies", category: "Economy", read: "8 min read", img: "💰", views: 856, likes: 142 },
            { title: "Demystifying organic labels: What does it really mean?", category: "Consumer Guide", read: "4 min read", img: "🌿", views: 2145, likes: 208 }
          ].map((article, i) => (
            <div key={i} className="group flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer">
              <div className="hidden h-20 w-24 shrink-0 rounded-lg bg-orange-100 sm:flex items-center justify-center text-2xl text-orange-400 overflow-hidden relative group-hover:scale-110 transition-transform">
                {article.img}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">{article.category}</span>
                    <h4 className="font-display text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors mt-1">{article.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                      <span>{article.read}</span> • <span>👁 {article.views}</span> • <span>❤ {article.likes}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 mt-1 group-hover:text-orange-600 transition-all group-hover:translate-x-1 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <CalendarDays className="text-amber-600" /> Upcoming Events & Workshops
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">Connect with the agricultural community</p>
            </div>
            <Link to="/community">
              <Button variant="ghost" size="sm" className="text-orange-600">View All Events</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-transparent p-5 hover:border-amber-200 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-amber-100 text-amber-800">{event.type}</Badge>
                </div>
                <h4 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">{event.title}</h4>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-500" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-amber-500" /> {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-500" /> {event.attendees} attending
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 text-amber-600 border-amber-200 hover:bg-amber-50">Register</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm border-border bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-white p-5 shadow-md border border-blue-100">
              <Video className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h3 className="font-display text-lg text-slate-900 mb-2">Video Tutorials</h3>
              <p className="font-body text-sm text-slate-600 mb-4">Watch experts demonstrate techniques</p>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">Browse Videos</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-white p-5 shadow-md border border-green-100">
              <Download className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="font-display text-lg text-slate-900 mb-2">Downloadable Guides</h3>
              <p className="font-body text-sm text-slate-600 mb-4">Access resources offline anytime</p>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">Get Guides</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-white p-5 shadow-md border border-violet-100">
              <Share2 className="h-10 w-10 text-violet-600" />
            </div>
            <div>
              <h3 className="font-display text-lg text-slate-900 mb-2">Share & Discuss</h3>
              <p className="font-body text-sm text-slate-600 mb-4">Connect with other enthusiasts</p>
              <Button variant="outline" className="w-full border-violet-200 text-violet-600 hover:bg-violet-50">Go to Forum</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
