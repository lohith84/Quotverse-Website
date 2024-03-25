import React, { useContext } from "react";
import "../../App.css";
import { ListingContext } from "../../context/listing-context";

const TrendingTopic = ({ item }) => {
  const { trendTag, setTrendTag, handleTrendTags } = useContext(ListingContext);

  const handleTrendTags2 = (item) => {
    handleTrendTags(item);
  };
  return (
    <>
      <div className="qoutes">
        <div className="qoutesTopic">{item.name}</div>
        <div
          className="qoutesHastag"
          onClick={() => handleTrendTags2(item.name)}
        >
          #{item.slug}
        </div>
        <div className="qoutesNumber">{item.quoteCount}</div>
      </div>
    </>
  );
};

export default TrendingTopic;
