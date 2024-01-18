import { Grid } from "@mui/material";

export const BlogSliderWrapper = styled.div`
  width: 95%;
  top: 18%;
  position: relative;
  max-width: 800px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 25px;
  height: 400px;
  transition: all 0.3s;

  &.blog-slider{
    background-image: url(${(props) => props.link});
    
    background-repeat: no-repeat;
    background-size: cover;
  }

  &.blog-slider:focus-visible{
    outline: none;
    /* background-color: red; */
  } 

  @media screen and (max-width: 992px) {
    max-width: 680px;
    height: 400px;
  }

  @media screen and (max-width: 768px) {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }

  @media screen and (max-height: 500px) and (min-width: 992px) {
    height: 350px;
  }
`;

export const BlogSliderItem = styled(Grid)`
  display: flex;
  flex-direction: "row";
  align-items: center;


  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  & .blog-slider__img {
    width: 300px;
    flex-shrink: 0;
    height: 300px;
    background-color: #ffffff;
    /* background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%); */
    box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);

    border-radius: 20px;
    transform: translateX(-80px);
    overflow: hidden;

    /* &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; */
      /* background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%); */
      /* border-radius: 20px;
      opacity: 0.8;
    } */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 1;
      border-radius: 20px;
      transition: all 0.3s;
    }

    @media screen and (max-width: 768px) {
      transform: translateY(-50%);
      width: 90%;
    }

    @media screen and (max-width: 576px) {
      width: 95%;
    }

    @media screen and (max-height: 500px) and (min-width: 992px) {
      height: 270px;
    }
  }

  & .blog-slider__content {

    width: 100%;
    height: fit-content;

    padding-right: 25px;
    padding-left: 25px;
    background: rgba(255,255,255,1); 
    backdrop-filter: blur(8px); 
    border-radius: 10px;
    transform: translateX(-30px);
    /* mix-blend-mode: overlay; */

    @media screen and (max-width: 992px) {
      // width: 55%;
    }

    @media screen and (max-width: 768px) {
      margin-top: -80px;
      text-align: center;
      padding: 0 30px;
      transform: translateX(0px);
    }

    @media screen and (max-width: 576px) {
      padding: 0;
      transform: translateX(0px);
    }

    > * {
      opacity: 1;
      transform: translateY(25px);
      transition: all 0.4s;
    }
  }

  & .blog-slider__code {
    color: #7b7992;
    margin-bottom: 15px;
    display: block;
    font-weight: 500;
  }

  & .blog-slider__title {
    font-size: 24px;
    font-weight: 700;
    color: #0d0925;
    margin-bottom: 20px;
  }

  & .blog-slider__text {
    color: #4e4a67;
    margin-bottom: 30px;
    line-height: 1.5em;
  }

  & .blog-slider__button {
    display: inline-flex;
    background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
    padding: 15px 35px;
    border-radius: 50px;
    color: #fff;
    box-shadow: 0px 14px 80px rgba(252, 56, 56, 0.4);
    text-decoration: none;
    font-weight: 500;
    justify-content: center;
    text-align: center;
    letter-spacing: 1px;

    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
`;

export const BlogSliderPagination = styled.div`
  position: absolute;
  z-index: 21;
  right: 20px;
  width: 11px !important;
  text-align: center;
  left: auto !important;
  top: 50%;
  bottom: auto !important;
  transform: translateY(-50%);

  @media screen and (max-width: 768px) {
    transform: translateX(-50%);
    left: 50% !important;
    top: 205px;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 8px 0;

    @media screen and (max-width: 768px) {
      margin: 0 5px;
    }
  }

  & .swiper-pagination-bullet {
    width: 11px;
    height: 11px;
    display: block;
    border-radius: 10px;
    background: #062744;
    opacity: 0.2;
    transition: all 0.3s;

    &-active {
      opacity: 1;
      background: #fd3838;
      height: 30px;
      box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);

      @media screen and (max-width: 768px) {
        height: 11px;
        width: 30px;
      }
    }
  }
`;