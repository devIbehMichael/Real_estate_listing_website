import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, Clock, Mail } from 'lucide-react';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select(`
                    *,
                    properties (
                        title
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Fetched inquiries:', data);
            setInquiries(data || []);
        } catch (error) {
            console.error('Error fetching inquiries:', error.message);
            alert('Error loading inquiries: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleResponded = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('inquiries')
                .update({ responded: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchInquiries();
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Inquiries</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {inquiries.map((inquiry) => (
                        <li key={inquiry.id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-indigo-600 truncate">
                                        {inquiry.name} <span className="text-gray-500 text-xs">({inquiry.email})</span>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <button
                                            onClick={() => toggleResponded(inquiry.id, inquiry.responded)}
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inquiry.responded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {inquiry.responded ? 'Responded' : 'Pending'}
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            {inquiry.message}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <p>
                                            Property: <span className="font-medium">{inquiry.properties?.title || 'Unknown'}</span>
                                        </p>
                                        <p className="ml-4 flex items-center">
                                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            {new Date(inquiry.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {inquiries.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No inquiries found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminInquiries;
