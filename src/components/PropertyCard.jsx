import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/properties/${property.id}`}>
                <div className="relative h-48 w-full">
                    <img
                        src={property.images[0] || 'https://via.placeholder.com/400x300'}
                        alt={property.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${property.category === 'Rent' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                            }`}>
                            For {property.category}
                        </span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${property.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                            {property.status}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-indigo-600 font-semibold">{property.property_type}</p>
                        <Link to={`/properties/${property.id}`} className="block mt-1 text-lg leading-tight font-bold text-gray-900 hover:underline">
                            {property.title}
                        </Link>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                        ${Number(property.price).toLocaleString()}
                    </div>
                </div>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location_city}, {property.location_state}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
