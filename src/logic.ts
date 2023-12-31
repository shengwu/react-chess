import { Chessboard, Square } from "./board";
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

export interface Move {
  from: { row: number; col: number };
  to: { row: number; col: number };
}

export function isValidMove(
  board: Chessboard,
  move: Move,
  previousMove: Move
): boolean {
  const { from, to } = move;
  const piece = board[from.row][from.col];

  if (!piece || !isDestinationValid(to.row, to.col) || isStayingInPlace(move)) {
    return false; // Invalid move if no piece at starting position or destination is out of the board.
  }

  // Check for capturing an enemy piece
  const me = board[from.row][from.col];
  const targetPiece = board[to.row][to.col];
  if (targetPiece && areSameColor(me, targetPiece)) {
    // Can't capture own piece
    return false;
  }

  // Add specific rules for each piece type (standard chess rules).
  switch (piece) {
    case WHITE_KING:
    case BLACK_KING:
      return isValidKingMove(move);
    case WHITE_QUEEN:
    case BLACK_QUEEN:
      return isValidQueenMove(board, move);
    case WHITE_ROOK:
    case BLACK_ROOK:
      return isValidRookMove(board, move);
    case WHITE_BISHOP:
    case BLACK_BISHOP:
      return isValidBishopMove(board, move);
    case WHITE_KNIGHT:
    case BLACK_KNIGHT:
      return isValidKnightMove(move);
    case WHITE_PAWN:
    case BLACK_PAWN:
      return isValidPawnMove(board, move, previousMove);
    default:
      return false; // Invalid move for an unknown piece.
  }
}

function isDestinationValid(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function isValidKingMove({ from, to }: Move): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // The king can move one square in any direction
  if (dx > 1 || dy > 1) {
    return false;
  }

  return true;
}

const isStayingInPlace = ({ from, to }: Move): boolean =>
  from.col === to.col && from.row === to.row;

function isValidQueenMove(board: Chessboard, move: Move): boolean {
  // The queen can move horizontally, vertically, or diagonally
  return isValidRookMove(board, move) || isValidBishopMove(board, move);
}

function isValidRookMove(board: Chessboard, { from, to }: Move): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid rook movement
  if (!(dx === 0 && dy > 0) && !(dx > 0 && dy === 0)) {
    return false;
  }

  const stepX = dx === 0 ? 0 : (to.col - from.col) / dx;
  const stepY = dy === 0 ? 0 : (to.row - from.row) / dy;

  // Check for pieces blocking the way
  for (let i = 1; i < Math.max(dx, dy); i++) {
    const row = from.row + i * stepY;
    const col = from.col + i * stepX;
    if (board[row][col]) {
      return false;
    }
  }

  return true;
}

function isValidBishopMove(board: Chessboard, { from, to }: Move): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid bishop movement
  if (dx !== dy) {
    return false;
  }
  const stepX = (to.col - from.col) / dx;
  const stepY = (to.row - from.row) / dy;

  // Check for pieces blocking the way
  for (let i = 1; i < dx; i++) {
    const row = from.row + i * stepY;
    const col = from.col + i * stepX;
    if (board[row][col]) {
      return false;
    }
  }

  return true;
}

function isValidKnightMove({ from, to }: Move): boolean {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);

  // Check for valid knight movement
  if (!(dx === 2 && dy === 1) && !(dx === 1 && dy === 2)) {
    return false;
  }
  return true;
}

function isWhitePiece(piece: Square): boolean {
  if (piece === null) {
    return false;
  }
  return (
    piece === WHITE_KING ||
    piece === WHITE_QUEEN ||
    piece === WHITE_ROOK ||
    piece === WHITE_BISHOP ||
    piece === WHITE_KNIGHT ||
    piece === WHITE_PAWN
  );
}

function isBlackPiece(piece: Square): boolean {
  if (piece === null) {
    return false;
  }
  return (
    piece === BLACK_KING ||
    piece === BLACK_QUEEN ||
    piece === BLACK_ROOK ||
    piece === BLACK_BISHOP ||
    piece === BLACK_KNIGHT ||
    piece === BLACK_PAWN
  );
}

function areSameColor(pieceA: Square, pieceB: Square): boolean {
  return (
    (isWhitePiece(pieceA) && isWhitePiece(pieceB)) ||
    (isBlackPiece(pieceA) && isBlackPiece(pieceB))
  );
}

function isValidPawnMove(
  board: Chessboard,
  move: Move,
  previousMove: Move
): boolean {
  const { from, to } = move;
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const piece = board[from.row][from.col];
  const isWhite = piece === WHITE_PAWN;

  // Check for capturing an opponent's piece diagonally
  if (Math.abs(dx) === 1 && dy === (isWhite ? -1 : 1)) {
    return isValidEnPassantMove(board, move, previousMove);
  }

  // Pawn can't move sideways
  if (dx !== 0) {
    return false;
  }

  // Check for moving one or two squares forward (depending on whether it's the pawn's first move)
  if (isWhite) {
    const oneSpaceOk = from.row - 1 === to.row && !board[to.row][from.col];
    const twoSpacesOk = from.row === 6 && to.row === 4 && !board[5][from.col];
    if (oneSpaceOk || twoSpacesOk) {
      return true;
    }
  }

  // Black pawn
  const oneSpaceOk = from.row + 1 === to.row && !board[to.row][from.col];
  const twoSpacesOk = from.row === 1 && to.row === 3 && !board[2][from.col];
  if (oneSpaceOk || twoSpacesOk) {
    return true;
  }

  return false;
}

function isValidEnPassantMove(
  board: Chessboard,
  { from, to }: Move,
  previousMove: Move
): boolean {
  const piece = board[from.row][from.col];
  const isWhite = piece === WHITE_PAWN;
  const isBlack = piece === BLACK_PAWN;

  // Only one row where you can en passant
  if (isWhite && to.row !== 5) {
    return false;
  }
  if (isBlack && to.row !== 2) {
    return false;
  }

  const { from: prevFrom, to: prevTo } = previousMove;
  const prevPiece = board[prevTo.row][prevTo.col];

  if (isWhite) {
    if (prevPiece !== BLACK_PAWN) {
      return false;
    }
    if (prevFrom.col !== to.col || prevFrom.row !== 6 || prevTo.row !== 4) {
      return false;
    }
  } else {
    // isBlack
    if (prevPiece !== WHITE_PAWN) {
      return false;
    }
    if (prevFrom.col !== to.col || prevFrom.row !== 1 || prevTo.row !== 3) {
      return false;
    }
  }

  // Destination must be empty (instead of having enemy piece like most captures)
  // We don't need to explicitly check for this -- if prev pawn move valid

  return true;
}
