import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface PhotoDetails {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  camera: string;
  lens: string;
  settings: string;
}

const PhotoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<PhotoDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("photos")
        .select("*, image_url as imageUrl, photo_date as date")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching photo details:", error);
        setPhoto(null);
      } else {
        setPhoto(data);
      }
      setLoading(false);
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-10 w-28 mb-6" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
            <div className="md:w-1/3 space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="grid grid-cols-2 gap-2 text-sm pt-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!photo) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Fotografia não encontrada</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Galeria
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <h1 className="text-4xl font-bold text-center mb-8">{photo.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold">Detalhes</h2>
            <p className="text-muted-foreground">{photo.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="font-medium">Categoria:</p>
              <p>{photo.category}</p>
              <p className="font-medium">Data:</p>
              <p>{photo.date}</p>
              <p className="font-medium">Câmera:</p>
              <p>{photo.camera}</p>
              <p className="font-medium">Lente:</p>
              <p>{photo.lens}</p>
              <p className="font-medium">Configurações:</p>
              <p>{photo.settings}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoDetailPage;