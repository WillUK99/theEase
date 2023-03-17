import React, { useEffect, useState } from 'react'

const useCallbackOnce = (fn: () => void) => {
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (!called) {
      fn();
      setCalled(true);
    }
  }, [called, fn]);

  return called;
}

export default useCallbackOnce
