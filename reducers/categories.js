const initialState = [];
const arrayToTree = require('lib/arrayToTree');

function categoriesAsTree(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORIES_TO_TREE':
      let tree = arrayToTree(action.categories, {
        parentProperty: 'parent_id'
      });

      return [
        ...tree
      ]
    default:
      return state
  }
}

export default categoriesAsTree;
