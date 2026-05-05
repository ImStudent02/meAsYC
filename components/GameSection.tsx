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
    <section id="games" className="py-24 md:py-32 px-6 relative border-t overflow-hidden" style={{ background: "color-mix(in srgb, var(--theme-surface) 92%, transparent)", borderColor: "color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)" }}>
      {/* Background element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:block" style={{ background: "color-mix(in srgb, var(--theme-surface-container-low) 50%, transparent)", borderRight: "1px solid color-mix(in srgb, var(--theme-outline-variant) 30%, transparent)" }}></div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Gamepad2 size={40} style={{ color: "var(--theme-primary)" }} />
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight uppercase" style={{ color: "var(--theme-on-background)" }}>{title}</h2>
          </div>
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--theme-on-surface-variant)" }}>
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
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-300"
                  style={{
                    background: activeGame === game.id ? "color-mix(in srgb, var(--theme-primary) 10%, transparent)" : "transparent",
                    color: activeGame === game.id ? "var(--theme-primary)" : "var(--theme-on-surface-variant)",
                    border: `1px solid ${activeGame === game.id ? "var(--theme-primary)" : "var(--theme-outline-variant)"}`,
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
          <div className="glass-card p-8 md:p-12 rounded-3xl flex flex-col items-center border" style={{ borderColor: "var(--theme-outline-variant)", background: "color-mix(in srgb, var(--theme-surface-container) 50%, transparent)" }}>
            {currentGame && (
              <>
                <h3
                  className="text-2xl font-bold mb-3 uppercase tracking-wide"
                  style={{ color: "var(--theme-on-surface)" }}
                >
                  {currentGame.title}
                </h3>
                <p
                  className="text-base mb-8 font-light"
                  style={{ color: "var(--theme-on-surface-variant)" }}
                >
                  {currentGame.description}
                </p>
                <div className="w-full">
                  {currentGame.component}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
