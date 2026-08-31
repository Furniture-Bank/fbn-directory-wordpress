"use client";

import { useEffect } from "react";

const MESSAGE_TYPE = "fbn-directory:height";

function getParentOrigin() {
  try {
    const referrer = new URL(document.referrer);
    const isFurnitureBankSite =
      referrer.protocol === "https:" &&
      (referrer.hostname === "furniturebanks.org" ||
        referrer.hostname.endsWith(".furniturebanks.org"));

    return isFurnitureBankSite ? referrer.origin : "*";
  } catch {
    return "*";
  }
}

export default function FrameBridge() {
  useEffect(() => {
    if (window.parent === window) return;

    const parentOrigin = getParentOrigin();
    const main = document.querySelector("main");
    if (!main) return;

    let animationFrame = 0;

    const sendHeight = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const height = Math.ceil(
          Math.max(main.scrollHeight, main.getBoundingClientRect().height),
        );

        window.parent.postMessage(
          { type: MESSAGE_TYPE, height },
          parentOrigin,
        );
      });
    };

    const resizeObserver = new ResizeObserver(sendHeight);
    resizeObserver.observe(main);
    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);
    sendHeight();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
