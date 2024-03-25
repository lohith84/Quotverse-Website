import React, { useContext, useState, useEffect } from "react";
import "../../App.css";
import { ListingContext } from "../../context/listing-context";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const HomeFeeds = ({ item }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(ListingContext);
  const [isLiked, setIsLiked] = useState(cartItems[item._id] > 0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !event.target.closest(".modal-content")) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  const handleLikeDislike = (item) => {
    if (isLiked) {
      removeFromCart(item);
    } else {
      addToCart(item);
    }
    setIsLiked(!isLiked);
  };

  const handleShareOnFacebook = () => {
    const url = `https://www.facebook.com/login`;
    window.open(url, '_blank');
  };
  
  const handleShareOnTwitter = () => {
    const url = `https://twitter.com/login`;
    window.open(url, '_blank');
  };
  
  const handleShareOnInstagram = () => {
    const url = `https://www.instagram.com/accounts/login`;
    window.open(url, '_blank');
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
            <div
              className="postShare"
              onClick={() => setShowModal(true)}
            >
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="model-align">
              <p>Share this Quote on</p>
            </div>
            <div className="modal-icon">
              <div
                className="share-icon"
                onClick={handleShareOnFacebook}
              >
                <FaFacebook />
              </div>
              <div
                className="share-icon"
                onClick={handleShareOnInstagram}
              >
                <FaInstagram />
              </div>
              <div
                className="share-icon"
                onClick={handleShareOnTwitter}
              >
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeFeeds;
