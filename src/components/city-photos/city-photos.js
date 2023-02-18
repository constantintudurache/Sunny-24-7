import { useState } from "react";
import "./city-photos.css";
import { PHOTO_API_KEY, PHOTO_API_URL } from "../../api";
import { useEffect } from "react";

const Photo = ({data}) => {

console.log("data=" + data.city);

 const photoFetch = () => {
    fetch(`${PHOTO_API_URL}?query=${data.city}`, {
      headers: {
        Authorization: PHOTO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response) => { console.log(response)
    });
      
  };


  useEffect(() => {
    photoFetch();
  }, []);

    // const bg = document.getElementById("root")
    // bg.style.backgroundImage.url = `${data.photos[0].url}`;
    // bg.style.backgroundColor = "black";
    
    //   return (

    //     <div className="poza" style={{ 
    //         backgroundImage: `url(${data.photos[0].url})`, 
           
    //       }}>
    //       </div>
    // );
};

export default Photo;
