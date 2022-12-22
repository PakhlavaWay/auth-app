const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const defaultState = {
  isAuthorized: false,
  id: '',
  name: '', 
  email: ''
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isAuthorized: true, id: action.payload.id, name: action.payload.name, email: action.payload.email };
    case LOG_OUT:
      return { ...state, isAuthorized: false, id: '', name: '', email: '' };
    default:
      return state;
  }
}

export const logInAC = (payload) => ({ type: LOG_IN, payload });
export const logOutAC = () => ({ type: LOG_OUT });
