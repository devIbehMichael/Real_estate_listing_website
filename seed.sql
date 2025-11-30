-- Add missing columns to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS bedrooms integer DEFAULT 3;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS bathrooms numeric DEFAULT 2;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS sqft integer DEFAULT 1500;

-- Insert dummy properties
INSERT INTO properties (title, description, price, location_city, location_state, property_type, status, images, category, bedrooms, bathrooms, sqft)
VALUES 
(
  'Modern Luxury Villa', 
  'Stunning 5-bedroom villa with panoramic ocean views, infinity pool, and smart home features. Perfect for luxury living.', 
  1250000, 
  'Miami', 
  'FL', 
  'House', 
  'Available', 
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'], 
  'Sale', 
  5, 
  4, 
  4500
),
(
  'Cozy Downtown Apartment', 
  'Charming 2-bedroom apartment in the heart of the city. Walking distance to shops, restaurants, and public transport.', 
  350000, 
  'Austin', 
  'TX', 
  'Apartment', 
  'Available', 
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'], 
  'Sale', 
  2, 
  2, 
  1200
),
(
  'Spacious Family Home', 
  'Beautiful 4-bedroom house with a large backyard, perfect for families. Located in a quiet, friendly neighborhood.', 
  2800, 
  'Denver', 
  'CO', 
  'House', 
  'Available', 
  ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'], 
  'Rent', 
  4, 
  3, 
  2800
),
(
  'Modern Loft in Arts District', 
  'Industrial-chic loft with high ceilings and exposed brick. Ideal for creatives and young professionals.', 
  1800, 
  'Los Angeles', 
  'CA', 
  'Apartment', 
  'Available', 
  ARRAY['https://images.unsplash.com/photo-1502005229766-939cb0a32f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'], 
  'Rent', 
  1, 
  1, 
  950
);
