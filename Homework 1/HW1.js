const getTable = (cols, rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = j % 2 == 0 ? rows * j + i+1 : rows * j + (rows - i);
    }
  }

  return arr;
};

var result = getTable(10,10);
console.log(result);
