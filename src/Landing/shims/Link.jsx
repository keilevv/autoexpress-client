import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ href, children, className, onClick, ...props }) => {
  if (href?.startsWith('http') || href?.startsWith('#')) {
    return (
      <a href={href} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  // Map Next.js absolute paths to Vite app's /landing equivalents
  let mappedHref = href;
  if (href === '/') mappedHref = '/landing';
  else if (href?.startsWith('/')) mappedHref = `/landing${href}`;

  return (
    <RouterLink to={mappedHref} className={className} onClick={onClick} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
