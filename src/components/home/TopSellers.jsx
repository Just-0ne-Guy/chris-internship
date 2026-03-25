import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = ({ authors = [], loading = false }) => {
  const skeletonItems = new Array(12).fill(0);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {(loading ? skeletonItems : authors).map((author, index) =>
                loading ? (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="110px" height="18px" borderRadius="6px" />
                      <div style={{ height: "8px" }}></div>
                      <Skeleton width="70px" height="16px" borderRadius="6px" />
                    </div>
                  </li>
                ) : (
                <li key={author.authorId}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage}
                        alt={author.title}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>{author.authorId}</Link>
                    <span>{author.code} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
