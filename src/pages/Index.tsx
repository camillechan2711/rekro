import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Building, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { currentUser } from '@/data/mockData';
const Index = () => {
  return <div className="app-container">
      <main className="main-content p-4">
        <div className="mb-8 animate-fadeIn">
          <h1 className="font-bold gradient-heading mb-2 text-[183728] text-[#183829]">reKro</h1>
          <p className="text-muted-foreground">Connect with students & find your perfect accommodation</p>
        </div>
        
        <div className="mb-8 animate-slideUp" style={{
        animationDelay: '100ms'
      }}>
          <div className="p-4 bg-accent rounded-xl mb-4">
            <h2 className="text-lg font-semibold mb-2">Welcome back, {currentUser.name}!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Complete your profile to improve your matches and find the perfect accommodation.
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{
              width: '75%'
            }}></div>
            </div>
            <p className="text-xs text-right text-muted-foreground">Profile 75% complete</p>
          </div>
        </div>
        
        <div className="grid gap-4 animate-slideUp" style={{
        animationDelay: '200ms'
      }}>
          <Link to="/connect">
            <div className="p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl flex items-center">
              <div className="mr-4 p-3 bg-white/20 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Connect with Students</h3>
                <p className="text-sm text-white/80">Find students with similar interests and degrees</p>
              </div>
            </div>
          </Link>
          
          <Link to="/accommodations">
            <div className="p-4 bg-gradient-to-r from-accent1-500 to-accent1-600 text-white rounded-xl flex items-center">
              <div className="mr-4 p-3 bg-white/20 rounded-lg">
                <Building size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Find Accommodation</h3>
                <p className="text-sm text-white/80">Discover and apply for student housing with roommates</p>
              </div>
            </div>
          </Link>
          
          <Link to="/profile">
            <div className="p-4 bg-gradient-to-r from-brand-600 to-accent1-500 text-white rounded-xl flex items-center">
              <div className="mr-4 p-3 bg-white/20 rounded-lg">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">My Profile</h3>
                <p className="text-sm text-white/80">Complete your profile and manage preferences</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
      <Navbar />
    </div>;
};
export default Index;