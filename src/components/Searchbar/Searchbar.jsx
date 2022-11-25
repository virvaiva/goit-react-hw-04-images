import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as SC from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (pictureName.trim() === '') {
      toast.error('Enter the name of the picture');
      return;
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setPictureName(value.toLowerCase());
  };

  return (
    <SC.Searchbar>
      <SC.SearchForm onSubmit={handleSubmit}>
        <SC.SearchFormButton type="submit">
          <SC.SearchFormButtonLabel>
            <FcSearch style={{ width: 30, height: 30 }} />
          </SC.SearchFormButtonLabel>
        </SC.SearchFormButton>

        <SC.SearchFormInput
          onChange={handleInputChange}
          className="input"
          type="text"
          name="name"
          value={pictureName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SC.SearchForm>
    </SC.Searchbar>
  );
}

Searchbar.propTypes = {
  pictureName: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};
