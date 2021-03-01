import React, { useEffect } from 'react';

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [list, msg, type, removeAlert]);

  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  );
};

export default Alert;
