import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:3030/v1/getAllTask`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})