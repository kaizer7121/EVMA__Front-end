import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import Backdrop from "./Backdrop";
import styles from "./ConfirmImage.module.scss";

const ConfirmImage = (props) => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    x: 25,
    y: 25,
    aspect: props.information.type === "cover" ? 16 / 9 : 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    console.log(img);
    imgRef.current = img;
  }, []);

  const onConfirm = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob((blob) => {
      props.onConfirm(blob);
    }, "image/jpeg");
  };

  useEffect(() => {
    const files = props.information.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(files[0]);
      console.log(files[0]);
    }
  });

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <Backdrop>
      <div className={`${styles.confirmImage}`}>
        <img
          src="/images/icon/cancel-icon.png"
          alt="cancel"
          className={`${styles.confirmImage__cancelIcon}`}
          onClick={() => {
            props.onClose();
          }}
        />

        <h1>Resize your image</h1>
        <hr />
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          keepSelection={true}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          className={`${styles.confirmImage__crop}`}
        />
        <h2>Your image after crop</h2>
        <div className={`${styles.confirmImage__cropedImgage}`}>
          <canvas
            ref={previewCanvasRef}
            // style={{
            //   width: Math.round(completedCrop?.width ?? 0),
            //   height: Math.round(completedCrop?.height ?? 0),
            // }}
          />
        </div>
        <button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => onConfirm(previewCanvasRef.current, completedCrop)}
          className={`${styles.confirmImage__button}`}
        >
          Confirm your
        </button>
      </div>
    </Backdrop>
  );
};

export default ConfirmImage;
