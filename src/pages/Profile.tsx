
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { currentUser, universities, degrees } from '@/data/mockData';
import { X, CheckCircle, Camera, PlusCircle, Edit } from 'lucide-react';

const Profile = () => {
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
        <div className="mb-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
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
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>
        
        <div className="mb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-background"
              />
              {editing && (
                <button className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!editing}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">University</label>
                <Select 
                  value={profile.university} 
                  onValueChange={(value) => setProfile({ ...profile, university: value })}
                  disabled={!editing}
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
                  disabled={!editing}
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
                disabled={!editing}
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
                disabled={!editing}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Interests</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/50 flex items-center gap-1">
                    {interest}
                    {editing && (
                      <button onClick={() => handleRemoveInterest(interest)}>
                        <X size={14} className="text-muted-foreground hover:text-destructive" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {editing && (
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
              )}
            </div>
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Profile;
