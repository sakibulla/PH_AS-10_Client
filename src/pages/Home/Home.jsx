import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Model from '../../pages/Model/Model';
import axios from 'axios';

const Home = () => {
  const [arts, setArts] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [communityHighlights, setCommunityHighlights] = useState([]);

  useEffect(() => {
    axios.get('https://artify-six-nu.vercel.app/home-arts')
      .then(res => {
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setArts(sorted);
        setFiltered(sorted);
        pickRandomSections(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const filteredData = arts.filter((art) =>
        art.title.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredData);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, arts]);

  const pickRandomSections = (data) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setTopArtists(shuffled.slice(0, 2));
    setCommunityHighlights(shuffled.slice(2, 4));
  };

  return (
    <div className="min-h-screen ">

      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <h1 className="text-3xl md:text-4xl font-bold  text-center mb-16">
          Featured Arts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
          {filtered.map((art) => (
            <Model key={art._id} art={art} />
          ))}
        </div>

<h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
  Top Artists of the Week
</h2>
<div className="flex flex-wrap justify-center gap-8 mb-20">
  {topArtists.map((art) => (
    <Model key={art._id} art={art} />
  ))}
</div>

<h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
  Community Highlights
</h2>
<div className="flex flex-wrap justify-center gap-8 mb-20">
  {communityHighlights.map((art) => (
    <Model key={art._id} art={art} />
  ))}
</div>

      </div>
    </div>
  );
};

export default Home;
