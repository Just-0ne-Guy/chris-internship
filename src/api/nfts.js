import axios from "axios";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

export async function getHotCollections() {
  const response = await axios.get(HOT_COLLECTIONS_URL);
  return response.data;
}

export async function getNewItems() {
  const response = await axios.get(NEW_ITEMS_URL);
  return response.data;
}

export async function getAllItems() {
  const [hotCollections, newItems] = await Promise.all([
    getHotCollections(),
    getNewItems(),
  ]);

  return [...hotCollections, ...newItems];
}