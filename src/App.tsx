import React from "react";
import "./App.css";
import usePlant from "./usePlant";
import HumanTime from "./HumanTime";
import LowRes from "./img/lowres.jpg";
import { ReactComponent as DownLogo } from "./img/down.svg";
import { ReactComponent as LoveLogo } from "./img/love.svg";

const App: React.FC = () => {
  const plantData = usePlant();
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  // automagically remove blur when the high quality image has finished loading
  React.useEffect(() => {
      const callback = () => {
          if (imgRef.current && plantData) {
              setImgLoaded(true);
          }
      };
      const storedRef = imgRef.current;
      if (storedRef) {
          storedRef.onload = callback;
          return () => {
              if (storedRef) {
                  storedRef.onload = null;
                  setImgLoaded(false);
              }
          };
      }
  }, [setImgLoaded, imgRef, plantData]);

  return (
    <div className="contain">
      {/* Image background */}
      <div className="bImgContainer contain" style={{ filter: imgLoaded ? "" : "blur(7px)" }}>
          <img src={ LowRes }
              className="bImg contain"
              alt="Such cute plants! I love you!"
              style={{ opacity: imgLoaded ? 0 : 1}} />
          <img src={ plantData ? `https://drive.google.com/a/koontzs.com/uc?id=${plantData.img_id}` : undefined }
              className="bImg contain"
              ref={imgRef}
              alt="Such cute plants! I love you!"
              style={{ opacity: imgLoaded ? 1 : 0 }} />
      </div>
      {/* text overlay */}
      <div className="overlay">
        <p className="plantText">{ imgLoaded
          ? "Your plants are doing great!*"
          : <span>Lemme check real quick<LoveLogo height="1em" className="love"></LoveLogo></span> }</p>
        <DownLogo className="left" style={{ display: imgLoaded ? undefined : "none", animationName: imgLoaded ? "wiggle" : undefined }}></DownLogo>
        <p className="timeText" style={{ transform: imgLoaded ? undefined : "translateY(3em)" }}>
          { imgLoaded && plantData ? `*as of ${ HumanTime(new Date(plantData.date_taken)) }` : ""}
        </p>
      </div>
    </div>
  );
};

export default App;
