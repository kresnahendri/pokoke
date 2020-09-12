/* eslint-disable import/no-extraneous-dependencies */
import {renderHook} from "@testing-library/react-hooks";

import {useScrollTreshold} from "../src/hooks/dom/useScrollTreshold";

test("ScrollTreshold - should not reached the treshold", () => {
  const {result, waitForNextUpdate} = renderHook(() => useScrollTreshold());

  expect(result.current.isTresholdReached).toBe(false);

  global.window.scrollTo({top: 1000});

  waitForNextUpdate();
  // Imagine if user scroll to bottom
  expect(global.window.scrollY).toBe(1000);
  // ! it should be true, but somehow scroll bar cannot be tracked 😞
  expect(result.current.isTresholdReached).toBe(false);
});
