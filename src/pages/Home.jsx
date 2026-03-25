import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import { getHotCollections } from "../api/nfts";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadNfts() {
      try {
        const data = await getHotCollections();
        setNfts(data);
      } catch (err) {
        setError("could not load nft data");
      } finally {
        setLoading(false);
      }
    }

    loadNfts();
  }, []);

  const uniqueAuthors = Array.from(
    new Map(nfts.map((item) => [item.authorId, item])).values(),
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        {error && <p className="text-center mt-5">{error}</p>}
        <HotCollections items={nfts} loading={loading} />
        <NewItems items={nfts} loading={loading} />
        <TopSellers authors={uniqueAuthors.slice(0, 12)} loading={loading} />

        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
