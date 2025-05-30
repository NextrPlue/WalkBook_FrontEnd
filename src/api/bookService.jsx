import axiosInstance from './axiosInstance';

export const fetchBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data.data;
};