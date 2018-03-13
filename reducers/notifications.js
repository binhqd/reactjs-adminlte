let initial = {};

function notification(state = initial, action) {
  switch (action.type) {
    case "SHOW_ERROR":
    case "SHOW_WARNING":
    case "SHOW_INFO":
    case "SHOW_SUCCESS":
      return {
        type: action.type,
        title: action.title,
        message: action.message
      };

    case "CLOSE_NOTIFICATION":
      return {}
    default:
      return state;
  }
}

export {notification};
