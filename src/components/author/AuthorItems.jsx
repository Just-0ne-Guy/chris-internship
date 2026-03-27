import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ items = [], loading = false }) => {
  const skeletonItems = new Array(8).fill(0);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {(loading ? skeletonItems : items).map((item, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={loading ? index : item.id}
            >
              {loading ? (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>

                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="260px" borderRadius="8px" />
                  </div>

                  <div className="nft__item_info">
                    <Skeleton width="150px" height="24px" borderRadius="6px" />
                    <div style={{ height: "10px" }}></div>
                    <Skeleton width="90px" height="18px" borderRadius="6px" />
                    <div style={{ height: "10px" }}></div>
                    <Skeleton width="50px" height="18px" borderRadius="6px" />
                  </div>
                </div>
              ) : (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={item.title}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {Number(item.code).toFixed(2)} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;