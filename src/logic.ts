import { Chessboard } from "./board";
import {
  WHITE_KING,
  BLACK_KING,
  WHITE_QUEEN,
  BLACK_QUEEN,
  WHITE_ROOK,
  BLACK_ROOK,
  WHITE_BISHOP,
  BLACK_BISHOP,
  WHITE_KNIGHT,
  BLACK_KNIGHT,
  WHITE_PAWN,
  BLACK_PAWN,
  Piece,
} from "./pieces";

type Move = {
  from: { row: number; col: number };
  to: { row: number; col: number };
};

export function isValidMove(board: Chessboard, move: Move): boolean {
  const { from, to } = move;
  const piece = board[from.row][from.col];

  if (!piece || !isDestinationValid(to.row, to.col) || isStayingInPlace(move)) {
    return false; // Invalid move if no piece at starting position or destination is out of the board.
  }

  // Add specific rules for each piece type (standard chess rules).
  switch (piece) {
    case WHITE_KING:
    case BLACK_KING:
      return isValidKingMove(board, from, to);
    case WHITE_QUEEN:
    case BLACK_QUEEN:
      return isValidQueenMove(board, from, to);
    case WHITE_ROOK:
    case BLACK_ROOK:
      return isValidRookMove(board, from, to);
    case WHITE_BISHOP:
    case BLACK_BISHOP:
      return isValidBishopMove(board, from, to);
    case WHITE_KNIGHT:
    case BLACK_KNIGHT:
      return isValidKnightMove(board, from, to);
    case WHITE_PAWN:
    case BLACK_PAWN:
      return isValidPawnMove(board, from, to);
    default:
      return false; // Invalid move for an unknown piece.
  }
}

function isDestinationValid(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function isValidKingMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // The king can move one square in any direction
  return dx <= 1 && dy <= 1;
}

const isStayingInPlace = ({ from, to }: Move): boolean =>
  from.col === to.col && from.row === to.row;

function isValidQueenMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  // The queen can move horizontally, vertically, or diagonally
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
}

function isValidRookMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid rook movement
  if ((dx === 0 && dy > 0) || (dx > 0 && dy === 0)) {
    const stepX = dx === 0 ? 0 : (to.col - from.col) / dx;
    const stepY = dy === 0 ? 0 : (to.row - from.row) / dy;

    // Check for friendly pieces blocking the way
    for (let i = 1; i < Math.max(dx, dy); i++) {
      const row = from.row + i * stepY;
      const col = from.col + i * stepX;
      if (board[row][col]) {
        return false;
      }
    }

    // Check for capturing an enemy piece
    const targetPiece = board[to.row][to.col];
    if (targetPiece) {
      return !areSameColor(targetPiece, board[from.row][from.col]);
    }

    return true;
  }

  return false;
}

function isValidBishopMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid bishop movement
  if (dx === dy) {
    const stepX = (to.col - from.col) / dx;
    const stepY = (to.row - from.row) / dy;

    // Check for friendly pieces blocking the way
    for (let i = 1; i < dx; i++) {
      const row = from.row + i * stepY;
      const col = from.col + i * stepX;
      if (board[row][col]) {
        return false;
      }
    }

    // Check for capturing an enemy piece
    const targetPiece = board[to.row][to.col];
    if (targetPiece) {
      return !areSameColor(targetPiece, board[from.row][from.col]);
    }

    return true;
  }

  return false;
}

function isValidKnightMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid knight movement
  if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
    const targetPiece = board[to.row][to.col];

    // Check for capturing an enemy piece or moving to an empty square
    if (!targetPiece || !areSameColor(targetPiece, board[from.row][from.col])) {
      return true;
    }
  }

  return false;
}

function isWhitePiece(piece: Piece): boolean {
  return (
    piece === WHITE_KING ||
    piece === WHITE_QUEEN ||
    piece === WHITE_ROOK ||
    piece === WHITE_BISHOP ||
    piece === WHITE_KNIGHT ||
    piece === WHITE_PAWN
  );
}

function isBlackPiece(piece: Piece): boolean {
  return (
    piece === BLACK_KING ||
    piece === BLACK_QUEEN ||
    piece === BLACK_ROOK ||
    piece === BLACK_BISHOP ||
    piece === BLACK_KNIGHT ||
    piece === BLACK_PAWN
  );
}

function areSameColor(pieceA: Piece, pieceB: Piece): boolean {
  return (
    (isWhitePiece(pieceA) && isWhitePiece(pieceB)) ||
    (isBlackPiece(pieceA) && isBlackPiece(pieceB))
  );
}

function isValidPawnMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const piece = board[from.row][from.col];
  const isWhite = piece === WHITE_PAWN;

  // Check for capturing an opponent's piece diagonally
  if (Math.abs(dx) === 1 && dy === (isWhite ? -1 : 1)) {
    const targetPiece = board[to.row][to.col];
    return targetPiece
      ? isWhite
        ? !isWhitePiece(targetPiece)
        : isWhitePiece(targetPiece)
      : isEnPassantMove(board, from, to);
  }

  // Check for moving one or two squares forward (depending on whether it's the pawn's first move)
  if (dx === 0) {
    if (
      (isWhite && from.row === 1 && to.row === 3 && !board[2][from.col]) ||
      (isWhite && from.row + 1 === to.row && !board[to.row][from.col])
    ) {
      return true;
    }
    if (
      (!isWhite && from.row === 6 && to.row === 4 && !board[5][from.col]) ||
      (!isWhite && from.row - 1 === to.row && !board[to.row][from.col])
    ) {
      return true;
    }
  }

  return false;
}

// TODO: you need knowledge of the previous move
function isEnPassantMove(
  board: Chessboard,
  from: { row: number; col: number },
  to: { row: number; col: number }
): boolean {
  // Check if the move is a valid en passant move
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const piece = board[from.row][from.col];
  const isWhite = piece === WHITE_PAWN;

  // Check if the pawn is moving diagonally
  if (Math.abs(dx) === 1 && dy === (isWhite ? -1 : 1)) {
    // Check if the target square is empty, and there's a pawn next to it that just moved two squares forward in the previous move
    const targetRow = isWhite ? to.row + 1 : to.row - 1;
    const targetPiece = board[targetRow][to.col];
    return targetPiece === (isWhite ? BLACK_PAWN : WHITE_PAWN);
  }

  return false;
}
