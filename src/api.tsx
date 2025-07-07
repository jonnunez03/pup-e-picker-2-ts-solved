import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

const postDog = (newDog: Dog) => {
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then((response) => response.json());
};
const deleteDogRequest = (dogId: number) => {
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete dog with id ${dogId}`);
    }
    return true;
  });
};

const patchFavoriteForDog = (dogId: number, update: Partial<Dog>) => {
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  }).then((response) => response.json());
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
