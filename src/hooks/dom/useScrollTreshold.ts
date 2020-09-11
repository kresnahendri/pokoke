import {useEffect, useState} from "react";
import {Platform} from "react-native";

export const useScrollTreshold = (treshold = 0) => {
  const [isTresholdReached, setIsTresholdReached] = useState(false);
  const handleScroll = () => {
    const {offsetHeight, clientHeight, scrollHeight} = document.documentElement;
    const {innerHeight, pageYOffset} = window;
    const {body} = document;
    const windowHeight = "innerHeight" in window ? innerHeight : offsetHeight;
    const windowBottom = windowHeight + pageYOffset;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      clientHeight,
      scrollHeight,
      offsetHeight,
    );
    setIsTresholdReached(windowBottom + treshold >= docHeight);
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return {isTresholdReached, reset: () => setIsTresholdReached(false)};
};
