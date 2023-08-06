export const WHITE_KING = "♔";
export const WHITE_QUEEN = "♕";
export const WHITE_ROOK = "♖";
export const WHITE_BISHOP = "♗";
export const WHITE_KNIGHT = "♘";
export const WHITE_PAWN = "♙";

export const BLACK_KING = "♚";
export const BLACK_QUEEN = "♛";
export const BLACK_ROOK = "♜";
export const BLACK_BISHOP = "♝";
export const BLACK_KNIGHT = "♞";
export const BLACK_PAWN = "♟";

export type Empty = null;
export type Piece =
  | typeof WHITE_KING
  | typeof WHITE_QUEEN
  | typeof WHITE_ROOK
  | typeof WHITE_BISHOP
  | typeof WHITE_KNIGHT
  | typeof WHITE_PAWN
  | typeof BLACK_KING
  | typeof BLACK_QUEEN
  | typeof BLACK_ROOK
  | typeof BLACK_BISHOP
  | typeof BLACK_KNIGHT
  | typeof BLACK_PAWN;
export type PieceOrEmpty = Piece | Empty;
