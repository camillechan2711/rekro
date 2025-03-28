import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCard from '@/components/ProfileCard';
import Navbar from '@/components/Navbar';
import { mockUsers, universities, degrees, currentUser } from '@/data/mockData';
import { Search, Filter, UserPlus, Users, School, GraduationCap } from 'lucide-react';

const Connect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [universityFilter, setUniversityFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  const { toast } = useToast();
  
  const handleConnect = (userId: string) => {
    toast({
      title: "Connection Request Sent",
      description: "You've sent a connection request to this student.",
    });
  };
  
  const getBestMatches = () => {
    const exactMatches = mockUsers.filter(user => 
      user.id !== currentUser.id && 
      user.university === currentUser.university && 
      user.degree === currentUser.degree
    ).slice(0, 5);
    
    const universityMatches = mockUsers.filter(user => 
      user.id !== currentUser.id && 
      user.university === currentUser.university && 
      user.degree !== currentUser.degree
    ).slice(0, 5);
    
    const degreeMatches = mockUsers.filter(user => 
      user.id !== currentUser.id && 
      user.university !== currentUser.university && 
      user.degree === currentUser.degree
    ).slice(0, 5);
    
    return { exactMatches, universityMatches, degreeMatches };
  };
  
  const { exactMatches, universityMatches, degreeMatches } = getBestMatches();
  
  const filteredUsers = mockUsers.filter(user => {
    if (user.id === currentUser.id) return false;
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = universityFilter ? user.university === universityFilter : true;
    const matchesDegree = degreeFilter ? user.degree === degreeFilter : true;
    
    return matchesSearch && matchesUniversity && matchesDegree;
  });
  
  return (
    <div className="app-container">
      <main className="main-content p-4 pb-16">
        <div className="mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold mb-2">Connect with Students</h1>
          <p className="text-muted-foreground">Find and connect with students who share your interests</p>
        </div>
        
        <Tabs defaultValue="recommended" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>Recommended</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search size={16} />
              <span>Search</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="mt-4 space-y-6">
            {exactMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  <h3 className="font-semibold">Your Ideal Matches</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Students from {currentUser.university} studying {currentUser.degree}</p>
                <div className="space-y-4">
                  {exactMatches.map((user) => (
                    <div key={user.id} className="animate-slideUp">
                      <ProfileCard 
                        user={user} 
                        showActions 
                        onConnect={handleConnect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {universityMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <School size={18} className="text-primary" />
                  <h3 className="font-semibold">From Your University</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Other students at {currentUser.university}</p>
                <div className="space-y-4">
                  {universityMatches.map((user) => (
                    <div key={user.id} className="animate-slideUp">
                      <ProfileCard 
                        user={user} 
                        showActions 
                        onConnect={handleConnect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {degreeMatches.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-primary" />
                  <h3 className="font-semibold">Studying {currentUser.degree}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Students studying {currentUser.degree} at other universities</p>
                <div className="space-y-4">
                  {degreeMatches.map((user) => (
                    <div key={user.id} className="animate-slideUp">
                      <ProfileCard 
                        user={user} 
                        showActions 
                        onConnect={handleConnect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {exactMatches.length === 0 && universityMatches.length === 0 && degreeMatches.length === 0 && (
              <div className="text-center py-8 text-muted-foreground animate-fadeIn">
                <p>No personalized matches found.</p>
                <p>Try using the search tab to find students.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="search" className="mt-4">
            <div className="animate-slideUp mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search by name or interests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center mb-2">
                <Filter size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Select value={universityFilter} onValueChange={setUniversityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="University" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Universities</SelectItem>
                    {universities.map(uni => (
                      <SelectItem key={uni.id} value={uni.name}>{uni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Degrees</SelectItem>
                    {degrees.map(deg => (
                      <SelectItem key={deg.id} value={deg.name}>{deg.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pb-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="animate-slideUp mb-4">
                    <ProfileCard 
                      user={user} 
                      showActions
                      onConnect={handleConnect}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground animate-fadeIn">
                  <p>No students match your search criteria.</p>
                  <p>Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Navbar />
    </div>
  );
};

export default Connect;
