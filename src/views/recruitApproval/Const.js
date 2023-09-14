import { Box, Card, Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import MainCard from 'ui-component/cards/MainCard';
import animationData from '../lottie/nodata.json';
import animationData1 from '../lottie/loader.json';
export const StyledNode = styled(Card)`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  width: 278px;
  height: 81px;
  background-color: #b47aea;
  padding-left: 13px;
  padding-right: 21px;
  padding-top: 18px;
`;
export const StyledNode2 = styled(Card)`
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
  width: 278px;
  height: 81px;
  background-color: #8c1c29;
  padding-right: 21px;
  padding-top: 18px;
`;
export const StyledNode3 = styled(Card)`
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
  width: 278px;
  height: 81px;
  background-color: #ffb30f;
  padding-right: 21px;
  padding-top: 18px;
`;
export const StyledNodeManager = styled(Card)`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  padding-top: 20px;
  width: 278px;
  height: 81px;
  padding-left: 13px;
  padding-right: 21px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 212, 255, 1) 0%,
    rgba(106, 56, 111, 1) 0%,
    rgba(181, 11, 166, 0.8883928571428571) 100%,
    rgba(148, 79, 141, 0.6979166666666667) 100%
  );
`;
export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
export const StyledCard = styled(Card)`
  && {
    height: 81px;
    background-color: #e1eafb;
    display: flex;
    align-items: center;
    padding-left: 13px;
    padding-right: 21px;
    width: 100%;
    cursor: pointer;
  }
`;
export const LoaderStyle = styled(Box)`
  && {
    width: 100%;
    height: auto;
    position: absolute;
    top: 150px;
    left: 450px;
  }
`;
export const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
`;
export const StyledMainCard = styled(MainCard)`
  && {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export const StyledCardConatiner = styled(Card)`
  && {
    height: calc(100vh - 120px);
  }
`;
export const Btncontainer = styled(Container)`
  && {
    width: 278px;
    height: 81px;
    border: 1px solid black;
    background-color: rgba(255, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const responsiveOptions = [
  {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
  },
  {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
  }
];
export const cardAnimation = {
  hidden: {
    scale: 0,
    opacity: 0,
    x: '-100vw'
  },
  show: {
    scale: 1,
    opacity: 1,
    x: 0
  }
};