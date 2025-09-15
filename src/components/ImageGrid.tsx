import React from "react";

const images = [
  "/img-1.png",
  "/img-2.png",
  "/img-3.png",
  "/img-4.png",
  "/img-5.png",
  "/img-6.png",
  "/img-7.png",
  "/img-8.png",
  "/img-9.png",
  "/img-10.png",
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
