export const generateBoard = (
  rows: number = 10,
  cols: number = 10,
  bombs: number = 20
): number[][] => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  let placedBombs = 0;
  while (placedBombs < bombs) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col] !== -1) {
      board[row][col] = -1;
      placedBombs++;
    }
  }

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === -1) continue;

      let count = 0;
      directions.forEach(([dx, dy]) => {
        const r = row + dx;
        const c = col + dy;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          if (board[r][c] === -1) count++;
        }
      });

      board[row][col] = count;
    }
  }

  return board;
};
