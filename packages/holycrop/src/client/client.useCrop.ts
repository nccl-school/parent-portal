import type { JSX, ReactEventHandler, RefCallback } from "react";
import { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";

export function useCrop(options: { maskSize?: number; initSrc?: string }) {
  const maskSize = options.maskSize ?? 200;
  const initSrc = options.initSrc ?? undefined;

  const [state, setState] = useImmer<{
    zoom: number;
    naturalSize: { w: number; h: number } | null;
    offset: { x: number; y: number };
    src: string | undefined;
  }>({
    zoom: 1,
    naturalSize: null,
    offset: { x: 0, y: 0 },
    src: undefined,
  });

  const handleSelectImage = useCallback<ReactEventHandler<HTMLInputElement>>(
    (e) => {
      const file = e.currentTarget.files?.[0];
      if (!file)
        throw new Error(
          "Unable to detect file from input element. Ensure the type of the input is type='file'?"
        );

      const isImageFile = file.type.startsWith("image/");
      if (!isImageFile) {
        throw new Error(
          "The file you upload is not an image file. Please upload an image file (e.g. png, jpeg, webp, etc...)"
        );
      }

      const reader = new FileReader();
      reader.onload = () =>
        setState((draft) => {
          if (!reader.result)
            throw new Error(
              "Cannot read a result from the provided image file."
            );
          draft.src = reader.result.toString();
        });
      reader.readAsDataURL(file);
    },
    [setState]
  );

  const imgRef = useCallback<RefCallback<HTMLImageElement>>(
    (node) => {
      if (!node) return;
      if (!initSrc) return;
      console.log("Initial source provided. Setting src of image");
      setState((draft) => {
        draft.src = initSrc;
      });
    },
    [initSrc, setState]
  );

  const imgProps = useMemo<JSX.IntrinsicElements["img"]>(
    () => ({
      src: state.src,
      ref: imgRef,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${state.offset.x}px, ${state.offset.y}px) scale(${state.zoom})`,
        transformOrigin: "top left",
      },
      onLoad: (e) => {
        console.log(
          "Image src has been set... Loading image and collecting metrics..."
        );
        const { naturalHeight, naturalWidth } = e.currentTarget;
        const minZoomX = maskSize / naturalWidth;
        const minZoomY = maskSize / naturalHeight;
        const minZoom = Math.max(minZoomX, minZoomY);

        setState((draft) => {
          draft.naturalSize = {
            h: naturalHeight,
            w: naturalWidth,
          };
          draft.offset = {
            x: (maskSize - naturalWidth * minZoom) / 2,
            y: (maskSize - naturalHeight * minZoom) / 2,
          };
          draft.zoom = minZoom;
        });
      },
    }),
    [
      imgRef,
      maskSize,
      setState,
      state.offset.x,
      state.offset.y,
      state.src,
      state.zoom,
    ]
  );

  const areaProps = useMemo<JSX.IntrinsicElements["div"]>(
    () => ({
      style: {
        position: "relative",
        height: maskSize,
        width: maskSize,
      },
    }),
    [maskSize]
  );

  const zoom = useCallback<(zoomNum: number) => void>(
    (zoomNum) => {
      const zoomFactor = 0.001; // sensitivity
      setState((draft) => {
        draft.zoom = Math.max(
          0.1,
          Math.min(3, draft.zoom - zoomNum * zoomFactor)
        );
      });
    },
    [setState]
  );

  const maskProps = useMemo<JSX.IntrinsicElements["div"]>(
    () => ({
      style: {
        position: "absolute",
        height: maskSize,
        width: maskSize,
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid red",
        cursor: "grab",
        zIndex: 10,
      },
      onWheel: (e) => zoom(e.deltaY),
      onMouseDown: (e) => {
        const startX = e.clientX - state.offset.x;
        const startY = e.clientY - state.offset.y;

        function onMove(ev: MouseEvent) {
          setState((draft) => {
            draft.offset = { x: ev.clientX - startX, y: ev.clientY - startY };
          });
        }
        function onUp() {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
        }
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      },
    }),
    [maskSize, setState, state.offset.x, state.offset.y, zoom]
  );

  // const getCropArea = useCallback(() => {}, []);

  return useMemo(
    () => ({ handleSelectImage, imgProps, areaProps, maskProps, zoom }),
    [areaProps, handleSelectImage, imgProps, maskProps, zoom]
  );
}
