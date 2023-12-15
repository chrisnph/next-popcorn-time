"use client";

import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const BackToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const posY = window.scrollY;

    const element = document.getElementById("back-to-top");

    if (element) {
      element.style.display = posY >= 100 ? "block" : "none";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      id="back-to-top"
      className="hidden fixed bottom-10 right-10 text-white text-[3rem] font-bold"
      onClick={handleScrollToTop}
    >
      <FontAwesomeIcon icon={faArrowCircleUp} />
    </button>
  );
};

export default BackToTop;
