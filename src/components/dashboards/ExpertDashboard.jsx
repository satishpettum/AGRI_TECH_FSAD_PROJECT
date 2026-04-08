import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, FileText, MessageSquare, BrainCircuit, CheckCircle, ArrowUpRight, Zap, TrendingUp, Eye, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExpertDashboard({ profile }) {
  const expertStats = [
    { label: 'Farmers Helped', value: '142', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '+12 this month' },
    { label: 'Articles Published', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+2 this month' },
    { label: 'Active Queries', value: '5', icon: MessageSquare, color: 'text-violet-600', bg: 'bg-violet-100', trend: '2 unanswered' },
  ];

  const recentQueries = [
    { title: "Best organic pesticide for tomato blight?", farmer: "David K.", time: "2 hours ago", category: "Pest Control", priority: 'high' },
    { title: "Irrigation frequency during heat waves?", farmer: "Sarah M.", time: "5 hours ago", category: "Water Management", priority: 'medium' },
    { title: "Soil PH adjustment for blueberries?", farmer: "John D.", time: "1 day ago", category: "Soil", priority: 'low' }
  ];

  const articles = [
    { title: "Advanced Drip Irrigation Guide", views: 1200, rating: 4.9, published: "3 days ago", comments: 24 },
    { title: "Organic Pest Management Strategies", views: 890, rating: 4.7, published: "1 week ago", comments: 15 },
    { title: "Crop Rotation for Soil Health", views: 650, rating: 4.8, published: "2 weeks ago", comments: 12 },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-8 shadow-xl">
        <div className="absolute -right-10 -top-10 opacity-10">
          <BrainCircuit className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/30 border border-indigo-400/50 px-4 py-2 text-sm text-indigo-100 mb-4 backdrop-blur-sm">
              <GraduationCap className="h-4 w-4" /> Verified Expert
            </div>
            <h2 className="font-display text-4xl font-bold mb-3">Welcome Dr. {profile?.full_name?.split(' ').pop() || 'Expert'}</h2>
            <p className="font-body text-indigo-100/80 max-w-2xl text-lg">
              Your expertise is shaping the future of agriculture. You have <span className="font-semibold text-indigo-200">5 new queries</span> waiting for your guidance.
            </p>
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <Button className="bg-white text-indigo-950 hover:bg-slate-100 font-semibold shadow-lg">
              Answer Queries
            </Button>
            <Link to="/resources">
              <Button variant="outline" className="border-indigo-400/50 bg-indigo-500/20 text-white hover:bg-indigo-500/30 font-semibold">
                Write Article
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-6 md:grid-cols-3">
        {expertStats.map((stat, idx) => (
          <Card key={idx} className="border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-gradient-to-br">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-full ${stat.bg} p-4 shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <p className="font-body text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="font-display text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Queries - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-border h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="font-display text-xl text-slate-800">Recent Farmer Queries</CardTitle>
                <p className="text-xs text-slate-500 mt-1">Tap to respond</p>
              </div>
              <Link to="/community">
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {recentQueries.map((q, i) => (
                <div key={i} className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-transparent p-4 transition-all hover:bg-slate-50 hover:border-indigo-200 cursor-pointer hover:shadow-sm">
                  <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-white ${
                    q.priority === 'high' ? 'bg-red-500' : q.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                  }`}>
                    {q.farmer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{q.title}</h4>
                        <p className="mt-1 text-sm text-slate-500">From <span className="font-medium">{q.farmer}</span> • {q.time}</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-blue-100 text-blue-700 shrink-0">{q.category}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600 shrink-0 mt-1" />
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t border-slate-100">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">+ Add Response Template</Button>
            </div>
          </Card>
        </div>

        {/* Quick Stats Sidebar */}
        <Card className="shadow-sm border-border bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="font-display text-lg text-indigo-900">This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">Engagement Rate</p>
                <p className="text-lg font-bold text-indigo-600">87%</p>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-[87%] bg-gradient-to-r from-indigo-500 to-blue-500"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">Response Time</p>
                <p className="text-lg font-bold text-blue-600">2.3h</p>
              </div>
              <p className="text-xs text-slate-500">Average response time</p>
            </div>

            <div className="pt-4 border-t border-blue-100">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-3">Recent Badges</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-slate-700">Top Expert (Nov)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-slate-700">Fast Responder</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles Section */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl text-slate-900 flex items-center gap-2">
                <FileText className="text-indigo-600" /> Your Published Articles
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">Manage and track your educational content</p>
            </div>
            <Link to="/resources">
              <Button className="bg-indigo-600 hover:bg-indigo-700">+ Publish New</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {articles.map((article, idx) => (
              <div key={idx} className="flex items-start justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="flex gap-4 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{article.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {article.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {article.rating} ({article.comments} comments)
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="h-4 w-4" /> {article.published}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-600">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-border bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <BrainCircuit className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="font-display text-lg text-slate-900 mb-2">Share Your Expertise</h3>
            <p className="text-sm text-slate-600 mb-6">Create comprehensive guides and tutorials for farmers</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">Start Writing</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="font-display text-lg text-slate-900 mb-2">Build Your Network</h3>
            <p className="text-sm text-slate-600 mb-6">Connect with farmers and other agricultural experts</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">View Networks</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
