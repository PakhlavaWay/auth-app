import { logOutAC } from "../redux/reducer";

export const trackURL = (url, dispatch, isAuthorized) => {
  if (isAuthorized) {
    if(url.includes('signin') || url.includes('signup')) return dispatch(logOutAC());
    else return;
  }
};

