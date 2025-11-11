import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyModels = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingModel, setEditingModel] = useState(null); // For update modal

  // Fetch user-specific artworks
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/MyModels?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching models:", err);
        setLoading(false);
      });
  }, [user]);

  // Handle Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/Artify/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Artwork deleted successfully!");
          setModels(models.filter((m) => m._id !== id));
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete artwork!");
      });
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedModel = {
      title: form.title.value,
      category: form.category.value,
      mediumTools: form.mediumTools.value,
      price: form.price.value,
      visibility: form.visibility.value,
      description: form.description.value,
    };

    fetch(`http://localhost:3000/Artify/${editingModel._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Artwork updated successfully!");
          // update UI without reloading
          setModels(
            models.map((m) =>
              m._id === editingModel._id ? { ...m, ...updatedModel } : m
            )
          );
          setEditingModel(null); // close modal
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update artwork!");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading your artworks...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Artworks</h2>

      {models.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any artworks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition relative"
            >
              <img
                src={model.imageUrl}
                alt={model.title}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{model.title}</h3>
              <p className="text-gray-600">{model.category}</p>
              <p className="text-gray-500 text-sm mt-1">{model.mediumTools}</p>
              <p className="text-gray-500 text-sm mt-1">
                Visibility: {model.visibility}
              </p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setEditingModel(model)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(model._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Update Artwork</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={editingModel.title}
                className="w-full border px-3 py-2 rounded"
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={editingModel.category}
                className="w-full border px-3 py-2 rounded"
                placeholder="Category"
                required
              />
              <input
                type="text"
                name="mediumTools"
                defaultValue={editingModel.mediumTools}
                className="w-full border px-3 py-2 rounded"
                placeholder="Medium / Tools"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={editingModel.price}
                className="w-full border px-3 py-2 rounded"
                placeholder="Price"
              />
              <textarea
                name="description"
                defaultValue={editingModel.description}
                className="w-full border px-3 py-2 rounded h-20 resize-none"
                placeholder="Description"
              ></textarea>
              <select
                name="visibility"
                defaultValue={editingModel.visibility}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setEditingModel(null)}
                  className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyModels;
