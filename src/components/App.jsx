import { useState } from 'react';
import { fetchPhotos } from './API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useEffect } from 'react';

export function App() {
  const [pictureName, setPictureName] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const photoInfo = event => {
    setLargeImageURL(event);
  };
  const onSearchFormSubmit = newPictureName => {
    if (newPictureName === pictureName) {
      toast.error('Enter the name of the picture');
    }
    setPictureName(newPictureName);
    setPage(1);
    setPictures([]);
  };
  useEffect(() => {
    if (!pictureName) {
      return;
    }

    setLoading(true);
    fetchPhotos(pictureName, page)
      .then(({ data }) => {
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setTotalImages(data.totalHits);
        if (data.totalHits === 0) {
          toast.error(`No images with name "${pictureName}"`);
        }
      })
      .catch(error => {
        toast.error(`${error}`);
      })
      .finally(() => setLoading(false));
  }, [pictureName, page]);

  const loadMoreImages = () => setPage(prevPage => prevPage + 1);

  const togleModal = () => setShowModal(showModal => !showModal);

  const restImages = totalImages - page * 12;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onSearchFormSubmit} />
      {pictures.length <= 0 && !loading && (
        <p
          style={{
            textAlign: 'center',
            textShadow: '4px 4px 2px rgba(150, 150, 150, 1)',
            fontSize: '40px',
          }}
        >
          Enter the name of the picture ...
          <MdDriveFileRenameOutline style={{ width: 30, height: 30 }} />
        </p>
      )}

      {pictures.length > 0 && (
        <ImageGallery
          pictures={pictures}
          showModal={togleModal}
          photoInfo={photoInfo}
        />
      )}

      {loading && <Loader loading={loading} />}

      {pictures.length > 0 && restImages > 0 && (
        <Button title="Load more" onClick={loadMoreImages} />
      )}

      {showModal && (
        <Modal onClose={togleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
