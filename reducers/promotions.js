let initial = [];

function listPromotions(state = initial, action) {
  switch (action.type) {
    case 'UPDATE_PROMOTION_LIST':
      return action.promotions;
    case 'REMOVE_PROMOTION':
      return state.filter(item => item.id != action.promotionId)
    default:
      return state;
  }
}

export {listPromotions}
