import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
export default function Footer() {
    return (<footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6"/>
              <span className="font-display text-lg font-bold">AgriConnect</span>
            </div>
            <p className="font-body text-sm opacity-80">
              Inspiring society about farming and empowering farmers across all sectors.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Platform</h4>
            <nav className="flex flex-col gap-2 font-body text-sm opacity-80">
              <Link to="/resources" className="hover:opacity-100">Resources</Link>
              <Link to="/experts" className="hover:opacity-100">Experts</Link>
              <Link to="/community" className="hover:opacity-100">Community</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Company</h4>
            <nav className="flex flex-col gap-2 font-body text-sm opacity-80">
              <Link to="/about" className="hover:opacity-100">About Us</Link>
              <Link to="/" className="hover:opacity-100">Contact</Link>
              <Link to="/" className="hover:opacity-100">Privacy Policy</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Connect</h4>
            <nav className="flex flex-col gap-2 font-body text-sm opacity-80">
              <a href="#" className="hover:opacity-100">Twitter</a>
              <a href="#" className="hover:opacity-100">Facebook</a>
              <a href="#" className="hover:opacity-100">Instagram</a>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center font-body text-sm opacity-60">
          © 2026 AgriConnect. All rights reserved.
        </div>
      </div>
    </footer>);
}
