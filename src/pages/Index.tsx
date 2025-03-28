
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Building, User, Edit, CheckCircle, Camera, PlusCircle, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { currentUser, universities, degrees } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  // Profile state
  const [profile, setProfile] = useState({ ...currentUser });
  const [newInterest, setNewInterest] = useState('');
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setEditing(false);
  };
  
  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interest)
    });
  };

  return (
    <div className="app-container">
      <main className="main-content p-4">
        <div className="mb-8 animate-fadeIn">
          <h1 className="font-bold gradient-heading mb-2 text-[183728] text-[#183829]">reKro</h1>
          <p className="text-muted-foreground">Connect with students & find your perfect accommodation</p>
        </div>
        
        {/* Profile Section */}
        <div className="mb-8 animate-slideUp" style={{ animationDelay: '100ms' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Profile</h2>
            {!editing ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setEditing(true)}
                className="flex items-center gap-1"
              >
                <Edit size={16} /> Edit
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={handleSaveProfile}
                className="flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white"
              >
                <CheckCircle size={16} /> Save
              </Button>
            )}
          </div>

          <div className="p-4 bg-accent rounded-xl mb-4">
            <div className="flex items-center">
              <div className="relative mr-4">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-background"
                />
                {editing && (
                  <button className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full">
                    <Camera size={12} />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {profile.university} • {profile.degree}, Year {profile.year}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mt-4 mb-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{
                width: '75%'
              }}></div>
            </div>
            <p className="text-xs text-right text-muted-foreground">Profile 75% complete</p>
          </div>

          {editing && (
            <div className="space-y-4 mb-6 animate-slideUp">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">University</label>
                  <Select 
                    value={profile.university} 
                    onValueChange={(value) => setProfile({ ...profile, university: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map(uni => (
                        <SelectItem key={uni.id} value={uni.name}>{uni.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Degree</label>
                  <Select 
                    value={profile.degree} 
                    onValueChange={(value) => setProfile({ ...profile, degree: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {degrees.map(deg => (
                        <SelectItem key={deg.id} value={deg.name}>{deg.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Year of Study</label>
                <Select 
                  value={profile.year.toString()} 
                  onValueChange={(value) => setProfile({ ...profile, year: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                    <SelectItem value="5">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="min-h-24"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Interests</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-accent/50 flex items-center gap-1">
                      {interest}
                      <button onClick={() => handleRemoveInterest(interest)}>
                        <X size={14} className="text-muted-foreground hover:text-destructive" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddInterest}
                    size="icon"
                    className="bg-brand-500 hover:bg-brand-600 text-white"
                  >
                    <PlusCircle size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}
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
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Index;
