import React, { useEffect, useMemo, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import { getAuthor, getAllItems } from "../api/nfts";

const Author = () => {
  const { authorId } = useParams();

  const [authorData, setAuthorData] = useState(null);
  const [authorItems, setAuthorItems] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthor() {
      try {
        const data = await getAuthor(authorId);
        console.log("author api response:", data);

        const authorObject = Array.isArray(data)
          ? data[0]
          : data?.author || data;
        console.log("author object:", authorObject);

        setAuthorData(authorObject || null);

        let rawItems =
          authorObject?.authorNfts ||
          authorObject?.nfts ||
          authorObject?.items ||
          authorObject?.authorItems ||
          authorObject?.collections ||
          authorObject?.nftCollection ||
          authorObject?.nftCollections ||
          data?.authorNfts ||
          data?.nfts ||
          data?.items ||
          data?.authorItems ||
          data?.collections ||
          data?.nftCollection ||
          data?.nftCollections ||
          [];

        console.log("raw items before fallback:", rawItems);

        if (!Array.isArray(rawItems) || rawItems.length === 0) {
          const allItems = await getAllItems();
          console.log("all items fallback:", allItems);

          rawItems = allItems.filter(
            (item) => String(item.authorId) === String(authorId),
          );
        }

        console.log("raw items after fallback:", rawItems);

        const normalizedItems = (rawItems || []).map((item, index) => ({
          ...item,
          id: item.id ?? item.nftId ?? `${authorId}-${index}`,
          authorId: item.authorId ?? authorObject?.authorId ?? authorId,
          authorImage:
            item.authorImage ??
            authorObject?.authorImage ??
            authorObject?.profileImage ??
            "",
          nftId: item.nftId ?? item.id ?? `${authorId}-${index}`,
          nftImage: item.nftImage ?? item.image ?? item.previewImage ?? "",
          title: item.title ?? item.name ?? "untitled nft",
          price: item.price ?? item.code ?? 0,
          likes: item.likes ?? item.likeCount ?? 0,
        }));

        console.log("normalized items:", normalizedItems);
        setAuthorItems(normalizedItems);

        const followerCount =
          authorObject?.followers ??
          authorObject?.followerCount ??
          authorObject?.followersCount ??
          0;

        setFollowers(Number(followerCount));
      } catch (error) {
        console.error("author page error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAuthor();
  }, [authorId]);

  const displayName = useMemo(() => {
    if (!authorData) return "";
    return authorData.authorName || authorData.name || `author #${authorId}`;
  }, [authorData, authorId]);

  const profileImage =
    authorData?.authorImage || authorData?.profileImage || "";

  const username =
    authorData?.tag || authorData?.username || `author${authorId}`;

  const walletValue =
    authorData?.address ||
    authorData?.wallet ||
    authorData?.authorId ||
    authorId;

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => Math.max(0, prev - 1));
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  if (!loading && !authorData) {
    return <div className="container py-5">author not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <div className="profile_name mt-3">
                          <Skeleton
                            width="180px"
                            height="28px"
                            borderRadius="8px"
                          />
                          <div style={{ height: "10px" }}></div>
                          <Skeleton
                            width="140px"
                            height="18px"
                            borderRadius="8px"
                          />
                          <div style={{ height: "10px" }}></div>
                          <Skeleton
                            width="220px"
                            height="18px"
                            borderRadius="8px"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton
                          width="90px"
                          height="18px"
                          borderRadius="8px"
                        />
                        <div style={{ height: "12px" }}></div>
                        <Skeleton
                          width="110px"
                          height="42px"
                          borderRadius="8px"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={profileImage} alt={displayName} />
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {displayName}
                            <span className="profile_username">
                              @{username}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {walletValue}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <button
                          type="button"
                          className="btn-main"
                          onClick={handleFollowToggle}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={authorItems} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
