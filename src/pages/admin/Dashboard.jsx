import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Building, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProperties: 0,
        availableProperties: 0,
        totalInquiries: 0,
        newInquiries: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Total Properties
                const { count: totalProperties } = await supabase
                    .from('properties')
                    .select('*', { count: 'exact', head: true });

                // Available Properties
                const { count: availableProperties } = await supabase
                    .from('properties')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'Available');

                // Total Inquiries
                const { count: totalInquiries } = await supabase
                    .from('inquiries')
                    .select('*', { count: 'exact', head: true });

                // New Inquiries (last 7 days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const { count: newInquiries } = await supabase
                    .from('inquiries')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', sevenDaysAgo.toISOString());

                setStats({
                    totalProperties: totalProperties || 0,
                    availableProperties: availableProperties || 0,
                    totalInquiries: totalInquiries || 0,
                    newInquiries: newInquiries || 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const statCards = [
        { name: 'Total Properties', stat: stats.totalProperties, icon: Building, color: 'bg-blue-500' },
        { name: 'Available Properties', stat: stats.availableProperties, icon: CheckCircle, color: 'bg-green-500' },
        { name: 'Total Inquiries', stat: stats.totalInquiries, icon: MessageSquare, color: 'bg-indigo-500' },
        { name: 'New Inquiries (7d)', stat: stats.newInquiries, icon: Clock, color: 'bg-yellow-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {statCards.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <item.icon className={`h-6 w-6 text-white p-1 rounded-md ${item.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Link to="/admin/properties" className="block p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition">
                    <h3 className="text-lg font-medium text-gray-900">Manage Properties</h3>
                    <p className="mt-2 text-sm text-gray-500">Add, edit, or remove property listings.</p>
                </Link>
                <Link to="/admin/inquiries" className="block p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition">
                    <h3 className="text-lg font-medium text-gray-900">Manage Inquiries</h3>
                    <p className="mt-2 text-sm text-gray-500">View and respond to customer inquiries.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
