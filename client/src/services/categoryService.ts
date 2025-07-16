import axios from 'axios';
import { CategoryType } from '../types/category.types';

const BASE_URL = 'https://localhost:7147/api/Category';

export const getAllCategories = async (): Promise<CategoryType[]> => {
  const response = await axios.get<CategoryType[]>(BASE_URL);
  return response.data;
};
