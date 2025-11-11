import React, { useState, useEffect, Suspense } from 'react';
import { useLoaderData } from 'react-router';
import Model from '../Model/Model';
import { CiSearch } from "react-icons/ci";

const Arts = () => {
    const data = useLoaderData();
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(data);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setLoading(true);
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            const filteredData = data.filter((art) =>
                art.title.toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(filteredData);
            setLoading(false);
        }, 400); // debounce delay

        return () => clearTimeout(delay);
    }, [search, data]);

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">All Arts</h1>
                    <p className="text-gray-600 mt-1 text-lg">Explore Arts</p>
                </div>

                {/* Search Bar */}
                <div className="flex items-center border border-gray-300 px-4 py-2 w-full md:w-1/3 rounded-lg shadow-sm bg-white transition focus-within:ring-2 focus-within:ring-indigo-400">
                    <CiSearch className="text-gray-400 text-xl mr-2" />
                    <input
                        type="text"
                        placeholder="Search by Title"
                        value={search}
                        onChange={handleSearch}
                        className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="text-center py-10 text-gray-500 font-semibold">Searching...</div>
            ) : (
                <Suspense fallback={<span>Loading arts...</span>}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filtered.length > 0 ? (
                            filtered.map((art) => (
                                <Model key={art._id} art={art} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10 font-semibold">
                                No arts found
                            </div>
                        )}
                    </div>
                </Suspense>
            )}
        </div>
    );
};

export default Arts;
