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
        fontFamily: 'Righteous',
        ...add
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

export const firebaseLooper = snapshot => {
  const data = [];

  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const reverseArray = actualArray => {
  let reverseArray = [];

  for (let i = actualArray.length - 1; i >= 0; i--) {
    reverseArray.push(actualArray[i]);
  }
  return reverseArray;
};

export const validate = element => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
