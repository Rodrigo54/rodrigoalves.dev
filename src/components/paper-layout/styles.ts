import styled from 'styled-components';
import media from 'styled-media-query';

export const PaperWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  align-items: center;
`;

export const PaperBox = styled.div`
  z-index: 2;
  margin: -300px auto 0px;
  max-width: 1200px;
  width: 90%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  ${media.lessThan('large')`
    width: 90vw;
    max-width: 900px;
  `}
`;

export const Header = styled.header`
  position: relative;
  backdrop-filter: blur(5px);
  ::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    background-color: var(--color1-shade);
    opacity: 0.6;
    overflow: hidden;
  }
  div {
    position: relative;
    padding: 35px 25px;
    color: var(--color1-contrast);
    text-align: left;
  }
  h1 {
    z-index: 10;
    font-family: var(--font-serif);
    font-weight: 800;
    letter-spacing: 0.1rem;
    line-height: 1.7;
    word-break: break-word;
    font-size: 2.2rem;
    margin: 0rem;
  }
  p {
    font-family: var(--font-sans-serif);
    font-size: 1.5rem;
    font-weight: 300;
    z-index: 10;
  }
`;

export const PaperContent = styled.div`
  color: var(--color2-contrast);
  background: var(--color2);
  padding: 25px;
`;

export const Thumbnail = styled.div`
  z-index: 1;
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
  }
`;
