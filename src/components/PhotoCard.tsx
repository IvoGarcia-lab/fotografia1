import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PhotoCardProps {
  photo: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
  };
  onViewDetails: (id: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onViewDetails }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={photo.imageUrl} alt={photo.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="text-lg">{photo.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{photo.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{photo.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onViewDetails(photo.id)} size="sm">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhotoCard;