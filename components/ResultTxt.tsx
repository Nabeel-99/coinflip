import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Knewave } from "next/font/google";
const knewave = Knewave({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-knewave",
  display: "swap",
});

interface ResultTxtProps {
  result: string;
}
const ResultTxt = ({ result }: ResultTxtProps) => {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.6,
          }}
          className={`absolute top-1/3 ${
            result === "Heads" ? " left-4 xl:left-20" : "right-4 xl:right-20"
          }`}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className={`max-sm:text-4xl text-5xl xl:text-9xl ${knewave.className}`}
          >
            {result}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultTxt;
