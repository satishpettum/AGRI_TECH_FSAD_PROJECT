import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Sprout, GraduationCap, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const roles = [
    { value: 'farmer', label: 'Farmer', icon: Sprout, desc: 'Access resources & connect with sectors' },
    { value: 'expert', label: 'Agricultural Expert', icon: GraduationCap, desc: 'Share knowledge & guide farmers' },
    { value: 'public', label: 'Public / Enthusiast', icon: Eye, desc: 'Explore & learn about farming' },
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
        }
        catch (err) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="flex min-h-screen items-center justify-center bg-section-warm p-4">
      <Card className="w-full max-w-md shadow-warm animate-scale-in">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary"/>
            <span className="font-display text-2xl font-bold">AgriConnect</span>
          </Link>
          <CardTitle className="font-display text-2xl">Create Account</CardTitle>
          <CardDescription className="font-body">Join the farming revolution</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body">Full Name</Label>
              <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="farmer@example.com"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters"/>
            </div>
            <div className="space-y-2">
              <Label className="font-body">I am a...</Label>
              <Select value={role} onValueChange={(v) => setRole(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (<SelectItem key={r.value} value={r.value}>
                      <div className="flex items-center gap-2">
                        <r.icon className="h-4 w-4"/>
                        <span>{r.label}</span>
                      </div>
                    </SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full font-body font-semibold" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>);
}
