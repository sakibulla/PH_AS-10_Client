import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://artify-six-nu.vercel.app/Myfavorites?email=${user.email}`)
            .then(res => res.json())
            .then(data => { setModels(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, [user]);

    const handleRemove = async (id) => {
        try {
            const res = await fetch(`https://artify-six-nu.vercel.app/favorites/${id}`, { method: "DELETE" });
            if (res.ok) {
                setModels(models.filter(m => m._id !== id));
                toast.success("Removed from Favorites");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (models.length === 0) return <p className="text-center mt-10">No favorites found ❤️</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">My Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {models.map(model => (
                    <div key={model._id} className=" shadow-lg rounded-xl overflow-hidden p-4">
                        <img src={model.imageUrl} alt={model.title} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-xl font-semibold mt-3">{model.title}</h3>
                        <p className="text-gray-600 text-sm">Artist: {model.userName || model.artist}</p>
                        <button onClick={() => handleRemove(model._id)} className="bg-red-500 text-white w-full mt-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Remove Favorite
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;
