import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const Model = ({ art }) => {
  const { imageUrl, title, userName, category, likes, _id } = art;

  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <strong>{category || "Art"}</strong>
              <Link to={`/ModelDetails/${_id}`}>
                <button className="view-btn">View Details</button>
              </Link>
            </div>
          </div>

          <div className="front">
            <div className="img">
              <img src={imageUrl} alt={title} />
            </div>
            <div className="front-content">
              <div className="description">
                <div className="title">
                  <p>
                    <strong>{title}</strong>
                  </p>
                  <svg
                    fill="#20c997"
                    height="15px"
                    width="15px"
                    viewBox="0,0,256,256"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z" />
                    </g>
                  </svg>
                </div>
                <p className="card-footer">
                  <span>👩‍🎨 {userName || "Unknown"}</span> <br />
                  ❤️ {likes || 0} Likes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 260px;
    height: 320px;
    margin: auto;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 400ms;
    box-shadow: 0px 0px 10px 2px #00000066;
    border-radius: 10px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    backface-visibility: hidden;
    overflow: hidden;
  }

  .front {
    transform: rotateY(0deg);
    background-color: #111;
    color: #fff;
  }

  .back {
    transform: rotateY(180deg);
    background-color: #151515;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back::before {
    content: "";
    position: absolute;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #6366f1,
      #8b5cf6,
      #ec4899,
      transparent
    );
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .back-content {
    position: absolute;
    width: 95%;
    height: 95%;
    background-color: #151515;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    z-index: 2;
  }

  .view-btn {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .view-btn:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
  }

  .front-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .badge {
    background-color: #00000055;
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 12px;
    width: fit-content;
    backdrop-filter: blur(3px);
  }

  .description {
    margin-top: 8px;
  }

  .title {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  .card-footer {
    font-size: 12px;
    color: #ddd;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    .card {
      width: 90%;
      height: 280px;
    }
  }
`;

export default Model;
