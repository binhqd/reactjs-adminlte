const initialState = {};

function auth(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        user: action.user
      };
    default:
      return state
  }
}

export {auth};
