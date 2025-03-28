
import React from 'react';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, GraduationCap, Heart } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  showActions?: boolean;
  onConnect?: (userId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  user, 
  showActions = false,
  onConnect 
}) => {
  return (
    <Card className="overflow-hidden mb-4 animate-fadeIn">
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-brand-600 to-accent1-500"></div>
        <div className="absolute -bottom-10 left-4 border-4 border-background rounded-full">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      </div>
      
      <CardContent className="pt-12 pb-4">
        <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Building size={16} className="mr-1" />
          <span>{user.university}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <GraduationCap size={16} className="mr-1" />
          <span>{user.degree}, Year {user.year}</span>
        </div>
        
        <p className="text-sm mb-4">{user.bio}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-accent/50">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        {showActions && (
          <div className="flex justify-end">
            <button
              onClick={() => onConnect?.(user.id)}
              className="flex items-center gap-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-colors"
            >
              <Heart size={16} /> Connect
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
