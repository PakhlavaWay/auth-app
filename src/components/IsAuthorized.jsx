import React from 'react';
import { useSelector } from 'react-redux';

const IsAuthorized = (Component) => {
  const isAuthorized = useSelector(store => store.isAuthorized);
  if (isAuthorized) return <Component />
  return <h1>You are <span style={{color: 'red'}}>not Authorized</span></h1>
}

export default IsAuthorized;