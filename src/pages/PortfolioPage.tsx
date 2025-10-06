import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Gallery from "@/components/Gallery";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

// Definindo a interface para o tipo de foto
interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("photos")
        .select("id, title, description, image_url, category")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching photos:", error);
      } else {
        // Mapeando para a estrutura esperada pelo componente Gallery
        const formattedPhotos = data.map(photo => ({
          ...photo,
          imageUrl: photo.image_url,
        }));
        setPhotos(formattedPhotos);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(photos.map((photo) => photo.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "all") {
      return photos;
    }
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory, photos]);

  const handleViewDetails = (id: string) => {
    navigate(`/photo/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mb-8">Minha Galeria de Fotografias</h1>
      <div className="flex justify-center mb-8">
        <Select onValueChange={setSelectedCategory} defaultValue="all" disabled={loading}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {categories.filter(cat => cat !== "all").map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[192px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Gallery photos={filteredPhotos} onViewDetails={handleViewDetails} />
      )}
    </Layout>
  );
};

export default PortfolioPage;