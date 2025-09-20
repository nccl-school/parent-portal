import type { FormEvent } from "react";
import { useState } from "react";

import styles from "./app.module.scss";

import { useCrop } from "../../src/client/client.useCrop.js";

function App() {
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined
  );
  const {
    handleSelectImage,
    areaProps,
    imgProps,
    maskProps,
    getCropArea,
    getFile,
    launchPreview,
  } = useCrop({
    maskSize: 200,
    // initSrc:
    //   "https://cdn.britannica.com/73/182873-050-E1C686F4/Chris-Hemsworth-Thor-Thor-The-Dark-World.jpg",
  });

  function handleClick() {
    const cropArea = getCropArea();
    console.log(JSON.stringify(cropArea, null, 2));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);

    const file = getFile();
    const area = getCropArea();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("x", area.x.toString());
    formData.append("y", area.y.toString());
    formData.append("height", area.height.toString());
    formData.append("width", area.width.toString());

    try {
      const res = await fetch("http://localhost:7001/api/avatar", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      setError({
        message: new Error(String(error)).message ?? "An error occurred",
      });
    }
  }

  return (
    <div className={styles.page}>
      <input type="file" onChange={handleSelectImage} />
      <button onClick={handleClick}>Calculate crop area</button>
      <button onClick={launchPreview}>Preview</button>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div {...areaProps}>
            <div {...maskProps} />
            <img {...imgProps} />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}

export default App;
