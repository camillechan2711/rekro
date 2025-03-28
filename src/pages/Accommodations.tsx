import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import AccommodationCard from '@/components/AccommodationCard';
import Navbar from '@/components/Navbar';
import { mockAccommodations, universities, priceRanges, bedroomOptions, amenityOptions } from '@/data/mockData';
import { Search, Filter, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Accommodations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handlePriceChange = (value: number[]) => {
    setPriceFilter([value[0], value[1]]);
  };
  
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  const resetFilters = () => {
    setPriceFilter([0, 1000]);
    setBedroomFilter('');
    setLocationFilter('');
    setSelectedAmenities([]);
  };
  
  const handleViewAccommodation = (id: string) => {
    setSelectedAccommodation(id);
  };
  
  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your housing application has been submitted successfully.",
    });
    setSelectedAccommodation(null);
  };
  
  const filteredAccommodations = mockAccommodations.filter(accommodation => {
    const matchesSearch = accommodation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          accommodation.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = accommodation.price >= priceFilter[0] && accommodation.price <= priceFilter[1];
    const matchesBedrooms = bedroomFilter ? accommodation.bedrooms === parseInt(bedroomFilter) : true;
    const matchesLocation = locationFilter ? accommodation.address.includes(locationFilter) : true;
    const matchesAmenities = selectedAmenities.length > 0 
      ? selectedAmenities.every(amenity => accommodation.amenities.includes(amenity))
      : true;
    
    return matchesSearch && matchesPrice && matchesBedrooms && matchesLocation && matchesAmenities;
  });
  
  const selectedAccommodationData = mockAccommodations.find(acc => acc.id === selectedAccommodation);
  
  return (
    <div className="app-container">
      <main className="main-content p-4">
        <div className="mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold mb-2">Find Accommodation</h1>
          <p className="text-muted-foreground">Discover and apply for student housing</p>
        </div>
        
        <div className="mb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="filters">
              <AccordionTrigger className="py-2">
                <div className="flex items-center gap-2">
                  <Filter size={18} /> 
                  <span>Filters</span>
                  {(priceFilter[0] > 0 || priceFilter[1] < 1000 || bedroomFilter || locationFilter || selectedAmenities.length > 0) && (
                    <Badge variant="secondary" className="ml-2">Active</Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range: £{priceFilter[0]} - £{priceFilter[1]}</label>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={50}
                      value={[priceFilter[0], priceFilter[1]]}
                      onValueChange={handlePriceChange}
                      className="my-4"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                      <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          {bedroomOptions.map(option => (
                            <SelectItem key={option.id} value={option.value.toString()}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="Cambridge">Cambridge</SelectItem>
                          <SelectItem value="Oxford">Oxford</SelectItem>
                          <SelectItem value="London">London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities</label>
                    <div className="grid grid-cols-2 gap-2">
                      {amenityOptions.map(option => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`amenity-${option.id}`} 
                            checked={selectedAmenities.includes(option.value.toString())}
                            onCheckedChange={() => toggleAmenity(option.value.toString())}
                          />
                          <label htmlFor={`amenity-${option.id}`} className="text-sm">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={resetFilters}
                      className="text-sm flex items-center text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} className="mr-1" />
                      Reset filters
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="pb-4">
          {filteredAccommodations.length > 0 ? (
            filteredAccommodations.map(accommodation => (
              <div key={accommodation.id} className="animate-slideUp" style={{ animationDelay: '200ms' }}>
                <AccommodationCard 
                  accommodation={accommodation}
                  onClick={handleViewAccommodation}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground animate-fadeIn">
              <p>No accommodations match your search criteria.</p>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
      
      {selectedAccommodationData && (
        <Dialog open={!!selectedAccommodation} onOpenChange={(open) => !open && setSelectedAccommodation(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAccommodationData.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedAccommodationData.address}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="relative h-48 rounded-md overflow-hidden">
                <img 
                  src={selectedAccommodationData.images[0]} 
                  alt={selectedAccommodationData.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">£{selectedAccommodationData.price}<span className="text-sm font-normal text-muted-foreground">/month</span></h3>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{selectedAccommodationData.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{selectedAccommodationData.bathrooms} bath</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm">{selectedAccommodationData.description}</p>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAccommodationData.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-accent/50">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                >
                  Apply for Housing
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <Navbar />
    </div>
  );
};

export default Accommodations;
