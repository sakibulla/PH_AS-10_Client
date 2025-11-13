import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";

const AddArt = () => {
  const { user } = useContext(AuthContext); 
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = {
      imageUrl: form.imageUrl.value,
      title: form.title.value,
      category: form.category.value,
      mediumTools: form.mediumTools.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      likes: 3,           
      favorites: [],       
    };

    fetch("https://artify-six-nu.vercel.app/Artify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Artwork added successfully!");
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image URL"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Artwork title"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Portrait, Landscape, Abstract"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Medium / Tools</label>
          <input
            type="text"
            name="mediumTools"
            placeholder="e.g. Oil paint, Digital, Watercolor"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Dimensions (optional)</label>
          <input
            type="text"
            name="dimensions"
            placeholder="e.g. 24x36 inches"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Price (optional)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 1200"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Visibility</label>
          <select
            name="visibility"
            className="w-full border  rounded-lg px-3 py-2"
            required
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">User Name (read-only)</label>
          <input
            type="text"
            name="userName"
            value={user?.displayName || "Guest User"}
            readOnly
            className="w-full border rounded-lg px-3 py-2  text-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium">User Email (read-only)</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || "guest@example.com"}
            readOnly
            className="w-full border rounded-lg px-3 py-2  text-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        > 
          Add Artwork
        </button>
      </form>
    </div>
  );
};

export default AddArt;
