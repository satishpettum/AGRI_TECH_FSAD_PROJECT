import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sprout, BookOpen, GraduationCap, MessageSquare, CloudSun, Target, TrendingUp, Leaf, Droplets, Zap, BarChart3, ArrowRight, CheckCircle2, Circle, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCrops, addCrop, fetchTasks, addTask, toggleTask, fetchAlerts } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function FarmerDashboard({ profile, savedResourcesCount, communityPostCount }) {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  const [newCrop, setNewCrop] = useState({ name: '', progress: 0, stage: '', watering: '', health: '' });
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 1. Fetch Crops
  const { data: cropsData = [], isLoading: isCropsLoading } = useQuery({
    queryKey: ['crops'],
    queryFn: () => fetchCrops(session),
    enabled: !!session
  });

  const cropMutation = useMutation({
    mutationFn: (crop) => addCrop(session, crop.name, crop.progress, crop.stage, crop.watering, crop.health),
    onSuccess: () => {
      queryClient.invalidateQueries(['crops']);
      toast({ title: 'Crop Added', description: 'Your new crop is now being tracked.' });
      setIsAddCropOpen(false);
      setNewCrop({ name: '', progress: 0, stage: '', watering: '', health: '' });
    },
    onError: (err) => toast({ title: 'Error', description: err.message, variant: 'destructive' })
  });

  // 2. Fetch Tasks
  const { data: tasksData = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(session),
    enabled: !!session
  });

  const taskMutation = useMutation({
    mutationFn: (title) => addTask(session, title, false),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      toast({ title: 'Task Added', description: 'Task has been added to your list.' });
      setIsAddTaskOpen(false);
      setNewTaskTitle('');
    },
    onError: (err) => toast({ title: 'Error', description: err.message, variant: 'destructive' })
  });
  
  const toggleTaskMutation = useMutation({
    mutationFn: (id) => toggleTask(session, id),
    onSuccess: () => queryClient.invalidateQueries(['tasks'])
  });

  // 3. Fetch Alerts
  const { data: alertsData = [], isLoading: isAlertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => fetchAlerts(session),
    enabled: !!session
  });

  const handleAddCrop = (e) => {
    e.preventDefault();
    cropMutation.mutate(newCrop);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    taskMutation.mutate(newTaskTitle);
  };

  const quickActions = [
    { icon: BookOpen, title: 'Resources', desc: 'Saved guides & manuals', to: '/resources', color: 'bg-emerald-100 text-emerald-600' },
    { icon: GraduationCap, title: 'Experts', desc: 'Personalized advice', to: '/experts', color: 'bg-blue-100 text-blue-600' },
    { icon: MessageSquare, title: 'Community', desc: 'Ask fellow farmers', to: '/community', color: 'bg-indigo-100 text-indigo-600' },
    { icon: TrendingUp, title: 'Trends', desc: 'Current crop prices', to: '/resources', color: 'bg-primary/10 text-primary' },
  ];

  const soilMetrics = [
    { label: 'Soil pH', value: '6.8', status: 'Optimal', icon: Leaf, color: 'text-emerald-500' },
    { label: 'Moisture', value: '45%', status: 'Low', icon: Droplets, color: 'text-amber-500' },
    { label: 'Temp.', value: '24°C', status: 'Ideal', icon: Zap, color: 'text-blue-500' },
  ];

  // Helper function to colorize alert badges
  const getAlertColor = (type) => {
     if(type === 'warning') return 'bg-amber-100 text-amber-700 border-amber-200';
     if(type === 'info') return 'bg-blue-100 text-blue-700 border-blue-200';
     return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* SaaS Style Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4 border-b border-slate-200 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
             <Sprout className="h-3.5 w-3.5" /> Farmer Portal
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {profile?.fullName?.split(' ')[0] || 'Farmer'}
          </h2>
          <p className="text-slate-500 mt-1 max-w-xl">
            Here's what is happening with your crops and community today.
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
             <DialogTrigger asChild>
                <Button variant="outline" className="h-10 bg-white border-slate-200 text-slate-700">+ Add Task</Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Add a New Task</DialogTitle></DialogHeader>
                <form onSubmit={handleAddTask} className="space-y-4">
                   <div className="space-y-2">
                      <Label>Task Title</Label>
                      <Input required value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="e.g. Inspect irrigation system" />
                   </div>
                   <Button type="submit" className="w-full" disabled={taskMutation.isPending}>{taskMutation.isPending ? 'Adding...' : 'Save Task'}</Button>
                </form>
             </DialogContent>
          </Dialog>
          
          <Dialog open={isAddCropOpen} onOpenChange={setIsAddCropOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 bg-primary hover:bg-primary/90 text-white shadow-sm">+ Add Crop</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add a New Crop</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCrop} className="space-y-4">
                <div className="space-y-2">
                  <Label>Crop Name</Label>
                  <Input required value={newCrop.name} onChange={e => setNewCrop({...newCrop, name: e.target.value})} placeholder="e.g. Wheat, Rice" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Progress (%)</Label>
                    <Input type="number" min="0" max="100" required value={newCrop.progress} onChange={e => setNewCrop({...newCrop, progress: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Stage</Label>
                    <Input required value={newCrop.stage} onChange={e => setNewCrop({...newCrop, stage: e.target.value})} placeholder="e.g. Maturity" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Watering In</Label>
                    <Input required value={newCrop.watering} onChange={e => setNewCrop({...newCrop, watering: e.target.value})} placeholder="e.g. 2 days" />
                  </div>
                  <div className="space-y-2">
                    <Label>Health</Label>
                    <Input required value={newCrop.health} onChange={e => setNewCrop({...newCrop, health: e.target.value})} placeholder="e.g. Good" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={cropMutation.isPending}>
                  {cropMutation.isPending ? 'Adding...' : 'Save Crop'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Saved Resources', val: savedResourcesCount || 0, icon: BookOpen, col: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Expert Interactions', val: Math.max(2, Math.round((savedResourcesCount || 0) / 3)), icon: GraduationCap, col: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Community Posts', val: communityPostCount || 0, icon: MessageSquare, col: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm border rounded-xl overflow-hidden bg-white">
            <CardContent className="p-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.col}`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">{stat.val}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section: Main Content Split */}
      <div className="grid gap-6 md:grid-cols-3 mt-4">
        
        {/* Left Column: Crop Tracker & Alerts */}
        <div className="md:col-span-2 space-y-6">
           <Card className="shadow-sm border-slate-200 rounded-xl bg-white overflow-hidden">
             <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
               <div className="flex items-center justify-between">
                 <div>
                   <CardTitle className="text-lg flex items-center gap-2">
                     <BarChart3 className="h-5 w-5 text-slate-700" /> Active Crops
                   </CardTitle>
                   <CardDescription className="mt-1">Real-time status of your planted crops.</CardDescription>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-0">
               {isCropsLoading ? (
                 <div className="p-8 text-center text-slate-500">Loading your crops...</div>
               ) : cropsData.length === 0 ? (
                 <div className="p-8 text-center text-slate-500">No crops being tracked yet. Add one above!</div>
               ) : (
                 <div className="divide-y divide-slate-100">
                   {cropsData.map((crop, idx) => (
                     <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/50 transition-colors">
                       <div className="flex-1 mb-4 sm:mb-0">
                         <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-slate-900">{crop.name}</h4>
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                               {crop.stage}
                            </span>
                         </div>
                         
                         <div className="flex items-center gap-4 mt-3 max-w-sm">
                           <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                             <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${crop.progress}%` }}></div>
                           </div>
                           <span className="text-sm font-semibold text-slate-700">{crop.progress}%</span>
                         </div>
                       </div>
                       <div className="flex gap-6 text-right sm:text-left">
                          <div>
                             <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Watering</p>
                             <p className="text-sm font-medium text-slate-700">{crop.watering}</p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Health</p>
                             <p className="text-sm font-medium text-emerald-600">{crop.health}</p>
                          </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </CardContent>
           </Card>
           
           <div className="grid gap-6 md:grid-cols-2">
             {/* Tasks Card */}
             <Card className="shadow-sm border-slate-200 rounded-xl bg-white overflow-hidden">
                <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-base text-slate-800 flex items-center gap-2"><Target className="h-4 w-4" /> Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   {isTasksLoading ? (
                      <div className="p-6 text-center text-slate-500 text-sm">Loading tasks...</div>
                   ) : tasksData.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-sm">You're all caught up!</div>
                   ) : (
                      <div className="divide-y divide-slate-100">
                         {tasksData.map((task) => (
                            <div key={task.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleTaskMutation.mutate(task.id)}>
                               <div className="mt-0.5">
                                 {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-300" />}
                               </div>
                               <p className={`text-sm font-medium ${task.completed ? 'opacity-50 line-through text-slate-500' : 'text-slate-800'}`}>
                                 {task.title}
                               </p>
                            </div>
                         ))}
                      </div>
                   )}
                </CardContent>
             </Card>

             {/* Alerts Card */}
             <Card className="shadow-sm border-slate-200 rounded-xl bg-white overflow-hidden">
                <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-base text-slate-800 flex items-center gap-2"><Bell className="h-4 w-4" /> System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   {isAlertsLoading ? (
                      <div className="p-6 text-center text-slate-500 text-sm">Loading alerts...</div>
                   ) : alertsData.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-sm">No new alerts at this time.</div>
                   ) : (
                      <div className="divide-y divide-slate-100">
                         {alertsData.map((alert) => (
                            <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors">
                               <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getAlertColor(alert.type)}`}>{alert.type}</span>
                                  <span className="text-sm font-semibold text-slate-800">{alert.title}</span>
                               </div>
                               <p className="text-xs text-slate-500 ml-1">{alert.description}</p>
                            </div>
                         ))}
                      </div>
                   )}
                </CardContent>
             </Card>
           </div>
        </div>

        {/* Right Column: Conditions & Weather */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200 rounded-xl bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-slate-700" /> Current Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold tracking-tight text-slate-900">24°C</p>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Partly Cloudy</p>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 text-amber-500">
                      <CloudSun className="h-8 w-8" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-700">10% Rain</span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-200/50 text-slate-700">12km/h Wind</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Field Sensors</p>
                {soilMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-400">{metric.status}</span>
                        <p className="text-sm font-bold text-slate-900">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Miniature */}
          <Card className="shadow-sm border-slate-200 rounded-xl bg-white overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-base text-slate-800">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 border-x border-b border-slate-100">
                  {quickActions.map((act, i) => (
                    <Link to={act.to} key={i} className="p-4 flex flex-col items-center text-center hover:bg-slate-50 transition-colors group">
                        <div className={`p-2 rounded-lg ${act.color} mb-3 group-hover:scale-110 transition-transform`}>
                           <act.icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{act.title}</span>
                    </Link>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
