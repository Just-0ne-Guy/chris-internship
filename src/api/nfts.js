import axios from "axios";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export async function getAuthor(authorId) {
  const response = await axios.get(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
    {
      params: { author: authorId },
    },
  );

  return response.data;
}

export async function getHotCollections() {
  const response = await axios.get(HOT_COLLECTIONS_URL);
  return response.data;
}

export async function getNewItems() {
  const response = await axios.get(NEW_ITEMS_URL);
  return response.data;
}

export async function getTopSellers() {
  const response = await axios.get(TOP_SELLERS_URL);
  return response.data;
}

export async function getExploreItems(filter = "") {
  const response = await axios.get(EXPLORE_URL, {
    params: filter ? { filter } : {},
  });

  return response.data;
}

export async function getAllItems() {
  const [hotCollections, newItems, topSellers] = await Promise.all([
    getHotCollections(),
    getNewItems(),
    getTopSellers(),
    getAuthor(),
  ]);

  return [...hotCollections, ...newItems, ...topSellers];
}
