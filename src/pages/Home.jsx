import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';
import { Search } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        priceRange: 'any',
        type: 'any',
        category: 'any'
    });

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('status', 'Available')
                .limit(3);
            setFeaturedProperties(data || []);
        };
        fetchFeatured();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.priceRange !== 'any') queryParams.append('price', filters.priceRange);
        if (filters.type !== 'any') queryParams.append('type', filters.type);
        if (filters.category !== 'any') queryParams.append('category', filters.category);

        navigate(`/properties?${queryParams.toString()}`);
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-indigo-700">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Real Estate"
                    />
                    <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" aria-hidden="true"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Find your dream home
                    </h1>
                    <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                        Search properties for sale and rent in your favorite locations.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-10 max-w-xl bg-white rounded-lg p-4 shadow-lg">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <input
                                type="text"
                                placeholder="City or State"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            />
                            <select
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="any">Any Category</option>
                                <option value="Rent">Rent</option>
                                <option value="Sale">Sale</option>
                            </select>
                            <select
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="any">Any Type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Duplex">Duplex</option>
                            </select>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Featured Properties */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Properties</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                {featuredProperties.length === 0 && (
                    <p className="text-gray-500">No featured properties available at the moment.</p>
                )}
                <div className="mt-8 text-center">
                    <Link to="/properties" className="text-indigo-600 font-medium hover:text-indigo-500">
                        View all properties &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
