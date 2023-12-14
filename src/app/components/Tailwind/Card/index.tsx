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

  const styles = {
    background: bgImg ? `center / cover no-repeat url("${bgImg}")` : "",
  };

  useEffect(() => {
    setCardOptions(Object.values(optionProps).join(" "));
  }, [optionProps]);

  return (
    <div
      className={`container-card rounded-2xl w-full h-full ${cardOptions}`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Card;
