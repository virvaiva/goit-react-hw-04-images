import { Component } from 'react';
import { fetchPhotos } from './API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    pictureName: '',
    loading: false,
    page: 1,
    perPage: 12,
    pictures: [],
    error: null,
    showModal: false,
    largeImageURL: '',
    alt: '',
    totalImages: 0,
  };
  photoInfo = event => {
    this.setState({
      largeImageURL: event,
    });
  };
  onSearchFormSubmit = pictureName => {
    if (this.state.pictureName === pictureName) {
      toast.error('Enter the name of the picture');
    }
    this.setState({
      pictureName,
      page: 1,
      pictures: [],
    });
  };
  async searchArticles() {
    const { pictureName, page } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await fetchPhotos(pictureName, page);
      this.setState({
        pictures: [...this.state.pictures, ...data.hits],
        totalImages: data.totalHits,
      });

      if (data.totalHits === 0) {
        toast.error(`Sorry There are no images "${this.state.name}"`);
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { pictureName, page } = this.state;

    if (prevState.pictureName === pictureName && prevState.page === page) {
      return;
    }
    this.searchArticles();
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { pictures, loading, showModal, largeImageURL, totalImages, page } =
      this.state;
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
        <Searchbar onSubmit={this.onSearchFormSubmit} />
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
            showModal={this.togleModal}
            photoInfo={this.photoInfo}
          />
        )}

        {loading && <Loader loading={loading} />}

        {pictures.length > 0 && restImages > 0 && (
          <Button title="Load more" onClick={this.loadMoreImages} />
        )}

        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
