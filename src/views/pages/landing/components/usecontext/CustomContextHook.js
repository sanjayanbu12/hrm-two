import { useContext } from 'react';
import { ContextCreation } from './Context';

export const CustomContextHook = () => {
  return useContext(ContextCreation);
};
