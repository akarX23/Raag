import axios from "axios";
import { storage } from "../firebase";
import {
  CREATE,
  CLEARPOSTACTIONS,
  GETPOSTS,
  DELETEPOST,
} from "../ACTION_TYPES";

async function getImageURLs(imageFiles) {
  let imageURLs = [];

  const promises = imageFiles.map(async (image) => {
    const nameToUpload = image.name + Date.now();
    await storage.ref(`images/${nameToUpload}`).put(image);

    await storage
      .ref("images")
      .child(nameToUpload)
      .getDownloadURL()
      .then((url) => imageURLs.push(url));
  });
  await Promise.all(promises);

  return imageURLs;
}

async function getpdfURLs(pdfFiles) {
  let pdfURLs = [];

  const promises = pdfFiles.map(async (pdf) => {
    const nameToUpload = pdf.name + Date.now();
    await storage.ref(`pdfs/${nameToUpload}`).put(pdf);

    await storage
      .ref("pdfs")
      .child(nameToUpload)
      .getDownloadURL()
      .then((url) => pdfURLs.push(url));
  });
  await Promise.all(promises);

  return pdfURLs;
}

export async function createPost(data) {
  const imageURLs = await getImageURLs(data.imageFiles);
  const pdfURLs = await getpdfURLs(data.pdfFiles);

  const dataToSend = {
    title: data.title,
    body: data.body,
    imageUrls: [...imageURLs],
    pdfUrls: [...pdfURLs],
  };

  const request = await axios
    .post("/api/addPost", dataToSend)
    .then((response) => response.data);

  return {
    type: CREATE,
    payload: request,
  };
}

export function clearPostActions() {
  return {
    type: CLEARPOSTACTIONS,
  };
}

export async function getPosts() {
  const request = await axios
    .get("/api/posts")
    .then((response) => response.data);

  return {
    type: GETPOSTS,
    payload: request,
  };
}

export async function deletePost(id, origionalList) {
  const request = await axios
    .get(`/api/deletePost?id=${id}`)
    .then((response) => response.data);

  if (request.success === true) {
    origionalList = origionalList.filter((post) => post._id !== id);
  }

  return {
    type: DELETEPOST,
    payload: {
      postAction: request,
      posts: origionalList,
    },
  };
}
