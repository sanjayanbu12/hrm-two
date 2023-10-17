// useToast.js
import { useRef } from 'react';


const useToast = () => {
  const toast = useRef(null);

  const showToast = (severity, summary, detail, life = 3000) => {
    toast.current.show({ severity, summary, detail, life });
  };

  return { toast, showToast };
};

export default useToast;
