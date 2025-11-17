import React, { useState } from 'react';
import { TourImage } from '@/types/tour.types';

interface TourGalleryProps {
  images: TourImage[];
  tourTitle: string;
}

const TourGallery: React.FC<TourGalleryProps> = ({ images, tourTitle }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-500">Нет изображений</p>
      </div>
    );
  }

  const mainImage = images[selectedImage];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={mainImage.imageUrl}
          alt={mainImage.captionRu || tourTitle}
          className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary-600 ring-2 ring-primary-600'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image.thumbnailUrl || image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setShowLightbox(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={mainImage.imageUrl}
            alt={mainImage.captionRu || tourTitle}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 text-white">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGallery;
