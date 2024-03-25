import React, { useEffect, useState } from "react";
import TrendingTopic from "../TrendingTopics/TrendingTopic";
import "../../App.css";
import axios from "axios";
const Trending = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "https://api.quotable.io/tags?sortBy=quoteCount&order=desc"
        );
        const tagsData = response.data.slice(0, 5);
        setTags(tagsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);
  return (
    <>
      <div className="trendingbox">
        <div className="trendingTopics">
          Trending Topics{" "}
          <div className="trendingSettings">
            <img src="../img/settings.png" alt="" />
          </div>
        </div>
        <div className="qoutesAll">show all quotes</div>
        <div className="quotestag">
          {tags.map((item) => (
            <TrendingTopic item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
