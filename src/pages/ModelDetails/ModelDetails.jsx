import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const ModelDetails = () => {
    const data = useLoaderData();
    const model = data.result;

    const [likes, setLikes] = useState(model.likes || 0);
    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);

    // --- Like Handler ---
    const handleLike = async () => {
        if (liked) return; // prevent multiple likes

        setLiked(true);
        setLikes(likes + 1);

        try {
            await fetch(`http://localhost:3000/Artify/${model._id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    // --- Add to Favorites Handler ---
    const handleFavorite = async () => {
        setFavorited(!favorited);
        // Optional: send to backend if you have favorites collection
        // await fetch(`http://localhost:3000/favorites`, { ... })
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Artwork Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-6">
                <img
                    src={model.imageUrl}
                    alt={model.title}
                    className="w-full h-[400px] object-cover"
                />
            </div>

            {/* Artwork Info */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{model.title}</h1>
                <p className="text-gray-600 mb-2"><strong>Medium/Tools:</strong> {model.mediumTools}</p>
                <p className="text-gray-600 mb-4"><strong>Category:</strong> {model.category}</p>
                <p className="text-gray-800">{model.description}</p>
            </div>

            {/* Artist Info */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
                <img
                    src={model.artistPhoto || "https://i.ibb.co/5vQxqRf/default-user.png"}
                    alt={model.userName}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold">{model.userName}</h2>
                    <p className="text-gray-600">Total Artworks: {model.totalArtworks || "—"}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ${
                        liked ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-red-200"
                    } transition-all`}
                >
                    {liked ? <FaHeart /> : <FaRegHeart />} {likes}
                </button>

                <button
                    onClick={handleFavorite}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ${
                        favorited ? "bg-yellow-400 text-white" : "bg-gray-200 hover:bg-yellow-200"
                    } transition-all`}
                >
                    <FaStar /> {favorited ? "Favorited" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default ModelDetails;
