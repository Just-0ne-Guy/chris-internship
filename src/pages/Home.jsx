import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import { getHotCollections, getNewItems } from "../api/nfts";

const Home = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadHomeData() {
      try {
        const [hotCollectionsData, newItemsData] = await Promise.all([
          getHotCollections(),
          getNewItems(),
        ]);

        setHotCollections(hotCollectionsData);
        setNewItems(newItemsData);
      } catch (err) {
        console.error(err);
        setError("could not load nft data");
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const uniqueAuthors = Array.from(
    new Map(hotCollections.map((item) => [item.authorId, item])).values()
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />

        {error && <p className="text-center mt-5">{error}</p>}

        <HotCollections items={hotCollections} loading={loading} />
        <NewItems items={newItems} loading={loading} />
        <TopSellers authors={uniqueAuthors.slice(0, 12)} loading={loading} />

        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
