function createTreeFromFlatArray(arr, options) {
  var tree = [],
      mappedArr = {},
      arrElem;

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }

  tree = createTreeFromHash(mappedArr, options);
  return tree;
}

function createTreeFromHash(hash, options) {
  let tree = [], mappedElem;
  const parentProperty = typeof options.parentProperty != "undefined" ?  options.parentProperty : 'parent_id';

  for (var id in hash) {
    if (hash.hasOwnProperty(id)) {
      mappedElem = hash[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem[parentProperty]) {
        hash[mappedElem[parentProperty]]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
}

module.exports = {
  createTreeFromFlatArray,
  createTreeFromHash
};
