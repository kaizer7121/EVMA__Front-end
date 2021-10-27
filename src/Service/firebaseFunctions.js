import { storage } from "../Firebase";
import { db } from "../Firebase";
import {
  addNotificationsWithImg,
  addSingleNotificationWithImg,
  convertDateToCollectionName,
} from "./functions";
import "firebase/firestore";
import firebase from "../Firebase";
import { notificationAction } from "../Store/notificationSlice";

export const uploadImgToStorage = async (imageAsFile, fileName) => {
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

export const getURLImage = async (imgName) => {
  try {
    const url = await storage.ref().child(`images/${imgName}`).getDownloadURL();

    return url;
  } catch (error) {
    return null;
  }
};

export const deleteImageFile = async (imgName) => {
  const response = await storage
    .ref()
    .child(`images/${imgName}`)
    .delete()
    .then(() => {
      return "SUCCESS";
    })
    .catch((error) => {
      return error;
    });

  return response;
};

//===================================================

export const getListFollowFromUser = async (userID) => {
  const dataSnapshot = await db.collection("Users").doc(userID).get();

  if (dataSnapshot.exists) {
    return dataSnapshot.data();
  } else {
    console.log("Error when get list follow from user id: " + userID);
    return null;
  }
};

export const getAllNotiInLast3Days = async (
  followedEvents,
  followedOrganizers,
  dispatch
) => {
  let listNoti = [];
  const step = 10;

  while (followedEvents.length > 0) {
    const chunk = followedEvents.splice(0, step);
    for (let i = 0; i < 3; i++) {
      const today = new Date();
      const collectionName = convertDateToCollectionName(
        today.setDate(today.getDate() - i)
      );
      const notifications = await db
        .collection(collectionName.toString())
        .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
        .get();

      notifications.forEach(async (noti) => {
        const notiObj = noti.data();
        const listDate = Object.getOwnPropertyNames(notiObj);
        Object.values(noti.data()).forEach(async (key, index) => {
          const eventID = noti.id.split("_")[0];
          listNoti.push({
            notificationID: eventID,
            date: listDate[index],
            message: key,
            type: "Event",
          });
        });
      });
    }
  }
  while (followedOrganizers.length > 0) {
    const chunk = followedOrganizers.splice(0, step);
    for (let i = 0; i < 3; i++) {
      const today = new Date();
      const collectionName = convertDateToCollectionName(
        today.setDate(today.getDate() - i)
      );
      const notifications = await db
        .collection(collectionName.toString())
        .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
        .get();

      notifications.forEach((noti) => {
        const notiObj = noti.data();
        const listDate = Object.getOwnPropertyNames(notiObj);
        Object.values(noti.data()).forEach(async (key, index) => {
          const organizationID = noti.id.split("_")[0];
          listNoti.push({
            notificationID: organizationID,
            date: listDate[index],
            message: key,
            type: "Organization",
          });
        });
      });
    }
  }
  await addNotificationsWithImg(listNoti, dispatch);
};

export const ListenDataChangeFromFollowList = async (
  followedEvents,
  followedOrganizers,
  dispatch
) => {
  const step = 10;
  if (followedEvents.length > 0) {
    while (followedEvents.length > 0) {
      const chunk = followedEvents.splice(0, step);
      const listenData = async (chunk) => {
        db.collection("InstantNotification")
          .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
          .onSnapshot(
            (snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === "added" || change.type === "modified") {
                  const instantEvent = change.doc.data();
                  dispatch(notificationAction.addInstantEvent(instantEvent));
                  addSingleNotificationWithImg(
                    instantEvent,
                    change.doc.id,
                    dispatch
                  );
                }
              });
              if (followedEvents.length === 0) {
                dispatch(notificationAction.allowToStoreInstantEventNoti());
              }
            },
            (error) => {
              console.log("Somethings wrong when listening data: " + error);
            }
          );
      };
      await listenData(chunk);
    }
  } else {
    if (followedEvents.length === 0) {
      dispatch(notificationAction.allowToStoreInstantEventNoti());
    }
  }

  if (followedOrganizers.length > 0) {
    while (followedOrganizers.length > 0) {
      console.log("while");
      console.log(followedOrganizers.length);
      const chunk = followedOrganizers.splice(0, step);
      console.log(followedOrganizers.length);
      db.collection("InstantNotification")
        .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
        .onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (followedOrganizers.length > 0) {
                dispatch(
                  notificationAction.preventToStoreInstantOrganizationNoti()
                );
              }
              if (change.type === "added" || change.type === "modified") {
                const instantEvent = change.doc.data();
                dispatch(notificationAction.addInstantEvent(instantEvent));
                addSingleNotificationWithImg(
                  instantEvent,
                  change.doc.id,
                  dispatch
                );
              }
              if (followedOrganizers.length === 0) {
                dispatch(
                  notificationAction.allowToStoreInstantOrganizationNoti()
                );
              }
            });
            if (followedOrganizers.length === 0) {
              dispatch(
                notificationAction.allowToStoreInstantOrganizationNoti()
              );
            }
          },
          (error) => {
            console.log("Somethings wrong when listening data: " + error);
          }
        );
    }
  } else {
    dispatch(notificationAction.allowToStoreInstantOrganizationNoti());
  }
};

export const listenNotificationOfDocID = async (docID, dispatch) => {
  console.log("Listen");
  db.collection("InstantNotification")
    .where(firebase.firestore.FieldPath.documentId(), "==", docID)
    .onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const instantEvent = change.doc.data();
            dispatch(notificationAction.addInstantEvent(instantEvent));
            addSingleNotificationWithImg(instantEvent, change.doc.id, dispatch);
          }
          if (change.type === "modified") {
            const instantEvent = change.doc.data();
            dispatch(notificationAction.addInstantEvent(instantEvent));
            addSingleNotificationWithImg(instantEvent, change.doc.id, dispatch);
          }
        });
      },
      (error) => {
        console.log("Somethings wrong when listening data: " + error);
      }
    );
};

export const detachListenNotificationOfDocID = async (docID) => {
  console.log("Unsub");
  db.collection("InstantNotification")
    .where(firebase.firestore.FieldPath.documentId(), "==", docID)
    .onSnapshot();
};
