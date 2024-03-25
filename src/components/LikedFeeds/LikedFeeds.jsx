import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { ListingContext } from "../../context/listing-context";
import axios from "axios";

const LikedFeeds = ({ item }) => {
  const { removeFromCart, addToCart, cartItems } = useContext(ListingContext);
  const [additionalData, setAdditionalData] = useState([]);
  const [isLiked, setIsLiked] = useState(cartItems[item] > 0);
  const handleDislike = () => {
    removeFromCart(item[0]);
    setIsLiked(false);
  };
  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const response = await axios.get(
          `https://api.quotable.io/quotes/${item[0]}`
        );
        setAdditionalData((prevData) => [...prevData, response.data]);
        console.log(additionalData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdditionalData();
  }, []);

  return (
    <>
      <div className="postCards">
        {additionalData.map((dataItem) => (
          <React.Fragment key={dataItem._id}>
            <div className="postPic">
              <img src="../img/profileIcon.png" alt="" />
            </div>
            <div className="postDetails">
              <div className="postName">{dataItem.author}</div>
              <div className="postDesc">{dataItem.content}</div>
              <div className="postRate">
                <div
                  className="postLike"
                  onClick={() => handleDislike(item._id)}
                >
                  <img src="../img/LikeRed.png" alt="" />
                </div>
                <div className="postComment">
                  <img src="../img/Comment.png" alt="" />
                </div>
                <div className="postShare">
                  <img src="../img/Send.png" alt="" />
                </div>
              </div>
              <div className="postTags">
                {dataItem.tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <span>{tag}</span>
                    {index < dataItem.tags.length - 1 && (
                      <div className="dot">
                        <img src="../img/dot.png" alt="" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default LikedFeeds;
