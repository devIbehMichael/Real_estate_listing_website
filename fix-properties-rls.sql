-- Fix RLS policies for properties to allow admin access

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert properties" ON properties;
DROP POLICY IF EXISTS "Admins can update properties" ON properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON properties;

-- Recreate with better syntax and explicit type casting
CREATE POLICY "Admins can insert properties"
  ON properties FOR INSERT
  WITH CHECK (
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );

CREATE POLICY "Admins can update properties"
  ON properties FOR UPDATE
  USING (
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );

CREATE POLICY "Admins can delete properties"
  ON properties FOR DELETE
  USING (
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );
