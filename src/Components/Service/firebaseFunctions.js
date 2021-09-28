import { storage } from "../../Firebase";

export const uploadImgToStorage = async (imageAsFile, fileName) => {
  const uploadTask = storage.ref(`/images/${fileName}`).put(imageAsFile);
  uploadTask.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot);
    },
    (err) => {
      //catches the errors
      console.log(err);
    }
  );
  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  const fireBaseUrl = await storage
    .ref("images")
    .child(fileName)
    .getDownloadURL();
  return fireBaseUrl;
};
