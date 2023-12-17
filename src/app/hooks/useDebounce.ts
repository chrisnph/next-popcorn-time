import { useState, useEffect } from "react";

export const useDebounce = ({ delay }: { delay: number }) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
