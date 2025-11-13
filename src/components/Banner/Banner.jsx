import React from "react";
import { useLoaderData } from "react-router";
import ImageGallery from "react-image-gallery";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-tooltip/dist/react-tooltip.css";

const Banner = () => {
  const data = useLoaderData();

  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-gray-500">No images available</div>;
  }

  const images = data.slice(0, 5).map((item) => ({
    original: item.imageUrl,
    thumbnail: item.imageUrl,
  }));

  return (
   <div className="relative mb-10">
  <ImageGallery
    items={images}
    autoPlay
    showPlayButton={false}
    showFullscreenButton={false}
    showNav={true}
    showThumbnails={false}
    slideInterval={3000}
    additionalClass="custom-gallery"
  />

  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center pointer-events-none z-10 px-4">
    <h1 className="text-3xl md:text-5xl font-bold mb-4">
      <Typewriter
        words={["Discover Stunning Artworks", "Explore Amazing Artists", "Join Our Community"]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </h1>
    <p className="text-sm md:text-lg" data-tooltip-id="explore-tip">
      Hover over artworks to explore details
    </p>
    <Tooltip id="explore-tip" content="Click to explore the gallery" place="bottom" />
  </div>

  <style>{`
    .custom-gallery .image-gallery-slide img {
      width: 100%;
      height: 70vh;
      object-fit: cover;
      object-position: center;
    }
    @media (max-width: 768px) {
      .custom-gallery .image-gallery-slide img {
        height: 50vh;
      }
    }

    /* Force arrows above overlay */
    .custom-gallery .image-gallery-left-nav,
    .custom-gallery .image-gallery-right-nav {
      z-index: 30; /* higher than overlay */
    }
  `}</style>
</div>

  );
};

export default Banner;
