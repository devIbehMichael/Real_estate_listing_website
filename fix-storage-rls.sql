-- Fix Storage RLS policies for property images

-- Drop existing storage policies
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Recreate with better syntax
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'properties' );

CREATE POLICY "Admin Upload"
  ON storage.objects FOR INSERT
  WITH CHECK ( 
    bucket_id = 'properties' AND 
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );

CREATE POLICY "Admin Update"
  ON storage.objects FOR UPDATE
  USING ( 
    bucket_id = 'properties' AND 
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );

CREATE POLICY "Admin Delete"
  ON storage.objects FOR DELETE
  USING ( 
    bucket_id = 'properties' AND 
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );
