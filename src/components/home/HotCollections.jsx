import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = ({ items = [], loading = false }) => {
  const hotCollectionItems = items.slice(0, 6);
  const skeletonItems = new Array(6).fill(0);

  const options = {
    loop: !loading && hotCollectionItems.length > 4,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 600,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
    navText: [
      '<span class="prev">&#10094;</span>',
      '<span class="next">&#10095;</span>',
    ],
  };

  const displayItems = loading ? skeletonItems : hotCollectionItems;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <OwlCarousel
              key={loading ? "loading" : `loaded-${hotCollectionItems.length}`}
              className="owl-theme hot-collections-carousel"
              {...options}
            >
              {displayItems.map((item, index) => (
                <div
                  className="item"
                  key={loading ? index : item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {loading ? (
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="255px" />
                      </div>

                      <div className="nft_coll_pp">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <div className="d-flex flex-column align-items-center">
                          <Skeleton
                            width="140px"
                            height="24px"
                            borderRadius="6px"
                          />
                          <div style={{ height: "12px" }}></div>
                          <Skeleton
                            width="70px"
                            height="18px"
                            borderRadius="6px"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="pp-coll"
                            src={item.authorImage}
                            alt={item.title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
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

export default HotCollections;