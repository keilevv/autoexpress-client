import React from 'react';

const Image = ({ src, alt, width, height, className, style, priority, unoptimized, fill, ...props }) => {
  // Simple shim for Next.js Image
  const imgStyle = fill ? { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', objectFit: 'cover', ...style } : style;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
};

export default Image;
