import { Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DoctorProps {
  id: string;
  name: string;
  specialization: string;
  description: string;
  consultationFee: number;
  experience: number;
  rating: number;
  totalReviews: number;
  image: string;
  location: string;
  city: string;
  procedures: string[];
  languages?: string[];
  availability?: string;
}

interface DoctorCardProps {
  doctor: DoctorProps;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{doctor.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
          <p className="text-primary text-sm font-medium">{doctor.specialization}</p>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {doctor.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-xs bg-muted px-2 py-1 rounded-full">
            ⭐ {doctor.rating} ({doctor.totalReviews})
          </div>
          <div className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
            ⏳ {doctor.experience} yrs
          </div>
          <div className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
            👤 {doctor.totalReviews} consults
          </div>
          <div className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
            📍 {doctor.city}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {doctor.procedures.slice(0, 3).map((procedure, index) => (
            <span 
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {procedure}
            </span>
          ))}
          {doctor.procedures.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{doctor.procedures.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">₹{doctor.consultationFee}</span>
            <span className="text-muted-foreground text-sm"> consultation</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/doctors/${doctor.id}`}>
                View Details
              </Link>
            </Button>
            <Button size="sm" className="btn-primary" asChild>
              <Link to={`/book?doctorId=${doctor.id}`}>
                Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}