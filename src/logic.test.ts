import { Chessboard } from "./board";
import { Move, isValidMove } from "./logic";
import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK,
} from "./pieces";

const defaultPreviousMove: Move = {
  from: { row: 0, col: 0 },
  to: { row: 0, col: 1 },
};

const isValidMoveWithDefaultPrevious = (
  a0: Parameters<typeof isValidMove>[0],
  a1: Parameters<typeof isValidMove>[1]
) => isValidMove(a0, a1, defaultPreviousMove);

describe("full board tests", () => {
  let board: Chessboard;

  beforeEach(() => {
    // Initialize the board before each test
    board = [
      [
        BLACK_ROOK,
        BLACK_KNIGHT,
        BLACK_BISHOP,
        BLACK_QUEEN,
        BLACK_KING,
        BLACK_BISHOP,
        BLACK_KNIGHT,
        BLACK_ROOK,
      ],
      [
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
      ],
      [
        WHITE_ROOK,
        WHITE_KNIGHT,
        WHITE_BISHOP,
        WHITE_QUEEN,
        WHITE_KING,
        WHITE_BISHOP,
        WHITE_KNIGHT,
        WHITE_ROOK,
      ],
    ];
  });

  it("should allow valid pawn move", () => {
    const move = { from: { row: 1, col: 4 }, to: { row: 2, col: 4 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(true);
  });

  it("should reject invalid pawn move", () => {
    const move = { from: { row: 1, col: 4 }, to: { row: 2, col: 5 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(false);
  });

  it("should allow valid knight move", () => {
    const move = { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(true);
  });

  it("should reject invalid knight move", () => {
    const move = { from: { row: 3, col: 3 }, to: { row: 1, col: 2 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(false);
  });

  it("should allow valid bishop move with cleared path", () => {
    // Clear the path for the bishop
    board[1][1] = null;
    board[2][0] = null;
    const move = { from: { row: 0, col: 2 }, to: { row: 2, col: 0 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(true);
  });

  it("should reject invalid bishop move (obstructed)", () => {
    const move = { from: { row: 0, col: 2 }, to: { row: 2, col: 0 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(false);
  });

  it("should allow valid rook move with cleared path", () => {
    // Clear the path for the rook
    board[0][1] = null;
    board[0][2] = null;
    const move = { from: { row: 0, col: 0 }, to: { row: 0, col: 2 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(true);
  });

  it("should reject invalid rook move (obstructed)", () => {
    const move = { from: { row: 0, col: 0 }, to: { row: 0, col: 3 } };
    const result = isValidMoveWithDefaultPrevious(board, move);
    expect(result).toBe(false);
  });
});

describe("tests - small board", () => {
  it("should validate valid king moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, BLACK_KING, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 0 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 2 },
      })
    ).toBe(true);
  });

  it("should invalidate invalid king moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, WHITE_KING, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 3, col: 2 },
      })
    ).toBe(false);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 1 },
      })
    ).toBe(false); // cannot stay in place
  });

  it("should validate valid queen moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, WHITE_QUEEN, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 0 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 2 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 3 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 0 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 2, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 3, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 2 },
      })
    ).toBe(true);
  });

  it("should invalidate invalid queen moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, WHITE_QUEEN, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 2, col: 3 },
      })
    ).toBe(false); // Can't move like a knight
  });

  it("should validate valid rook moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, WHITE_ROOK, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 2, col: 1 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 0 },
      })
    ).toBe(true);
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 3 },
      })
    ).toBe(true);
  });

  it("should invalidate invalid rook moves", () => {
    const board: Chessboard = [
      [null, WHITE_PAWN, null, null],
      [null, WHITE_ROOK, WHITE_PAWN, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 0 },
      })
    ).toBe(false); // Cannot move diagonally
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 2, col: 2 },
      })
    ).toBe(false); // Cannot move diagonally
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 0, col: 1 },
      })
    ).toBe(false); // Obstructed path
    expect(
      isValidMoveWithDefaultPrevious(board, {
        from: { row: 1, col: 1 },
        to: { row: 1, col: 2 },
      })
    ).toBe(false); // Obstructed path
  });
});
