import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Photo } from "@/components/admin/PhotoManager";
import { toast } from "sonner";

interface PhotoFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  photo: Photo | null;
  onSuccess: () => void;
}

export const PhotoFormDialog = ({ isOpen, setIsOpen, photo, onSuccess }: PhotoFormDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo_date: "",
    camera: "",
    lens: "",
    settings: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (photo) {
      setFormData({
        title: photo.title || "",
        description: photo.description || "",
        category: photo.category || "",
        photo_date: photo.photo_date || "",
        camera: photo.camera || "",
        lens: photo.lens || "",
        settings: photo.settings || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        photo_date: "",
        camera: "",
        lens: "",
        settings: "",
      });
    }
    setImageFile(null);
  }, [photo, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = photo?.image_url || "";

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, imageFile);

      if (uploadError) {
        toast.error("Falha no upload da imagem.");
        console.error(uploadError);
        setIsSubmitting(false);
        return;
      }
      
      const { data: urlData } = supabase.storage.from("photos").getPublicUrl(uploadData.path);
      imageUrl = urlData.publicUrl;
    }

    const photoData = { ...formData, image_url: imageUrl };

    if (photo) {
      // Update
      const { error } = await supabase.from("photos").update(photoData).eq("id", photo.id);
      if (error) {
        toast.error("Falha ao atualizar a foto.");
      } else {
        toast.success("Foto atualizada com sucesso!");
        onSuccess();
      }
    } else {
      // Create
      if (!imageFile) {
        toast.error("Por favor, selecione uma imagem.");
        setIsSubmitting(false);
        return;
      }
      const { error } = await supabase.from("photos").insert([photoData]);
      if (error) {
        toast.error("Falha ao criar a foto.");
      } else {
        toast.success("Foto criada com sucesso!");
        onSuccess();
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{photo ? "Editar Foto" : "Adicionar Nova Foto"}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da fotografia abaixo. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Título</Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Descrição</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Imagem</Label>
            <Input id="image" type="file" onChange={handleFileChange} className="col-span-3" accept="image/*" required={!photo} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" value={formData.category} onChange={handleChange} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="photo_date">Data</Label>
              <Input id="photo_date" value={formData.photo_date} onChange={handleChange} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="camera">Câmera</Label>
              <Input id="camera" value={formData.camera} onChange={handleChange} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="lens">Lente</Label>
              <Input id="lens" value={formData.lens} onChange={handleChange} />
            </div>
            <div className="grid items-center gap-1.5 col-span-2">
              <Label htmlFor="settings">Configurações</Label>
              <Input id="settings" value={formData.settings} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};