import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

export async function getHotCollections() {
  const response = await axios.get(API_URL);
  return response.data;
}