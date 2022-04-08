import { format } from "date-fns";
import React, { FC } from "react";
import "./Card.scss";

type CardProps = {
  cardNumber: number;
  title: string;
  author?: string;
  url: string;
  timestamp: number;
  storyScore: number;
  karmaScore?: number;
};

const Card: FC<CardProps> = ({
  cardNumber,
  title,
  author,
  url,
  timestamp,
  storyScore,
  karmaScore,
}) => {
  return (
    <>
      <div className="card">
        <img
          src={`https://www.pngall.com/wp-content/uploads/2016/04/${cardNumber}-Number-PNG.png`}
          alt="Avatar"
        />
        <div className="container">
          <h4>
            <b>{title}</b>
          </h4>
          <p> by: {author}</p>
          <p>
            Published: {format(new Date(timestamp * 1000), "yyyy-MM-dd HH:mm")}
          </p>
          <p>Story score: {storyScore}</p>
          <p>Karma score: {karmaScore}</p>
        </div>
        <div className="firdavs">
          <button>Read story</button>
        </div>
      </div>
    </>
  );
};

export default Card;
