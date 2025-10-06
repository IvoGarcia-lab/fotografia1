-- Permite que usuários autenticados insiram novas fotos
CREATE POLICY "Allow authenticated insert" ON public.photos
FOR INSERT TO authenticated WITH CHECK (true);

-- Permite que usuários autenticados atualizem fotos
CREATE POLICY "Allow authenticated update" ON public.photos
FOR UPDATE TO authenticated USING (true);

-- Permite que usuários autenticados excluam fotos
CREATE POLICY "Allow authenticated delete" ON public.photos
FOR DELETE TO authenticated USING (true);