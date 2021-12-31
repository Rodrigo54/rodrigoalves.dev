import styled from 'styled-components';
import media from 'styled-media-query';

export const PaperWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  align-items: center;
`;

export const PaperContent = styled.div`
  background: var(--color2);
  color: var(--color2-contrast);
  z-index: 2;
  margin: -120px auto 0px;
  padding: 25px;
  max-width: 1200px;
  width: 90%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  ${media.lessThan('large')`
    width: 90vw;
    max-width: 900px;
  `}
`;

export const Header = styled.header`
  z-index: 2;
  margin: 60px auto 0px;
  position: absolute;
  max-height: 550px;
  max-width: 1200px;
  width: 90%;
  padding: 25px;
  text-shadow: 2px 2px 2px rgb(0 0 0 / 50%);
  color: var(--color3-contrast);
  text-align: center;
  h1 {
    font-family: var(--font-serif);
    font-weight: 800;
    letter-spacing: 0.1rem;
    line-height: 1.7;
    word-break: break-word;
    font-size: 2.5rem;
    margin: 2rem auto 1rem;
  }
  p {
    font-family: var(--font-sans-serif);
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

export const Thumbnail = styled.div`
  z-index: 1;
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0.1;
    background-color: var(--color3, #4c0099);
  }
  img {
    object-fit: cover;
  }
`;
