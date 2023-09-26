import loader from '../lottie/formloader.json'
import learn from '../lottie/learnloader.json'
import nodata from '../lottie/nodata.json'
import uploading from '../lottie/uploading.json'


export const uploading = {
  loop: true,
  autoplay: true,
  animationData: upload,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const loaderOption = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const loaderOption1 = {
  loop: true,
  autoplay: true,
  animationData: learn,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const nodata = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};