import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getFoodByDogId = (dogId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/food.json?orderBy="dogId"&equalTo="${dogId}"`)
    .then((response) => {
      const allFood = response.data;
      const myFood = [];

      if (allFood) {
        Object.keys(allFood).forEach((foodId) => {
          const food = allFood[foodId];
          food.id = foodId;
          myFood.push(food);
        });
      }

      resolve(myFood);
    })
    .catch((err) => reject(err));
});

const getFoodById = (foodId) => axios.get(`${baseUrl}/food/${foodId}.json`);

const createFood = (newFood) => axios.post(`${baseUrl}/food.json`, newFood);

const deleteFood = (foodId) => axios.delete(`${baseUrl}/food/${foodId}.json`);

const updateFood = (foodId, updatedFood) => axios.put(`${baseUrl}/food/${foodId}.json`, updatedFood);

export default {
  getFoodByDogId,
  getFoodById,
  createFood,
  deleteFood,
  updateFood,
};
