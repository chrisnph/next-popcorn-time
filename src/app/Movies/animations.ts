export const cardAnimation = {
  initial: "offscreen",
  whileInView: "onscreen",
  viewport: { once: true, amount: 0.3 },

  variants: {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      y: [200, 0],
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  },

  whileHover: {
    scale: 1.05,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 1,
    },
  },
};

export const delayedFadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.5 },
};
