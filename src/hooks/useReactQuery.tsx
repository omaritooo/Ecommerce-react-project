import axios, { AxiosRequestConfig } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { product } from '../types';

import { useState } from 'react';

interface Data {
  products?: product[];
  total?: number;
  skip?: number;
  limit?: number;
  categories?: string[];
}

interface IProps {
  reqName: string;
  request: AxiosRequestConfig;
  options?: UseQueryOptions<Data>;
}
type QueryResult = {
  data?: Data;
  isLoading: boolean;
  errorResponse?: Error;
};

const useReactQuery = ({ reqName, request, options }: IProps): QueryResult => {
  const [errorResponse, setErrorResponse] = useState<Error>();
  const { data, error, isLoading } = useQuery<Data, Error>({
    queryKey: [reqName],
    queryFn: async () => {
      try {
        const response = await axios(request);
        response.data as product;
        return response.data;
      } catch (error) {
        throw error || error || 'Unknown error occurred';
      }
    },
    onError: (error: any) => {
      setErrorResponse(error);
    }
  });
  return { data, isLoading, errorResponse };
};
export default useReactQuery;
