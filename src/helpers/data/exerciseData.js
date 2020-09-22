import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getExerciseByDogId = (dogId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/exercise.json?orderBy="dogId"&equalTo="${dogId}"`)
    .then((response) => {
      const allExercise = response.data;
      const myExercise = [];

      if (allExercise) {
        Object.keys(allExercise).forEach((exerciseId) => {
          const exercise = allExercise[exerciseId];
          exercise.id = exerciseId;
          myExercise.push(exercise);
        });
      }

      resolve(myExercise);
    })
    .catch((err) => reject(err));
});

const getExerciseById = (exerciseId) => axios.get(`${baseUrl}/exercise/${exerciseId}.json`);

const createExercise = (newExercise) => axios.post(`${baseUrl}/exercise.json`, newExercise);

const deleteExercise = (exerciseId) => axios.delete(`${baseUrl}/exercise/${exerciseId}.json`);

const updateExercise = (exerciseId, updatedExercise) => axios.put(`${baseUrl}/exercise/${exerciseId}.json`, updatedExercise);

export default {
  getExerciseByDogId,
  getExerciseById,
  createExercise,
  deleteExercise,
  updateExercise,
};
