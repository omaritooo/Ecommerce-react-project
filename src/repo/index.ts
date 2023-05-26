import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { product } from '../types';

const baseUrl = 'https://dummyjson.com';

interface IResponse {
  products: product[];
  total: number;
  limit: number;
  skip: number;
}

export const getProducts = async (limit = 10, skip = 0): Promise<IResponse> => {
  const { data } = await axios.get(`${baseUrl}/products?${limit}&${skip}`);
  return data;
};

export const getProductsConfig = (limit = 10, skip = 0): AxiosRequestConfig<any> => {
  const url = `/products?${limit}${skip}`;
  return {
    baseURL: baseUrl,
    url: '/products',
    params: {
      limit: limit,
      skip: skip
    },
    method: 'get'
  };
};

export const getCategoryConfig = (limit = 10, skip = 10, slug: string): AxiosRequestConfig<any> => {
  return {
    baseURL: baseUrl,
    url: `/products/category/${slug}`,
    params: {
      limit: limit,
      skip: skip
    },
    method: 'get'
  };
};

export const getSearchConfig = (
  limit: number,
  skip: number,
  slug: string
): AxiosRequestConfig<any> => {
  return {
    baseURL: baseUrl,
    url: `/products/search?q=${slug}&limit=${limit}&skip=${skip}`,
    method: 'get'
  };
};

export const getProductConfig = (slug: string): AxiosRequestConfig<any> => {
  return {
    baseURL: baseUrl,
    url: `/products/${slug}?`,
    method: 'get'
  };
};
export const setupResponseInterceptor = (navigate: any) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 404) {
        navigate('/error');
      } else {
        return Promise.reject(error);
      }
    }
  );
};
