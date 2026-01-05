export const generateBoard = (
  size: number = 20,
  bombs: number = 40
): number[][] => {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );

 
  let placedBombs = 0;
  while (placedBombs < bombs) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (board[row][col] !== -1) {
      board[row][col] = -1;
      placedBombs++;
    }
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

 
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === -1) continue;

      let count = 0;
      directions.forEach(([dx, dy]) => {
        const r = row + dx;
        const c = col + dy;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          if (board[r][c] === -1) count++;
        }
      });

      board[row][col] = count;
    }
  }

  return board;
};
