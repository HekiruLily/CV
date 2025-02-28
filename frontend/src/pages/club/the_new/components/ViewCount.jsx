import React from 'react';

const ViewCount = ({ count }) => {
  return (
    <span className="view-count">
      <i className="far fa-eye mr-1"></i>
      {count}
    </span>
  );
};
export default ViewCount;