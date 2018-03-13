function menu(state = '', action) {
  switch (action.type) {
    case 'SET_MENU_ACTIVE':
      return action.id;
      break;
    default:
      return state;

  }
}

export {menu};
