import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import Model from "../Model/Model";
import { CiSearch } from "react-icons/ci";
import { Typewriter } from "react-simple-typewriter";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

const Arts = () => {
  const data = useLoaderData() || [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(data);
  const [loading, setLoading] = useState(false);

  const categories = ["All", ...Array.from(new Set(data.map((art) => art.category)))];

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      let filteredData = data;

      if (search) {
        filteredData = filteredData.filter((art) =>
          art.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category !== "All") {
        filteredData = filteredData.filter((art) => art.category === category);
      }

      setFiltered(filteredData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category, data]);

  const featuredArts = data.slice(0, 5);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8  min-h-screen">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <Typewriter
            words={["Explore Arts", "Discover Creativity", "Find Your Inspiration"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-gray-600 mt-1 text-lg">Discover amazing artworks</p>
      </div>

      {featuredArts.length > 0 && (
        <div className="max-w-sm mx-auto mb-10">
          <Swiper
            effect="cards"
            grabCursor={true}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            modules={[EffectCards, Autoplay, Pagination]}
            className="mySwiper"
          >
            {featuredArts.map((art) => (
              <SwiperSlide key={art._id} className="rounded-xl overflow-hidden shadow-lg">
                <img src={art.imageUrl} alt={art.title} className="w-full h-80 object-cover" />
                <p className="text-center mt-2 font-semibold">{art.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

<div className="flex flex-col md:flex-row justify-end gap-4 mb-8 w-full md:w-1/2 ml-auto">
  <div className="flex items-center border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex-1 focus-within:ring-2 focus-within:ring-indigo-400">
    <CiSearch className="text-gray-400 text-xl mr-2" />
    <input
      type="text"
      placeholder="Search by Title"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="outline-none flex-1"
    />
  </div>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>


      {loading ? (
        <div className="text-center py-10 text-gray-500 font-semibold">Searching...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.length > 0 ? (
            filtered.map((art) => <Model key={art._id} art={art} />)
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10 font-semibold">
              {search || category !== "All"
                ? `No arts found for "${search}" in "${category}"`
                : "No arts found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Arts;
