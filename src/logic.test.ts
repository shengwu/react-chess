import { Chessboard } from "./board";
import { isValidMove } from "./logic";
import {
  BLACK_KING,
  BLACK_PAWN,
  WHITE_KING,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK,
} from "./pieces";

describe("Chess Move Validation Tests", () => {
  // Test cases for isValidKingMove
  it("should validate valid king moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, BLACK_KING, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 0 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 2 } })
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
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 3, col: 2 } })
    ).toBe(false);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 1 } })
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
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 0 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 2 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 3 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 0 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 2, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 3, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 2 } })
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
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 2, col: 2 } })
    ).toBe(false); // Cannot move two squares diagonally
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 2, col: 1 } })
    ).toBe(false); // Cannot move two squares vertically
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 3 } })
    ).toBe(false); // Cannot move two squares horizontally
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 3 } })
    ).toBe(false); // Invalid move
  });

  // Test cases for isValidRookMove
  it("should validate valid rook moves", () => {
    const board: Chessboard = [
      [null, null, null, null],
      [null, WHITE_ROOK, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 2, col: 1 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 0 } })
    ).toBe(true);
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 3 } })
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
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 0 } })
    ).toBe(false); // Cannot move diagonally
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 2, col: 2 } })
    ).toBe(false); // Cannot move diagonally
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 0, col: 1 } })
    ).toBe(false); // Obstructed path
    expect(
      isValidMove(board, { from: { row: 1, col: 1 }, to: { row: 1, col: 2 } })
    ).toBe(false); // Obstructed path
  });
});
