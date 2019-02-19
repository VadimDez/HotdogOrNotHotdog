import {
  IBM_VISUAL_RECOGNITION_KEY,
  IBM_VISUAL_RECOGNITION_MODEL
} from "./constants";

const uploadPhoto = uri => {
  let formData = new FormData();
  formData.append("images_file", {
    uri,
    name: `photo.jpg`,
    type: `image/jpg`
  });
  formData.append("threshold", 0.6);
  formData.append("classifier_ids", IBM_VISUAL_RECOGNITION_MODEL);

  let options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${IBM_VISUAL_RECOGNITION_KEY}`
    }
  };

  return fetch(
    "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19",
    options
  );
};

export const isHotdog = async photoURI => {
  try {
    let res = await uploadPhoto(photoURI);
    res = await res.json();
    return res.images[0].classifiers[0].classes[0].score > 0.6;
  } catch {
    return false;
  }
};
