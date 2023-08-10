import { Chessboard } from "./board";
import { Move, isValidMove } from "./logic";
import {
  BLACK_KING,
  WHITE_KING,
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

describe("Chess Move Validation Tests", () => {
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
