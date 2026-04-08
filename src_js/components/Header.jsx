import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Menu, X, LogOut, User } from 'lucide-react';
export default function Header() {
    const { user, signOut, role } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/resources', label: 'Resources' },
        { to: '/experts', label: 'Experts' },
        { to: '/community', label: 'Community' },
        { to: '/about', label: 'About' },
    ];
    return (<header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary"/>
          <span className="font-display text-xl font-bold text-foreground">AgriConnect</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (<Link key={l.to} to={l.to} className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </Link>))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (<>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4"/>
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4"/> Sign Out
              </Button>
            </>) : (<>
              <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
              <Link to="/signup"><Button size="sm">Get Started</Button></Link>
            </>)}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (<div className="border-t bg-background p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((l) => (<Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="font-body text-sm font-medium text-muted-foreground hover:text-primary">
                {l.label}
              </Link>))}
            <div className="mt-3 flex flex-col gap-2">
              {user ? (<>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}><Button variant="outline" className="w-full">Dashboard</Button></Link>
                  <Button variant="ghost" onClick={handleSignOut} className="w-full">Sign Out</Button>
                </>) : (<>
                  <Link to="/login" onClick={() => setMenuOpen(false)}><Button variant="ghost" className="w-full">Sign In</Button></Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}><Button className="w-full">Get Started</Button></Link>
                </>)}
            </div>
          </nav>
        </div>)}
    </header>);
}
