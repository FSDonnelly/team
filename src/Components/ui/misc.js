import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = ({ add, bck, children, color, link, linkTo, size }) => {
  const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous'
      }}
    >
      {children}
    </div>
  );

  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
};
