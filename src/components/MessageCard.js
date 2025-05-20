import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// In the MessageCard.js file, update the CardContainer styled component:

const CardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 35px;
  max-width: 550px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3),
    0 0 20px rgba(255, 182, 193, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  margin-bottom: ${(props) => (props.marginBottom ? "30px" : "0")};
  z-index: 10;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right,rgb(73, 71, 197),rgb(53, 65, 158),rgb(107, 71, 197));
    animation: shimmer 3s infinite linear;
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(255, 182, 193, 0.8) 0%,
      rgba(255, 182, 193, 0) 70%
    );
    border-radius: 50%;
    opacity: 0.6;
    filter: blur(10px);
  }
`;

const MessageWrapper = styled(motion.div)`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 25px;
  font-family: "Comic Sans MS", "Bubblegum Sans", "Indie Flower", cursive;
  text-align: center;
  position: relative;

  &:first-letter {
    font-size: 1.8rem;
    font-weight: bold;
    color:rgb(65, 107, 223);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 105, 180, 0.5),
      transparent
    );
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg,rgb(50, 93, 181),rgb(63, 116, 170));
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

const HeartIcon = styled(motion.span)`
  display: inline-block;
  margin-left: 10px;
  font-size: 1.2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 105, 180, 0.2);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(to right,rgb(37, 98, 172),rgb(64, 109, 186));
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  opacity: 0;
  user-select: none;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CustomHeart = ({ color }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 28C16 28 3 20.5 3 11.5C3 7.5 6 4.5 10 4.5C12.5 4.5 14.5 5.5 16 7.5C17.5 5.5 19.5 4.5 22 4.5C26 4.5 29 7.5 29 11.5C29 20.5 16 28 16 28Z"
      fill={color}
      stroke="white"
      strokeWidth="1"
    />
  </svg>
);

const messages = [
  "Chúc mừng sinh nhật e trai , quà sinh nhật muộn và chúc e trai qua tuổi mới phải trưởng thành hơn và biết nghe lời ba mẹ và phải ở nhà trông e giúp e chứ ko phải đi chơi lang thang mô",
];

// Then update the MessageCard component to accept and pass the prop:

const FullscreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeartRow = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

const FinalMessage = styled(motion.div)`
  font-size: 4rem;
  color: white;
  font-family: "Pacifico", cursive;
  text-shadow:"0 0 20px rgb(63, 130, 206), 0 0 30px rgb(26, 60, 153)",

  z-index: 1001;
  position: absolute;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 30px 50px;
  border-radius: 20px;
  box-shadow: 0 0 50px rgb(38, 157, 193);;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    font-size: 3rem;
    padding: 20px 30px;
  }
`;

const MessageDecoration = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`;

