// Tic-Tac-Toe Game - A polished, theme-aware mini game
// Pluggable into the GameSection component
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

// Check if there's a winner - returns winning symbol or null
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((sq) => sq !== null);

  // Handle cell click - place X or O
  const handleClick = (index: number) => {
    if (board[index] || winner) return; // already filled or game over
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Reset the board
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Status message
  const status = winner
    ? `🎉 ${winner} Wins!`
    : isDraw
    ? "🤝 It's a Draw!"
    : `${isXNext ? "X" : "O"}'s Turn`;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status */}
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        {status}
      </motion.div>

      {/* Board - 3x3 grid */}
      <div
        className="grid grid-cols-3 gap-2 p-3 rounded-2xl"
        style={{ background: "var(--bg-glass)", border: "1px solid var(--border-glass)" }}
      >
        {board.map((cell, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 rounded-xl text-2xl font-black flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{
              background: cell ? "var(--accent-glow)" : "var(--bg-card)",
              border: "1px solid var(--border-glass)",
              color: cell === "X" ? "var(--accent-primary)" : "var(--accent-secondary)",
            }}
            whileHover={{ scale: cell ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {cell && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {cell}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Reset button */}
      <motion.button
        onClick={resetGame}
        className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300"
        style={{
          background: "var(--bg-glass)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-glass)",
        }}
        whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw size={16} />
        Reset
      </motion.button>
    </div>
  );
}
