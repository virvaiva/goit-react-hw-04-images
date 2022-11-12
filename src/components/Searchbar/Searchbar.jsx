import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as SC from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    pictureName: '',
    pictures: [],
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.pictureName.trim() === '') {
      toast.error('Enter the name of the picture');
      return;
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ pictureName: value.toLowerCase() });
  };

  render() {
    return (
      <SC.Searchbar>
        <SC.SearchForm onSubmit={this.handleSubmit}>
          <SC.SearchFormButton type="submit">
            <SC.SearchFormButtonLabel>
              <FcSearch style={{ width: 30, height: 30 }} />
            </SC.SearchFormButtonLabel>
          </SC.SearchFormButton>

          <SC.SearchFormInput
            onChange={this.handleInputChange}
            className="input"
            type="text"
            name="name"
            value={this.state.pictureName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SC.SearchForm>
      </SC.Searchbar>
    );
  }
}
Searchbar.propTypes = {
  pictureName: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};
