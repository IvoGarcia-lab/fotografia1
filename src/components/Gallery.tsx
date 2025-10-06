import React from "react";
import PhotoCard from "./PhotoCard";

interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface GalleryProps {
  photos: Photo[];
  onViewDetails: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default Gallery;