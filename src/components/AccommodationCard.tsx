
import React from 'react';
import { Accommodation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onClick?: (id: string) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ 
  accommodation,
  onClick
}) => {
  const { id, title, address, price, bedrooms, bathrooms, amenities, images, maxRoommates, currentTeamSize } = accommodation;
  
  return (
    <Card 
      className="overflow-hidden mb-4 cursor-pointer hover:shadow-md transition-shadow animate-fadeIn"
      onClick={() => onClick?.(id)}
    >
      <div className="relative h-48">
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-accent1-500 hover:bg-accent1-500">
            £{price}/mo
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-white/80">{address}</p>
        </div>
      </div>
      
      <CardContent className="py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Bed size={16} className="text-muted-foreground" />
              <span className="text-sm">{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} className="text-muted-foreground" />
              <span className="text-sm">{bathrooms}</span>
            </div>
          </div>
          
          <div className={cn(
            "flex items-center gap-1",
            currentTeamSize >= maxRoommates ? "text-destructive" : "text-brand-500"
          )}>
            <Users size={16} />
            <span className="text-sm">{currentTeamSize}/{maxRoommates}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="bg-accent/50">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="bg-accent/50">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-end">
          <button className="flex items-center text-sm text-brand-500 font-medium">
            View details <ChevronRight size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
