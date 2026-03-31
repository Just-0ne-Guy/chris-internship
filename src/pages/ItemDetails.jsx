import React, { useEffect, useMemo, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import { getItemDetails } from "../api/nfts";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadItem() {
      try {
        const data = await getItemDetails(nftId);
        console.log("item details response:", data);

        const itemObject = Array.isArray(data) ? data[0] : data?.item || data;
        setItemData(itemObject || null);
      } catch (error) {
        console.error("item details error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [nftId]);

  const item = useMemo(() => {
    if (!itemData) return null;

    return {
      id: itemData.id ?? itemData.nftId ?? nftId,
      nftId: itemData.nftId ?? itemData.id ?? nftId,
      title: itemData.title ?? itemData.name ?? "untitled nft",
      nftImage:
        itemData.nftImage ?? itemData.image ?? itemData.previewImage ?? "",
      description: itemData.description ?? "token from the marketplace feed.",
      price: itemData.price ?? itemData.code ?? 0,
      likes: itemData.likes ?? itemData.likeCount ?? 0,
      views: itemData.views ?? (itemData.id ?? 0) * 10,
      tag: itemData.tag,

      ownerId: itemData.ownerId ?? itemData.authorId ?? "",
      ownerImage:
        itemData.ownerImage ??
        itemData.authorImage ??
        itemData.profileImage ??
        "",
      ownerName:
        itemData.ownerName ??
        itemData.authorName ??
        `owner #${itemData.ownerId ?? itemData.authorId ?? ""}`,

      creatorId: itemData.creatorId ?? itemData.authorId ?? "",
      creatorImage:
        itemData.creatorImage ??
        itemData.authorImage ??
        itemData.profileImage ??
        "",
      creatorName:
        itemData.creatorName ??
        itemData.authorName ??
        `creator #${itemData.creatorId ?? itemData.authorId ?? ""}`,
    };
  }, [itemData, nftId]);

  if (!loading && !item) {
    return <div className="container py-5">item not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="520px" borderRadius="12px" />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                )}
              </div>

              <div className="col-md-6">
                {loading ? (
                  <div className="item_info">
                    <Skeleton width="220px" height="34px" borderRadius="8px" />
                    <div style={{ height: "16px" }}></div>

                    <Skeleton width="120px" height="18px" borderRadius="8px" />
                    <div style={{ height: "16px" }}></div>

                    <Skeleton width="100%" height="60px" borderRadius="8px" />
                    <div style={{ height: "24px" }}></div>

                    <Skeleton width="180px" height="22px" borderRadius="8px" />
                    <div style={{ height: "20px" }}></div>

                    <Skeleton width="140px" height="32px" borderRadius="8px" />
                  </div>
                ) : (
                  <div className="item_info">
                    <h2>
                      {item.title} #{item.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>

                    <p>{item.description}</p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt={item.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt={item.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{Number(item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
