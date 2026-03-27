import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import {
  getHotCollections,
  getNewItems,
  getTopSellers,
} from "../api/nfts";

const Home = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadHomeData() {
      try {
        const [hotCollectionsData, newItemsData, topSellersData] =
          await Promise.all([
            getHotCollections(),
            getNewItems(),
            getTopSellers(),
          ]);

        setHotCollections(hotCollectionsData);
        setNewItems(newItemsData);
        setTopSellers(topSellersData);
      } catch (err) {
        console.error(err);
        setError("could not load nft data");
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />

        {error && <p className="text-center mt-5">{error}</p>}

        <HotCollections items={hotCollections} loading={loading} />
        <NewItems items={newItems} loading={loading} />
        <TopSellers authors={topSellers} loading={loading} />

        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;