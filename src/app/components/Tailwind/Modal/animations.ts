export const dropIn = {
  hidden: {
    y: "100vh",
    height: "90vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.1,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
