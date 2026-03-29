import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = ({ items = [], loading = false }) => {
  const displayItems = items.slice(0, 8);
  const skeletonItems = new Array(8).fill(0);

  const options = {
    loop: !loading && displayItems.length > 4,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 600,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
    navText: [
      '<span class="prev">&#10094;</span>',
      '<span class="next">&#10095;</span>',
    ],
  };

  const carouselItems = loading ? skeletonItems : displayItems;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <OwlCarousel
              key={
                loading
                  ? "new-items-loading"
                  : `new-items-${displayItems.length}`
              }
              className="owl-theme new-items-carousel"
              {...options}
            >
              {carouselItems.map((item, index) => (
                <div className="item" key={loading ? index : item.id}>
                  {loading ? (
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>

                      <div className="de_countdown">
                        <Skeleton
                          width="90px"
                          height="18px"
                          borderRadius="6px"
                        />
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton
                          width="100%"
                          height="260px"
                          borderRadius="8px"
                        />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton
                          width="150px"
                          height="24px"
                          borderRadius="6px"
                        />
                        <div style={{ height: "10px" }}></div>
                        <Skeleton
                          width="90px"
                          height="18px"
                          borderRadius="6px"
                        />
                        <div style={{ height: "10px" }}></div>
                        <Skeleton
                          width="50px"
                          height="18px"
                          borderRadius="6px"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={item.title}
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt={item.title}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {item.expiryDate && (
                        <Countdown
                          expiresAt={new Date(item.expiryDate).getTime()}
                        />
                      )}

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
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
