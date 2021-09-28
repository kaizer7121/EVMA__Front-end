export const getDate = (fullDate) => {
  if (fullDate) {
    var today = fullDate;
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  } else {
    return "";
  }
};
