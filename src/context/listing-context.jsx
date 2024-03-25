import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
export const ListingContext = createContext(null);
export const ListingContextProvider = (props) => {
  const [trendTopic, setTrendTopic] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [TagFeeds, setTagFeeds] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [trendTag, setTrendTag] = useState();
  const [home, setHome] = useState(true);
  const handleTrendTags = (item) => {
    setTrendTag(item);
    console.log("setTrendTag", trendTag);
    setTrendTopic(true);
    setHome(false);
  };
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(
          "https://api.quotable.io/quotes/random?limit=4"
        );
        const feedsData = response.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setFeeds(feedsData);
        const cart = {};
        feedsData.forEach((item) => {
          cart[item._id] = 0;
        });
        setCartItems((prev) => ({ ...prev, ...cart }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeeds();
  }, []);

  useEffect(() => {
    const fetchTagFeed = async () => {
      try {
        const response = await axios.get(
          `https://api.quotable.io/quotes?tags=${trendTag}`
        );
        const tagfeedsData = response.data.results
          .slice(0, 4)
          .map((item, index) => ({
            ...item,
            id: index + 1,
          }));
        setTagFeeds(tagfeedsData);
        const cart = {};
        tagfeedsData.forEach((item) => {
          cart[item._id] = 0;
        });
        setCartItems((prev) => ({ ...prev, ...cart }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTagFeed();
  }, [trendTag]);

  const addToCart = (itemId) => {
    if (cartItems[itemId] === 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = {
    setTrendTopic,
    trendTopic,
    cartItems,
    addToCart,
    removeFromCart,
    feeds,
    trendTag,
    setTrendTag,
    TagFeeds,
    handleTrendTags,
    home,
    setHome,
  };

  return (
    <ListingContext.Provider value={contextValue}>
      {props.children}
    </ListingContext.Provider>
  );
};
