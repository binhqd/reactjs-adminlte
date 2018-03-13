const initialState = [];
const {createTreeFromFlatArray, createTreeFromHash} = require('lib/arrayToTree');

function categoriesAsTree(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORIES_TO_TREE': {

      let tree = createTreeFromFlatArray(action.categories, {
        parentProperty: 'parentId'
      });
      return [
        ...tree
      ];
    }
    default:
      return state;
  }
}

function categoriesToHash(state = {}, action) {
  switch (action.type) {
    case 'ARRAY_CATEGORIES_TO_HASH': {

      let mappedArr = {}, arrElem, arr = action.categories;
      for (let i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = {...arrElem};
      }

      return {
        ...mappedArr
      };
      // case 'REMOVE_CATEGORY':
      //   let newState= state.filter(item => {
      //     return item.id != action.id;
      //   });
      //
      //   return newState;
    }
    default:
      return state;
  }
}

export {categoriesAsTree, categoriesToHash};
