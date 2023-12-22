import React from 'react';
import { createContext, useState, useMemo } from 'react';

export const ContextCreation = createContext();

const Context = ({ children }) => {
  // NavBar State
  const [openPopper, setOpenPopper] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');
  //Landing Page State
  const memoizedPlaylistItems = useMemo(
    () => [
      {
        movieUrl: 'https://assets.asana.biz/m/2efafbb1791862c9/original/LP_PAC_accordion_slideshow_01.mp4',
        moviePoster: ''
      },
      {
        movieUrl: 'https://assets.asana.biz/m/6ca604ecf7ea4d79/original/carousel-forms-EN.mp4'
      },
      {
        movieUrl: 'https://assets.asana.biz/m/2bf9cfd4b9083653/original/aow24-hero.mp4'
      },
      {
        movieUrl: 'https://assets.asana.biz/m/13214d623ec19ac2/original/dashboards.mp4'
      },
      {
        movieUrl: 'https://assets.asana.biz/m/71c4e0669724c7eb/original/custom-fields.mp4'
      }
    ],
    []
  );
  const [videoSrc, setVideoSrc] = useState(memoizedPlaylistItems[0].movieUrl);
  const [posterSrc, setPosterSrc] = useState(memoizedPlaylistItems[0].moviePoster);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const [videoIndex, setVideoIndex] = useState(0);

  const ContextValue = {
    openPopper,
    setOpenPopper,
    anchorEl,
    setAnchorEl,
    value,
    setValue,
    videoSrc,
    setVideoSrc,
    posterSrc,
    setPosterSrc,
    isPlaying,
    setIsPlaying,
    expanded,
    setExpanded,
    videoIndex,
    setVideoIndex,
    memoizedPlaylistItems
  };
  return <ContextCreation.Provider value={ContextValue}>{children}</ContextCreation.Provider>;
};
export default Context;
