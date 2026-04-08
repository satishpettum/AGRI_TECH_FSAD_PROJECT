import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Sprout, GraduationCap, Eye, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roles = [
  { value: 'farmer', label: 'Farmer', icon: Sprout, desc: 'Access resources & connect with experts', color: 'from-emerald-600 to-green-600', lightBg: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { value: 'expert', label: 'Agricultural Expert', icon: GraduationCap, desc: 'Share knowledge & guide farmers', color: 'from-indigo-600 to-blue-600', lightBg: 'bg-indigo-50', textColor: 'text-indigo-700' },
  { value: 'public', label: 'Public / Enthusiast', icon: Eye, desc: 'Explore & learn about farming', color: 'from-amber-600 to-orange-600', lightBg: 'bg-amber-50', textColor: 'text-amber-700' }
];


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
      toast({ title: 'Success!', description: 'Account created. Welcome to AgriConnect!' });
      navigate('/dashboard');
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-2xl space-y-6 animate-scale-in">
        {/* Header Card */}
        <div className="text-center pb-2 pt-6">
          <Link to="/" className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Join AgriConnect</h1>
          <p className="text-slate-500 mt-2">Choose your role and create an account</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`cursor-pointer transition-all duration-200 rounded-2xl border-2 p-5 flex flex-col items-center text-center gap-3 relative overflow-hidden ${
                role === r.value
                  ? `border-primary bg-primary/5 shadow-md shadow-primary/10`
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className={`rounded-xl p-3 ${role === r.value ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                <r.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`font-semibold ${role === r.value ? 'text-primary' : 'text-slate-900'}`}>
                  {r.label}
                </h3>
                <p className="text-xs mt-1 text-slate-500">
                  {r.desc}
                </p>
              </div>
              {role === r.value && (
                <div className="absolute top-3 right-3 text-primary">
                   <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="shadow-hover border-slate-200 bg-white rounded-2xl overflow-hidden mt-4">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                <Input 
                  id="name" 
                  required 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="John Doe"
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="john@example.com"
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Minimum 6 characters"
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-white font-medium shadow-sm transition-all mt-6" 
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}