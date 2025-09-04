import module from "./app.module.scss";

import { useCrop } from "../src/client/client.useCrop.js";

function App() {
  const { handleSelectImage, areaProps, imgProps, maskProps } = useCrop({
    maskSize: 200,
    initSrc:
      "https://cdn.britannica.com/73/182873-050-E1C686F4/Chris-Hemsworth-Thor-Thor-The-Dark-World.jpg",
  });

  return (
    <div className={module.page}>
      <input type="file" onChange={handleSelectImage} />
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
