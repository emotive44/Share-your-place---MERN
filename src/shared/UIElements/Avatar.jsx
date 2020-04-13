import React from 'react';
import './Avatar.css';

const Avatar = props => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        alt={props.alt}
        src={props.image}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
