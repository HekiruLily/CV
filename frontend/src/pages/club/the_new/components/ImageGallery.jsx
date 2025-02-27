import React from 'react';

const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery image ${index + 1}`}
          className="gallery-image"
        />
      ))}
    </div>
  );
};

export default ImageGallery;