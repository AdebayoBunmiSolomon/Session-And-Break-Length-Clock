/** @format */

import React from 'react';

function Footer() {
  return (
    <div>
      <div className='container text-center mt-5'>
        <b className='text-success'>Designed By</b>
        <p>
          <span className='text-primary'>P-Technologies, </span>
          <span className='text-danger'>Adebayo Bunmi Solomon</span>
        </p>
      </div>
      <div className='text-center'>
        <span>
          {new Date().getDate()},&nbsp;
          {new Date().toLocaleString('default', { month: 'short' })}&nbsp;
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default Footer;
