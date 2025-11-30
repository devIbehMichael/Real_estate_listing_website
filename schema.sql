-- Create properties table
create table properties (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  price numeric not null,
  location_state text not null,
  location_city text not null,
  property_type text not null,
  category text not null,
  status text not null check (status in ('Available', 'Sold', 'Rented')),
  images text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create inquiries table
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references properties(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  responded boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table properties enable row level security;
alter table inquiries enable row level security;

-- Policies for properties
create policy "Public properties are viewable by everyone"
  on properties for select
  using (true);

create policy "Admins can insert properties"
  on properties for insert
  with check (auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com');

create policy "Admins can update properties"
  on properties for update
  using (auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com');

create policy "Admins can delete properties"
  on properties for delete
  using (auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com');

-- Policies for inquiries
create policy "Public can insert inquiries"
  on inquiries for insert
  with check (true);

create policy "Admins can view inquiries"
  on inquiries for select
  using (auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com');

create policy "Admins can update inquiries"
  on inquiries for update
  using (auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com');

-- Storage bucket (This might need to be done via dashboard if SQL editor doesn't support it, but usually it works if the extension is enabled. Alternatively, create bucket manually)
insert into storage.buckets (id, name, public) values ('properties', 'properties', true);

-- Storage policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'properties' );

create policy "Admin Upload"
  on storage.objects for insert
  with check ( bucket_id = 'properties' and auth.jwt() ->> 'email' = 'ibehmichael55@gmail.com' );
