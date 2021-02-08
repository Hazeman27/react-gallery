import { useCallback, useEffect, useState } from 'react';


const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  const images = Array(8).fill(null).map((_, index) => ({
    src: `https://source.unsplash.com/random/51${index}`,
    alt: `gallery item ${index}`
  }));

  const closeLightbox = () => setCurrentImageIndex(-1);

  const previousImage = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
    );
  }, [currentImageIndex, images]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex >= images.length - 1 ? 0 : currentImageIndex + 1
    );
  }, [currentImageIndex, images]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          previousImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        default: break;
      }
    };
  
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [nextImage, previousImage]);

  return (
    <>
      <ul className="gallery">
        {images.map(({ src, alt }, index) => (
          <li
            className="gallery-item"
            key={`gallery-item-${index}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={src}
              alt={alt}
            />
          </li>
        ))}
      </ul>
      <dialog className="lightbox" open={currentImageIndex >= 0}>
        <img
          src={images[currentImageIndex]?.src}
          alt={images[currentImageIndex]?.alt}
        />
        <button
          className="lightbox-close-button"
          onClick={closeLightbox}
          type="button"
        >
          X
        </button>
        <button
          className="lightbox-previous-button"
          onClick={previousImage}
          type="button"
        >
          &lt;
        </button>
        <button
          className="lightbox-next-button"
          onClick={nextImage}
          type="button"
        >
          &gt;
        </button>
      </dialog>
    </>
  );
};

export default Gallery;