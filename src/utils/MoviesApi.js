export const BASE_URL = "https://api.nomoreparties.co";

const checkAnswerCorrectness = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

export const getAllMovies = () =>
  fetch(`${BASE_URL}/beatfilm-movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkAnswerCorrectness(res));
