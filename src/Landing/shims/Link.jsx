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

  return (
    <RouterLink to={href} className={className} onClick={onClick} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
