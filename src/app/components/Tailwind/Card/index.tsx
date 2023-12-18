"use client";

import { ReactNode, useEffect, useState } from "react";

const Card = ({
  children,
  bgColor,
  bgImg,
  largeShadow,
  heightAuto,
  padding,
}: {
  bgColor?: string;
  bgImg?: string;
  largeShadow?: boolean;
  heightAuto?: boolean;
  padding?: string;
  children?: ReactNode;
}) => {
  const [optionProps] = useState(() => {
    return {
      bgColor: bgColor || "bg-transparent",
      bgImg: bgImg || "",
      largeShadow: largeShadow ? "shadow-lg" : "shadow-md",
      heightAuto: heightAuto ? "h-fit" : "min-h-[158px]",
      padding: padding || "p-3",
    };
  });

  const [cardOptions, setCardOptions] = useState<string | undefined>();

  useEffect(() => {
    setCardOptions(Object.values(optionProps).join(" "));
  }, [optionProps]);

  return (
    <div
      className={`container-card relative rounded-2xl w-full h-full ${cardOptions}`}
    >
      <div className="flex justify-center items-center w-full h-full">
        <img
          className="w-[30px] h-[30px]"
          alt="loading"
          src="/loading-spinner-white-thin.gif"
        />
      </div>
      {children}
      {bgImg && (
        <img
          className="absolute object-fill w-full h-full rounded-2xl top-0 left-0"
          alt="Movie Card"
          src={bgImg}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-movie.jpg";
          }}
        />
      )}
    </div>
  );
};

export default Card;
