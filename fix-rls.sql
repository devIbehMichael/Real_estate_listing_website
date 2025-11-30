-- Fix RLS policies for inquiries to allow admin access

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON inquiries;

-- Recreate with better syntax
CREATE POLICY "Admins can view inquiries"
  ON inquiries FOR SELECT
  USING (
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );

CREATE POLICY "Admins can update inquiries"
  ON inquiries FOR UPDATE
  USING (
    (auth.jwt() ->> 'email'::text) = 'ibehmichael55@gmail.com'::text
  );
