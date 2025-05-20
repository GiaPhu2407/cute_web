import React from "react";
import { motion } from "framer-motion";

const BoyBirthdayCake = () => {
  // Màu sắc phù hợp cho bé trai: xanh dương, xanh lá, cam và vàng
  const boyColors = {
    blue: ["#1e88e5", "#64b5f6", "#bbdefb"],
    green: ["#43a047", "#81c784", "#c8e6c9"],
    orange: ["#fb8c00", "#ffb74d", "#ffe0b2"],
    yellow: ["#fdd835", "#fff176", "#fff9c4"],
  };

  // Random color themes for decorations
  const getRandomColor = () => {
    const themes = [
      boyColors.blue,
      boyColors.green,
      boyColors.orange,
      boyColors.yellow,
    ];
    return themes[Math.floor(Math.random() * themes.length)][
      Math.floor(Math.random() * 3)
    ];
  };

  // Flame animation for candles
  const flameAnimation = {
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.7, 1, 0.7],
      y: [-1, 1, -1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };

  return (
    <motion.div
      className="relative w-64 h-80 mx-auto"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1, type: "spring" }}
    >
      {/* Plate */}
      <motion.div
        className="absolute bottom-0 w-64 h-10 rounded-full"
        style={{
          background: "linear-gradient(to right, #e0e0e0, #ffffff, #e0e0e0)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />

      {/* Cake Base - Blue */}
      <motion.div
        className="absolute bottom-10 w-48 h-32 mx-8 rounded-2xl"
        style={{
          background: `linear-gradient(to bottom, ${boyColors.blue[1]}, ${boyColors.blue[0]})`,
          boxShadow: "0 4px 15px rgba(30,136,229,0.5)",
        }}
      />

      {/* Cake Middle Layer - Green */}
      <motion.div
        className="absolute bottom-28 w-40 h-20 mx-12 rounded-2xl"
        style={{
          background: `linear-gradient(to bottom, ${boyColors.green[1]}, ${boyColors.green[0]})`,
          boxShadow: "0 4px 10px rgba(67,160,71,0.3)",
        }}
      />

      {/* Cake Top Layer - Orange */}
      <motion.div
        className="absolute bottom-40 w-32 h-16 mx-16 rounded-2xl"
        style={{
          background: `linear-gradient(to bottom, ${boyColors.orange[1]}, ${boyColors.orange[0]})`,
          boxShadow: "0 4px 10px rgba(251,140,0,0.3)",
        }}
      />

      {/* Stars and geometric decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-4 h-4"
          style={{
            background: getRandomColor(),
            clipPath:
              i % 2 === 0
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                : "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            left: `${Math.random() * 60 + 20}%`,
            top: `${Math.random() * 50 + 30}%`,
            boxShadow: "0 0 5px rgba(255,255,255,0.5)",
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 1.5 + i * 0.1, duration: 0.6 }}
        />
      ))}

      {/* Sports balls, cars or robots as decorations */}
      {[...Array(3)].map((_, i) => {
        // Choose decoration type randomly
        const decorType = ["ball", "car", "robot"][i % 3];
        let styling;

        if (decorType === "ball") {
          styling = {
            borderRadius: "50%",
            background: boyColors.orange[0],
            border: "2px solid white",
          };
        } else if (decorType === "car") {
          styling = {
            borderRadius: "4px",
            background: boyColors.blue[0],
            clipPath:
              "polygon(0% 20%, 15% 20%, 30% 0%, 70% 0%, 85% 20%, 100% 20%, 100% 70%, 0% 70%)",
          };
        } else {
          styling = {
            background: boyColors.green[0],
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          };
        }

        return (
          <motion.div
            key={`decor-${i}`}
            className="absolute w-6 h-6"
            style={{
              ...styling,
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 + i * 0.2, duration: 0.5 }}
          />
        );
      })}

      {/* Frosting - alternating colors */}
      <div className="absolute bottom-56 w-32 mx-16">
        <div className="flex justify-between">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`frost-${i}`}
              className="w-4 h-6 rounded-full"
              style={{
                background:
                  i % 2 === 0 ? boyColors.yellow[1] : boyColors.blue[1],
                filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))",
              }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Candles */}
      <div className="absolute bottom-56 w-24 mx-20">
        <div className="flex justify-between">
          {[...Array(5)].map((_, i) => {
            // Alternate candle colors
            const candleColor = [
              boyColors.blue[1],
              boyColors.green[1],
              boyColors.orange[1],
              boyColors.blue[1],
              boyColors.green[1],
            ][i];

            return (
              <div key={`candle-${i}`} className="relative">
                <motion.div
                  className="w-2 h-14 mx-auto"
                  style={{ background: candleColor }}
                  initial={{ height: 0 }}
                  animate={{ height: 14 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                />
                <motion.div
                  className="absolute -top-4 left-0 w-2 h-4"
                  style={{
                    background: "linear-gradient(to bottom, #ffdd00, #ff9500)",
                    borderRadius: "50% 50% 0 0",
                    filter: "blur(2px)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + i * 0.1, duration: 0.3 }}
                >
                  <motion.div
                    className="absolute -top-2 left-0 w-2 h-6"
                    style={{
                      background: "radial-gradient(#ffec99, transparent 70%)",
                      filter: "blur(3px)",
                    }}
                    animate={flameAnimation.animate}
                    transition={flameAnimation.transition}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating hearts mix with stars */}
      {[...Array(5)].map((_, i) => {
        const isHeart = i % 2 === 0;
        return (
          <motion.div
            key={`float-${i}`}
            className={`absolute w-5 h-5`}
            style={{
              background: getRandomColor(),
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 40}%`,
              clipPath: isHeart
                ? 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")'
                : "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{
              scale: [0, 1, 1],
              y: [50, 0, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 2 + i * 0.3,
              duration: 3,
              times: [0, 0.3, 1],
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        );
      })}

      {/* Birthday Message */}
      <motion.div
        className="absolute -bottom-16 w-full text-center font-bold text-xl"
        style={{
          color: "#ffffff",
          textShadow: "0 1px 3px rgba(0,0,0,0.5),0 0 5px rgba(0,0,0,0.5)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        Happy Birthday!
      </motion.div>
    </motion.div>
  );
};

export default BoyBirthdayCake;
