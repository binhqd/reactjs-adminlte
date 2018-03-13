function findCategoryInList(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return arr[i];
    }
  }

  return null;
}

module.exports = {
  findCategoryInList
}
