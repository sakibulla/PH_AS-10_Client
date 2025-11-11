import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const Model = ({ art }) => {
  const { imageUrl, title, artist, category, likes, _id } = art;

  return (
    <StyledCard>
      <div className="card">
        <div className="card__image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <p className="card__artist">By {artist}</p>
          <p className="card__category">{category}</p>
          <p className="card__likes">❤️ {likes || 0} Likes</p>
           <Link to={`/ModelDetails/${_id}`}><button className="card__button">View Details</button></Link>
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;

  .card {
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }

  .card__image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .card__image img {
    transform: scale(1.05);
  }

  .card__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card__title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .card__artist {
    font-size: 14px;
    color: #555;
    margin: 0;
  }

  .card__category {
    font-size: 12px;
    color: #999;
    margin: 0;
  }

  .card__likes {
    font-size: 14px;
    color: #ff4b5c;
    margin: 0;
  }

  .card__button {
    margin-top: 12px;
    padding: 8px 16px;
    background-color: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .card__button:hover {
    background-color: #3730a3;
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .card__image img {
      height: 180px;
    }
  }

  @media (max-width: 768px) {
    max-width: 45%;
    margin: 1rem auto;
    .card__image img {
      height: 160px;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    .card__image img {
      height: 140px;
    }
    .card__title {
      font-size: 18px;
    }
    .card__artist,
    .card__category,
    .card__likes {
      font-size: 12px;
    }
    .card__button {
      padding: 6px 12px;
      font-size: 14px;
    }
  }
`;

export default Model;
