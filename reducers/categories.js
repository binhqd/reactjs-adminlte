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

function categoriesToHash(state = {}, action) {
  switch (action.type) {
    case 'ARRAY_CATEGORIES_TO_HASH':
    let mappedArr = {},
        arrElem,
        arr = action.categories;

      for(var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = {...arrElem};
      }

      return {
        ...mappedArr
      }
    default:
      return state
  }
}

export {categoriesAsTree, categoriesToHash};
