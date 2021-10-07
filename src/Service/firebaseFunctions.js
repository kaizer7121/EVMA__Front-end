import { storage } from "../Firebase";

export const uploadImgToStorage = async (imageAsFile, fileName) => {
  // console.log(fileName);
  const uploadTask = storage.ref(`/images/${fileName}`).put(imageAsFile);
  uploadTask.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      // console.log(snapShot);
    },
    (err) => {
      //catches the errors
      console.log("upload fial: " + err);
    }
  );
};

export const getURLImage = async (imgName, action) => {
  try {
    storage
      .ref()
      .child(`images/${imgName}`)
      .getDownloadURL()
      .then((url) => {
        if (action) {
          action(url);
        }

        return url;
      })
      .catch(() => {
        return "";
      });
  } catch (error) {
    return "";
  }
};
