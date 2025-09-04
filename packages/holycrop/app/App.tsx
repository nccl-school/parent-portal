import { useCallback } from "react";

import module from "./app.module.scss";

import { useCrop } from "../src/client/client.useCrop.js";

function App() {
  const {
    handleSelectImage,
    areaProps,
    imgProps,
    maskProps,
    getCropArea,
    launchPreview,
  } = useCrop({
    maskSize: 200,
    initSrc:
      "https://cdn.britannica.com/73/182873-050-E1C686F4/Chris-Hemsworth-Thor-Thor-The-Dark-World.jpg",
  });

  const handleClick = useCallback(() => {
    const cropArea = getCropArea();
    console.log(JSON.stringify(cropArea, null, 2));
  }, [getCropArea]);

  return (
    <div className={module.page}>
      <input type="file" onChange={handleSelectImage} />
      <button onClick={handleClick}>Calculate crop area</button>
      <button onClick={launchPreview}>Preview</button>
      <div className={module.container}>
        <div {...areaProps}>
          <div {...maskProps} />
          <img {...imgProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
