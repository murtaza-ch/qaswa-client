import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const LoadingRedirect = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, 1000);

    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div>
      <h1>Loading... {count}</h1>
      <Spinner />
    </div>
  );
};

export default LoadingRedirect;
