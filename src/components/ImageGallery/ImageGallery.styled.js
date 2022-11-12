import styled from 'styled-components';

export const ImageGallery = styled.div`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 40px 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
export const Text = styled.p`
  text-align: center;
  text-shadow: 4px 4px 2px rgba(150, 150, 150, 1);
  font-size: 40px;
`;
