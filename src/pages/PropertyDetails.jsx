import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Bed, Bath, Square, CheckCircle, Phone, Mail, User } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          property_id: id,
          ...inquiry
        }]);

      if (error) throw error;
      setSuccess(true);
      setInquiry({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!property) return <div className="p-8">Property not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Images & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden h-96">
              <img
                src={property.images[activeImage] || 'https://via.placeholder.com/800x600'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative rounded-lg overflow-hidden h-24 ${activeImage === idx ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center mt-2 text-gray-500">
                  <MapPin className="h-5 w-5 mr-1" />
                  {property.location_city}, {property.location_state}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600">${Number(property.price).toLocaleString()}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {property.status}
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-b py-6">
              <div className="flex items-center justify-center">
                <Bed className="h-6 w-6 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center justify-center">
                <Bath className="h-6 w-6 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center justify-center">
                <Square className="h-6 w-6 text-gray-400 mr-2" />
                <span className="font-medium text-gray-900">{property.sqft} sqft</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Agent</h2>
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Inquiry sent!</h3>
                    <p className="text-sm text-green-700 mt-1">
                      We'll get back to you shortly.
                    </p>
                  </div>
                </div>
                <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-green-600 hover:text-green-500 font-medium">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={inquiry.name}
                      onChange={handleInquiryChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={inquiry.email}
                      onChange={handleInquiryChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={inquiry.phone}
                      onChange={handleInquiryChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={inquiry.message}
                    onChange={handleInquiryChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="I'm interested in this property..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
