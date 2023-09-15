import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  return (
    <VideoContext.Provider value={{ selectedVideoUrl, setSelectedVideoUrl }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
