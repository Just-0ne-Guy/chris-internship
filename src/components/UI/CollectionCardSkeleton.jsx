import React from "react";
import Skeleton from "../UI/Skeleton";

const CollectionCardSkeleton = () => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Skeleton width="100%" height="220px" borderRadius="12px 12px 0 0" />
      </div>

      <div className="nft_coll_pp d-flex justify-content-center">
        <div style={{ marginTop: "-30px", zIndex: 2 }}>
          <Skeleton width="60px" height="60px" borderRadius="50%" />
        </div>
      </div>

      <div className="nft_coll_info text-center">
        <div className="d-flex justify-content-center mb-2">
          <Skeleton width="150px" height="24px" borderRadius="8px" />
        </div>
        <div className="d-flex justify-content-center">
          <Skeleton width="80px" height="18px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;