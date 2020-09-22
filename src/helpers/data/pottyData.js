import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPottyByDogId = (dogId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/potty.json?orderBy="dogId"&equalTo="${dogId}"`)
    .then((response) => {
      const allPotty = response.data;
      const myPotty = [];

      if (allPotty) {
        Object.keys(allPotty).forEach((pottyId) => {
          const potty = allPotty[pottyId];
          potty.id = pottyId;
          myPotty.push(potty);
        });
      }

      resolve(myPotty);
    })
    .catch((err) => reject(err));
});

const getPottyById = (pottyId) => axios.get(`${baseUrl}/potty/${pottyId}.json`);

const createPotty = (newPotty) => axios.post(`${baseUrl}/potty.json`, newPotty);

const deletePotty = (pottyId) => axios.delete(`${baseUrl}/potty/${pottyId}.json`);

const updatePotty = (pottyId, updatedPotty) => axios.put(`${baseUrl}/potty/${pottyId}.json`, updatedPotty);

export default {
  getPottyByDogId,
  getPottyById,
  createPotty,
  deletePotty,
  updatePotty,
};
