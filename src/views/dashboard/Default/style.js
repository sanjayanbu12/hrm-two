import styled, {css} from 'styled-components';

export const MovieCard = styled.div`
  --transition-duration: 400ms;
  color: white;
  position: relative;
  border-radius: 0.6em;
  overflow: hidden;
  font-size: 80%;
  width: 250px;
  aspect-ratio: 16/9;
  box-shadow: var(--shadow-lg), var(--shadow-lg), var(--shadow-lg);
  transition: transform var(--transition-duration);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3); /* Black overlay with some transparency */
    backdrop-filter: blur(4px); /* Add a blur effect */
    mix-blend-mode: overlay;
    z-index: 1;
    opacity: 0;
    transition: opacity var(--transition-duration);
  }

  &:hover {
    transform: scale(1.03);
    &::before {
      opacity: 1;
    }
  }
`;


export const MovieCardAddNew = styled.div`
  --transition-duration: 400ms;
  background-color: ${(props) => (props.theme === 'light' ? "#222222" : "#222222" )};

  color: ${(props) => (props.theme === 'light' ? "#ffffff" : "#ffffff" )};
  position: relative;
  border-radius: 0.6em;
  overflow: hidden;
  font-size: 80%;
  width: 250px;
  aspect-ratio: 16/9;
  box-shadow: var(--shadow-lg), var(--shadow-lg), var(--shadow-lg);
  transition: transform var(--transition-duration);


  &:hover {
    transform: scale(1.03);
    &::before {
      opacity: 1;
    }
  }
`;


export const Image = styled.img`
  height: 100%;
  width: 100%;
  transition: transform var(--transition-duration);
  object-fit: cover;
  object-position: center;

  ${MovieCard}:hover & {
    transform: scale(1.03);
  }
`;

export const BackgroundImageColor = styled.div`
  height: 100%;
  width: 100%;
  transition: transform var(--transition-duration);
  object-fit: cover;
  object-position: center;

  ${MovieCard}:hover & {
    transform: scale(1.03);
  }
`;



export const Content = styled.div`
  z-index: 1;
  position: absolute;
  bottom: min(4em, 8vmin);
  left: min(3em, 8vmin);
  right: min(3em, 8vmin);
  text-align: left;
  transition: transform var(--transition-duration);


  ${({ checkOutDisabled }) =>
    !checkOutDisabled &&
    css`
  ${MovieCard}:hover & {
    transition-duration: var(--transition-duration);
    transition-delay: calc(var(--transition-duration) / 3);
  }

  ${MovieCard}:not(:hover) & {
    /* opacity: 0; */
    transform: translateY(6em);
  } `}
`;


export const ContentAddNew = styled.div`
  z-index: 1;
  position: absolute;
  /* bottom: min(3.2em, 6vmin);
  left: min(3em, 8vmin);
  right: min(3em, 8vmin); */
  text-align: left;
  transition: transform var(--transition-duration);

`;


export const H1 = styled.h1`
  font-size: 1.8em;
  color: inherit;
  margin: 0;
`;

export const Infos = styled.div`
  font-size: 0.8em;
  font-weight: bold;
  color: #eee;
  display: flex;
  gap: 0.35em;
  align-items: flex-end;

  span {
    line-height: 1;
  }
`;

export const Synopsis = styled.div`
  font-size: 0.8em;
  line-height: 1.4;
  margin-block: 0.75em;
  transition-delay: calc(var(--transition-duration) / 8);
  transition-property: opacity, transform;
  transition-duration: calc(var(--transition-duration) / 2);

  ${MovieCard}:hover & {
    transition-duration: var(--transition-duration);
    transition-delay: calc(var(--transition-duration) / 3);
  }

  ${MovieCard}:not(:hover) & {
    opacity: 0;
    transform: translateY(2em);
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: 0.5em;

  svg {
    height: 1.2em;
    width: auto;
    transition-property: opacity, transform;
    transition-duration: calc(var(--transition-duration) / 2);
    transition-delay: 0s;

    ${MovieCard}:not(:hover) & {
      opacity: 0;
      transform: translateY(50%);
    }
  }
`;


