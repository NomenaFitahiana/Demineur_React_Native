
export const generateBoard = (size: number = 20, bombs: number = 40): number[][] => {
  // créer tableau vide
  const board = new Array(size).fill(0).map(() => new Array(size).fill(0));

  // placer les bombes aléatoirement
  let placedBombs = 0;
  while (placedBombs < bombs) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (board[row][col] !== -1) {
      board[row][col] = -1;
      placedBombs++;
    }
  }

  // compter les bombes autour pour chaque case
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === -1) continue;
      let count = 0;
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (board[newRow][newCol] === -1) count++;
        }
      });
      board[row][col] = count;
    }
  }

  return board;
};
