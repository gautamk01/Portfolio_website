import React from "react";

const images = [
  "/img-1.webp",
  "/img-2.webp",
  "/img-3.webp",
  "/img-4.webp",
  "/img-5.webp",
  "/img-6.webp",
  "/img-7.webp",
  "/img-8.webp",
  "/img-9.webp",
  "/img-10.webp",
];

const ImageGrid: React.FC = () => {
  return (
    <div className="images-container absolute top-0 left-0 w-full h-full">
      {images.map((src, index) => (
        <div
          key={index}
          className="img absolute top-6 left-6 w-full md:w-1/5 aspect-[5/3] rounded-xl overflow-hidden"
        >
          <img
            src={src}
            alt={`grid item ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
