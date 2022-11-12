import { ColorRing } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import React from 'react';
import PropTypes from 'prop-types';

export const Loader = ({ loading }) => (
  <div>
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    ;
  </div>
);
Loader.propTypes = {
  loading: PropTypes.bool,
};
