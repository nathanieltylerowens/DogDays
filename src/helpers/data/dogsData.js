import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDogsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dogs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allDogs = response.data;
      const myDogs = [];

      if (allDogs) {
        Object.keys(allDogs).forEach((dogId) => {
          const dog = allDogs[dogId];
          dog.id = dogId;
          myDogs.push(dog);
        });
      }

      resolve(myDogs);
    })
    .catch((err) => reject(err));
});

const getDogById = (dogId) => axios.get(`${baseUrl}/dogs/${dogId}.json`);

const createDog = (newDog) => axios.post(`${baseUrl}/dogs.json`, newDog);

const deleteDog = (dogId) => axios.delete(`${baseUrl}/dogs/${dogId}.json`);

const updateDog = (dogId, updatedDog) => axios.put(`${baseUrl}/dogs/${dogId}.json`, updatedDog);

export default {
  getDogsByUid,
  getDogById,
  createDog,
  deleteDog,
  updateDog,
};
