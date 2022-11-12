import React from 'react';
import * as SC from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, showModal, photoInfo }) => {
  return (
    <SC.ImageGallery>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          webformatURL={picture.webformatURL}
          tags={picture.tags}
          largeImageURL={picture.largeImageURL}
          showModal={showModal}
          photoInfo={photoInfo}
        />
      ))}
    </SC.ImageGallery>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  showModal: PropTypes.func,
  photoInfo: PropTypes.func,
};
// import { Component } from 'react';

// import { fetchPhotos } from 'components/API/API';
// // import { TbMoodCry } from 'react-icons/tb';
// import { MdDriveFileRenameOutline } from 'react-icons/md';
// import * as SC from './ImageGallery.styled';

// export class Gallary extends Component {
//   state = {
//     picture: null,
//     error: null,
//     status: 'idle',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     fetchPhotos();
//     const prevName = prevProps.pictureName;
//     const nextName = this.props.pictureName;
//     if (prevName !== nextName) {
//       console.log('изменилось имя');
//       this.setState({ status: 'pending' });
//       fetch(
//         `https://pixabay.com/api/?q=${nextName}&page=1&key=30084987-2bae9607d8c7414f71191ed2a&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(responce => {
//           if (responce.ok) {
//             return responce.json();
//           }
//           return Promise.reject(
//             new Error(`Sorry There are no images ${nextName}`)
//           );
//         })

//         .then(picture => this.setState({ picture, status: 'resolved' }))
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }
//   render() {
//     const { picture, error, status } = this.setState;
//     if (status === 'idle') {
//       return (
//         <SC.Text>
//           Enter the name of the picture ...
//           <MdDriveFileRenameOutline style={{ width: 30, height: 30 }} />
//         </SC.Text>
//       );
//     }
//     if (status === 'pending') {
//       return <div>Загружаем...</div>;
//     }
//     if (status === 'rejected') {
//       return <h1>{error.message}</h1>;
//     }
//     if (status === 'resolved') {
//       return (
//         <div>
//           <li>
//             <p>{picture.name}</p>
//             <img
//               src={picture.hits.webformatURL}
//               alt={picture.name}
//               width="300"
//             />
//           </li>
//         </div>
//       );
//     }
//   }
// }
