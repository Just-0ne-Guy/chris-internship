import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import { getAllItems } from "../api/nfts";

const Author = () => {
  const { authorId } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthor() {
      try {
        const data = await getAllItems();
        const filtered = data.filter(
          (item) => String(item.authorId) === String(authorId)
        );
        setAuthorItems(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadAuthor();
  }, [authorId]);

  const author = authorItems[0];

  if (!loading && !author) {
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
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                        <div className="profile_name mt-3">
                          <Skeleton width="120px" height="28px" borderRadius="8px" />
                          <div style={{ height: "10px" }}></div>
                          <Skeleton width="160px" height="18px" borderRadius="8px" />
                          <div style={{ height: "10px" }}></div>
                          <Skeleton width="140px" height="18px" borderRadius="8px" />
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="100px" height="18px" borderRadius="8px" />
                        <div style={{ height: "12px" }}></div>
                        <Skeleton width="100px" height="42px" borderRadius="8px" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          src={author.authorImage}
                          alt={`author ${author.authorId}`}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorId}
                            <span className="profile_username">@{author.authorId}</span>
                            <span id="wallet" className="profile_wallet">
                              {author.authorId}
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
                          {authorItems.length} followers
                        </div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
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