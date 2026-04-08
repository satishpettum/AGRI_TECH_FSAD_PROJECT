import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-hover border-slate-200 animate-scale-in bg-white rounded-2xl overflow-hidden">
        <CardHeader className="text-center pt-8 pb-6 bg-white border-b border-slate-100">
          <Link to="/" className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</CardTitle>
          <CardDescription className="text-slate-500 mt-2">Sign in to your AgriConnect account</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="hello@example.com"
                className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                 <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                 {/* Placeholder for forgot password */}
                 <Link to="#" className="text-sm text-primary hover:text-primary/80 font-medium">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
              />
            </div>
            <Button type="submit" className="w-full h-11 text-white font-medium shadow-sm transition-all" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}