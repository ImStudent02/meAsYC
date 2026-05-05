// Game Section - Pluggable game container
// Architecture: each game is registered in the GAMES array below
// To add a new game: 1) create component in /games/, 2) add entry to GAMES array
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gamepad2, Grid3X3 } from "lucide-react";
import TicTacToe from "./games/TicTacToe";

// =====================================================
// GAME REGISTRY - Add new games here!
// Each game needs: id, title, description, icon, component
// =====================================================
const GAMES = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    description: "Classic X vs O - challenge yourself!",
    icon: <Grid3X3 size={20} />,
    component: <TicTacToe />,
  },
  // --- ADD MORE GAMES HERE ---
  // {
  //   id: "sudoku",
  //   title: "Sudoku",
  //   description: "Fill the grid with numbers 1-9",
  //   icon: <Hash size={20} />,
  //   component: <Sudoku />,
  // },
];

interface GameSectionProps {
  title: string;
  subtitle: string;
}

export default function GameSection({ title, subtitle }: GameSectionProps) {
  const [activeGame, setActiveGame] = useState(GAMES[0]?.id || "");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentGame = GAMES.find((g) => g.id === activeGame);

  return (
    <section id="games" className="relative" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 size={32} style={{ color: "var(--accent-primary)" }} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">{title}</h2>
          </div>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Game selector tabs - only show if multiple games */}
          {GAMES.length > 1 && (
            <div className="flex gap-3 justify-center mb-8 flex-wrap">
              {GAMES.map((game) => (
                <motion.button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300"
                  style={{
                    background: activeGame === game.id ? "var(--accent-glow)" : "var(--bg-glass)",
                    color: activeGame === game.id ? "var(--accent-primary)" : "var(--text-secondary)",
                    border: `1px solid ${activeGame === game.id ? "var(--accent-primary)" : "var(--border-glass)"}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {game.icon}
                  {game.title}
                </motion.button>
              ))}
            </div>
          )}

          {/* Active game container */}
          <div className="glass-card p-8 flex flex-col items-center">
            {currentGame && (
              <>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentGame.title}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {currentGame.description}
                </p>
                {currentGame.component}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
