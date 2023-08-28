import React from "react";
import { BACKEND_URI } from "./Constant";

const UploadList = ({ medias }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="200">Name</th>
              <th>Videos</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.map((media, index) => {
                return (
                  <tr key={index}>
                    <td>{media.name}</td>
                    <td>
                      {media.videos.map((video, videoIndex) => (
                        <video
                          key={videoIndex}
                          preload="auto"
                          width="320"
                          height="240"
                          controls
                        >
                          <source src={`${BACKEND_URI}${video}`} />
                          Your browser does not support the video tag.
                          <track kind="captions" srcLang="en" label="English captions" />
                        </video>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadList;
