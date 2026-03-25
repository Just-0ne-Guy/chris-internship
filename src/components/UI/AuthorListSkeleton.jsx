import React from "react";
import Skeleton from "../UI/Skeleton";

const AuthorListSkeleton = () => {
  return (
    <li>
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="author_list_info">
        <div className="mb-2">
          <Skeleton width="120px" height="18px" borderRadius="8px" />
        </div>
        <Skeleton width="70px" height="16px" borderRadius="8px" />
      </div>
    </li>
  );
};

export default AuthorListSkeleton;