// Thêm component bánh kem sinh nhật
const BirthdayCake = () => {
  return (
    <motion.div
      className="relative w-64 h-64 mx-auto mt-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1, type: "spring" }}
    >
      {/* Plate */}
      <motion.div
        className="absolute bottom-0 w-64 h-10 bg-gray-200 rounded-full"
        style={{
          background: "linear-gradient(to right, #e0e0e0, #ffffff, #e0e0e0)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />

      {/* Cake Base */}
      <motion.div
        className="absolute bottom-10 w-48 h-32 mx-8 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom, #ff9aaf, #ff748c)",
          boxShadow: "0 4px 15px rgba(255,105,180,0.5)",
        }}
      />

      {/* Cake Middle Layer */}
      <motion.div
        className="absolute bottom-28 w-40 h-20 mx-12 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom, #ffb6c1, #ff9aaf)",
          boxShadow: "0 4px 10px rgba(255,105,180,0.3)",
        }}
      />

      {/* Cake Top Layer */}
      <motion.div
        className="absolute bottom-40 w-32 h-16 mx-16 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom, #ffd1dc, #ffb6c1)",
          boxShadow: "0 4px 10px rgba(255,105,180,0.3)",
        }}
      />

      {/* Frosting */}
      <div className="absolute bottom-56 w-32 mx-16">
        <div className="flex justify-between">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-6 rounded-full bg-white"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              style={{ filter: "drop-shadow(0 2px 3px rgba(255,105,180,0.3))" }}
            />
          ))}
        </div>
      </div>

      {/* Candles */}
      <div className="absolute bottom-56 w-24 mx-20">
        <div className="flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative">
              <motion.div
                className="w-2 h-14 mx-auto"
                style={{
                  background: "linear-gradient(to bottom, #ffec99, #ffda77)",
                }}
                initial={{ height: 0 }}
                animate={{ height: 14 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              />
              <motion.div
                className="absolute -top-4 left-0 w-2 h-4"
                style={{
                  background: "linear-gradient(to bottom, #ff5e62, #ff9966)",
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
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.8, 1.2, 0.8],
                    y: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: i % 2 === 0 ? "#ff69b4" : "#ffb6c1",
            left: `${Math.random() * 60 + 20}%`,
            top: `${Math.random() * 60 + 20}%`,
            boxShadow: "0 0 5px rgba(255,105,180,0.5)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* Birthday Text on Cake */}
      <motion.div
        className="absolute bottom-20 w-full text-center text-white font-bold text-lg"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        Happy Birthday!
      </motion.div>
    </motion.div>
  );
};

// Thêm component mới cho các hiệu ứng bánh sinh nhật bổ sung
const BirthdayCakeEffects = styled(motion.div)`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
`;

const MessageCard = ({ marginBottom }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [showFinalEffect, setShowFinalEffect] = useState(false);

  const nextMessage = () => {
    // If we're on the last message and click "Finish"
    if (currentMessage === messages.length - 1) {
      setShowFinalEffect(true);
      return;
    }

    // Create floating hearts effect when button is clicked
    const heartColors = ["#ff69b4", "#ffb6c1", "#ff1493", "#db7093", "#ffc0cb"];
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // Random position
      y: Math.random() * 30 + 60,
      size: Math.random() * 20 + 15,
      rotation: Math.random() * 30 - 15,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    // Remove hearts after animation
    setTimeout(() => {
      setFloatingHearts((prev) =>
        prev.filter((heart) => !newHearts.includes(heart))
      );
    }, 2000);

    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  // Calculate progress percentage
  const progress = ((currentMessage + 1) / messages.length) * 100;

  // Generate heart rows for the final effect
  const heartRows = Array.from({ length: 15 }).map((_, rowIndex) => {
    return (
      <HeartRow
        key={rowIndex}
        initial={{ x: rowIndex % 2 === 0 ? -1000 : 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: rowIndex * 0.1,
          ease: "easeOut",
        }}
      >
        {Array.from({ length: 10 }).map((_, colIndex) => {
          const heartColors = [
            "#ff69b4",
            "#ffb6c1",
            "#ff1493",
            "#db7093",
            "#ffc0cb",
          ];
          const color =
            heartColors[Math.floor(Math.random() * heartColors.length)];
          const size = Math.random() * 15 + 25;

          return (
            <div key={colIndex} style={{ width: size, height: size }}>
              <CustomHeart color={color} />
            </div>
          );
        })}
      </HeartRow>
    );
  });

  return (
    <>
      <CardContainer
        marginBottom={marginBottom}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <MessageWrapper
            key={currentMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Message
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.2,
                  staggerChildren: 0.1,
                },
              }}
            >
              {messages[currentMessage]}
            </Message>
          </MessageWrapper>
        </AnimatePresence>

        <ButtonContainer>
          <Button
            onClick={nextMessage}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 6px 20px rgba(255, 105, 180, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {currentMessage === messages.length - 1 ? "Finish" : "Next Message"}
            <HeartIcon
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <CustomHeart color="#fff" />
            </HeartIcon>
          </Button>
        </ButtonContainer>

        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>

        {floatingHearts.map((heart) => (
          <FloatingHeart
            key={heart.id}
            size={heart.size}
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            initial={{ opacity: 0, y: 0, rotate: heart.rotation }}
            animate={{
              opacity: [0, 1, 0],
              y: -100,
              rotate: heart.rotation,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <CustomHeart color={heart.color || "#ff69b4"} />
          </FloatingHeart>
        ))}
      </CardContainer>

      {showFinalEffect && (
        <FullscreenOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {heartRows}

          <MessageDecoration></MessageDecoration>

          <FinalMessage
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgb(63, 130, 206), 0 0 30px rgb(26, 60, 153)",
                  "0 0 40px rgb(63, 130, 206), 0 0 60px rgb(26, 60, 153)",
                  "0 0 20px rgb(63, 130, 206), 0 0 30px rgb(26, 60, 153)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Happy birthday
            </motion.div>
          </FinalMessage>

          {/* Thêm bánh kem sinh nhật */}
          {/* <BirthdayCakeEffects>
            <BirthdayCake />
          </BirthdayCakeEffects> */}
        </FullscreenOverlay>
      )}
    </>
  );
};

export default MessageCard;
