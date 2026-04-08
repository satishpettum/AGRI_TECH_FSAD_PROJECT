import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Camera } from 'lucide-react';

export default function Profile() {
  const { user, loading, profile, updateProfile, role } = useAuth();
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile(fullName, bio, location);
      toast({ title: 'Profile Updated', description: 'Your profile has been saved successfully.' });
    } catch (error) {
      toast({ title: 'Profile Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const initial = fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-10 animate-fade-in">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h1>
            <p className="text-slate-500 mt-1">Manage your profile information and account preferences.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
             
            {/* Left Column: Avatar & Basic Info */}
            <div className="md:col-span-1 space-y-6">
               <Card className="border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                     <div className="relative group cursor-pointer mb-4">
                        <Avatar className="h-28 w-28 border-4 border-white shadow-sm ring-1 ring-slate-100">
                           <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">{initial}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Camera className="h-6 w-6 text-white" />
                        </div>
                     </div>
                     <h3 className="text-lg font-bold text-slate-900">{fullName || 'Your Name'}</h3>
                     <p className="text-sm text-slate-500 mb-2">{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}</p>
                     <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active Status
                     </div>
                  </CardContent>
               </Card>
               
               <Card className="border-slate-200 shadow-sm bg-white rounded-2xl">
                  <CardHeader className="pb-4">
                     <CardTitle className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{user.email}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{location || 'No location set'}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="truncate">Member since {new Date().getFullYear()}</span>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Right Column: Edit Form */}
            <div className="md:col-span-2">
               <Card className="border-slate-200 shadow-sm bg-white rounded-2xl h-full">
               <CardHeader className="border-b border-slate-100 pb-5">
                  <CardTitle className="text-xl font-bold text-slate-900">Personal Information</CardTitle>
                  <CardDescription className="text-slate-500">Update your details to keep your community profile current.</CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                  <form className="space-y-6" onSubmit={handleSave}>
                     <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</Label>
                        <Input 
                           id="fullName" 
                           value={fullName} 
                           onChange={(e) => setFullName(e.target.value)} 
                           required 
                           className="h-11 border-slate-200 focus:ring-primary/20 shadow-sm"
                        />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location" className="text-sm font-medium text-slate-700">Location</Label>
                        <Input 
                           id="location" 
                           value={location} 
                           onChange={(e) => setLocation(e.target.value)} 
                           placeholder="City, Country"
                           className="h-11 border-slate-200 focus:ring-primary/20 shadow-sm"
                        />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio" className="text-sm font-medium text-slate-700">Bio</Label>
                        <Textarea 
                           id="bio" 
                           value={bio} 
                           onChange={(e) => setBio(e.target.value)} 
                           rows={5} 
                           placeholder="Write a short description about your farming experience..."
                           className="resize-none border-slate-200 focus:ring-primary/20 shadow-sm p-3"
                        />
                        </div>
                     </div>
                     <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                        <Button type="button" variant="outline" className="border-slate-200">Cancel</Button>
                        <Button type="submit" className="min-w-[120px] shadow-sm" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                     </div>
                  </form>
               </CardContent>
               </Card>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
