import axiosInstance from './axiosInstance';

export const fetchBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data.data;
};

export const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data.data;
};

export const fetchCategoryById = async (categoryId) => {
  const response = await axiosInstance.get(`/categories/${categoryId}`);
  return response.data.data;
};