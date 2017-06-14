let initial = [];

function listBusinesses(state = initial, action) {
  switch (action.type) {
    case 'UPDATE_BUSINESSES_LIST':
      return action.businesses;
    case 'REMOVE_BUSINESS':
      return state.filter(item => item.id != action.businessId)
    default:
      return state;
  }
}

export {listBusinesses}
