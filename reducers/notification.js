const initialState = {
  type: '',
  message: '',
  time: ''
};

export function notification(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE':
      return {type: action.data.type, message: action.data.message, time: action.data.time};
      break;
    case 'REMOVE':
      return {message: ''};
      break;
    default:
      return state;
  }
}
