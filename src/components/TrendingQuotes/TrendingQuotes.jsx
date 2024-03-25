import React, { useContext, useEffect, useState } from "react";
import { ListingContext } from "../../context/listing-context";
import "../../App.css";

const TrendingQuotes = ({ item }) => {
  const { addToCart, removeFromCart, cartItems, trendTag, setTrendTag } =
    useContext(ListingContext);

  const [isLiked, setIsLiked] = useState(cartItems[item._id] > 0);
  const [prevCartLength, setPrevCartLength] = useState(
    Object.keys(cartItems).length
  );

  useEffect(() => {
    setIsLiked(cartItems[item._id] > 0);
    setPrevCartLength(Object.keys(cartItems).length);
  }, [cartItems, item._id]);

  useEffect(() => {
    setIsLiked(cartItems[item._id] > 0);
  }, [cartItems, item._id]);

  const handleLikeDislike = (item) => {
    if (isLiked) {
      removeFromCart(item);
    } else {
      addToCart(item);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="postCards">
        <div className="postPic">
          <img src="../img/profileIcon.png" alt="" />
        </div>
        <div className="postDetails">
          <div className="postName">{item.author}</div>
          <div className="postDesc">{item.content}</div>
          <div className="postRate">
            <div
              className="postLike"
              onClick={() => handleLikeDislike(item._id)}
            >
              <img
                src={!isLiked ? "../img/Like.png" : "../img/LikeRed.png"}
                alt=""
              />
            </div>
            <div className="postComment">
              <img src="../img/Comment.png" alt="" />
            </div>
            <div className="postShare">
              <img src="../img/Send.png" alt="" />
            </div>
          </div>
          <div className="postTags">
            {item.tags.map((tag, index) => (
              <React.Fragment key={index}>
                <span>{tag}</span>
                {index < item.tags.length - 1 && (
                  <div className="dot">
                    {" "}
                    <img src="../img/dot.png" alt="" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingQuotes;
