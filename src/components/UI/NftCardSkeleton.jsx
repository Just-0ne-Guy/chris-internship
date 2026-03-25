import React from "react";
import Skeleton from "../UI/Skeleton";

const NftCardSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <div className="nft__item_wrap">
        <Skeleton width="100%" height="260px" borderRadius="8px" />
      </div>

      <div className="nft__item_info">
        <div className="mb-2">
          <Skeleton width="160px" height="24px" borderRadius="8px" />
        </div>
        <div className="mb-2">
          <Skeleton width="90px" height="18px" borderRadius="8px" />
        </div>
        <Skeleton width="60px" height="18px" borderRadius="8px" />
      </div>
    </div>
  );
};

export default NftCardSkeleton;