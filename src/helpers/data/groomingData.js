import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getGroomingByDogId = (dogId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/grooming.json?orderBy="dogId"&equalTo="${dogId}"`)
    .then((response) => {
      const allGrooming = response.data;
      const myGrooming = [];

      if (allGrooming) {
        Object.keys(allGrooming).forEach((groomingId) => {
          const grooming = allGrooming[groomingId];
          grooming.id = groomingId;
          myGrooming.push(grooming);
        });
      }

      resolve(myGrooming);
    })
    .catch((err) => reject(err));
});

const getGroomingById = (groomingId) => axios.get(`${baseUrl}/grooming/${groomingId}.json`);

const createGrooming = (newGrooming) => axios.post(`${baseUrl}/grooming.json`, newGrooming);

const deleteGrooming = (groomingId) => axios.delete(`${baseUrl}/grooming/${groomingId}.json`);

const updateGrooming = (groomingId, updatedGrooming) => axios.put(`${baseUrl}/grooming/${groomingId}.json`, updatedGrooming);

export default {
  getGroomingByDogId,
  getGroomingById,
  createGrooming,
  deleteGrooming,
  updateGrooming,
};
