
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProfileCard from '@/components/ProfileCard';
import Navbar from '@/components/Navbar';
import { mockUsers, universities, degrees } from '@/data/mockData';
import { Search, Filter } from 'lucide-react';

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
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = universityFilter ? user.university === universityFilter : true;
    const matchesDegree = degreeFilter ? user.degree === degreeFilter : true;
    
    return matchesSearch && matchesUniversity && matchesDegree;
  });
  
  return (
    <div className="app-container">
      <main className="main-content p-4">
        <div className="mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold mb-2">Connect with Students</h1>
          <p className="text-muted-foreground">Find and connect with students who share your interests</p>
        </div>
        
        <div className="mb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
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
                <SelectItem value="all">All Universities</SelectItem>
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
                <SelectItem value="all">All Degrees</SelectItem>
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
              <div key={user.id} className="animate-slideUp" style={{ animationDelay: '200ms' }}>
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
      </main>
      <Navbar />
    </div>
  );
};

export default Connect;
