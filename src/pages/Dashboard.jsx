import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sprout } from 'lucide-react';

import FarmerDashboard from '@/components/dashboards/FarmerDashboard';
import ExpertDashboard from '@/components/dashboards/ExpertDashboard';
import PublicDashboard from '@/components/dashboards/PublicDashboard';

export default function Dashboard() {
  const { user, loading, role, profile } = useAuth();
  const [savedResourcesCount, setSavedResourcesCount] = useState(0);
  const [communityPostCount, setCommunityPostCount] = useState(0);

  useEffect(() => {
    const savedResources = localStorage.getItem('agriSavedResources');
    const communityPosts = localStorage.getItem('communityPosts');

    try {
      setSavedResourcesCount(savedResources ? JSON.parse(savedResources).length : 0);
    } catch (error) {
      setSavedResourcesCount(0);
    }

    try {
      setCommunityPostCount(communityPosts ? JSON.parse(communityPosts).length : 0);
    } catch (error) {
      setCommunityPostCount(0);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Sprout className="h-8 w-8 animate-pulse text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
      case 'admin': // Giving admin farmer powers for now
        return (
          <FarmerDashboard 
            profile={profile} 
            savedResourcesCount={savedResourcesCount} 
            communityPostCount={communityPostCount} 
          />
        );
      case 'expert':
        return (
          <ExpertDashboard 
            profile={profile} 
          />
        );
      case 'public':
        return (
          <PublicDashboard 
            profile={profile} 
          />
        );
      default:
        // Fallback for missing/undefined roles
        return (
          <PublicDashboard 
            profile={profile} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          {renderDashboard()}
        </div>
      </main>
      <Footer />
    </div>
  );
}