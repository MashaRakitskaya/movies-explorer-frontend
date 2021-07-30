export const BASE_URL = "https://api.rakitskaya.movies.nomoredomains.work";

const checkAnswerCorrectness = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  }).then((response) => checkAnswerCorrectness(response));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((response) => checkAnswerCorrectness(response));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((response) => checkAnswerCorrectness(response))
    .then((data) => data);
};

export const getSaveMovies = () =>
  fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => checkAnswerCorrectness(response));

export const saveMovie = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailer: data.trailer,
      thumbnail: data.thumbnail,
      movieId: data.movieId,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((response) => checkAnswerCorrectness(response));
};

export const deleteSaveMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  }).then((response) => checkAnswerCorrectness(response));
};

export const getUserInformation = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => checkAnswerCorrectness(response));
};

export const editUserInfo = (data) => {
  return fetch(`${this._address}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((response) => checkAnswerCorrectness(response));
};
