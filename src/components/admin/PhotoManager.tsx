import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PhotoFormDialog } from "@/components/admin/PhotoFormDialog";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  photo_date: string;
  camera: string;
  lens: string;
  settings: string;
}

const PhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching photos:", error);
      toast.error("Falha ao carregar as fotos.");
    } else {
      setPhotos(data as Photo[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleAdd = () => {
    setSelectedPhoto(null);
    setIsFormOpen(true);
  };

  const handleEdit = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsFormOpen(true);
  };

  const handleDelete = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDeleteOpen(true);
  };

  const onFormSuccess = () => {
    setIsFormOpen(false);
    fetchPhotos();
  };

  const onDeleteConfirm = async () => {
    if (!selectedPhoto) return;

    // Primeiro, exclui a imagem do Storage se ela existir
    const filePath = selectedPhoto.image_url.split('/').pop();
    if (filePath) {
        const { error: storageError } = await supabase.storage.from('photos').remove([filePath]);
        if (storageError) {
            console.error("Error deleting image from storage:", storageError);
            toast.error("Erro ao remover a imagem antiga. A referência no banco de dados ainda será removida.");
        }
    }

    // Depois, exclui o registro do banco de dados
    const { error } = await supabase.from("photos").delete().eq("id", selectedPhoto.id);

    if (error) {
      toast.error("Falha ao excluir a foto.");
    } else {
      toast.success("Foto excluída com sucesso!");
      fetchPhotos();
    }
    setIsDeleteOpen(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Nova Foto
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {photos.map((photo) => (
              <TableRow key={photo.id}>
                <TableCell>
                  <img src={photo.image_url} alt={photo.title} className="h-16 w-16 object-cover rounded-md" />
                </TableCell>
                <TableCell className="font-medium">{photo.title}</TableCell>
                <TableCell>{photo.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(photo)}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(photo)} className="text-red-600">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PhotoFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        photo={selectedPhoto}
        onSuccess={onFormSuccess}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onConfirm={onDeleteConfirm}
      />
    </div>
  );
};

export default PhotoManager;