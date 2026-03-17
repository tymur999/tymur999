import {Target} from "motion";

export type AnimateTemplate = {
  initial: Target,
  animate: Target,
};

export function AnimateDirection(dir: "top" | "left" | "right" | "bottom", top: string | number = 0) : AnimateTemplate {
  const animation: Required<AnimateTemplate> = { animate: {}, initial: {} };
  animation.animate[dir] = top;
  animation.initial[dir] = "-100%";

  return animation;
}

export function AnimateFade() : AnimateTemplate {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
}

export function AnimateSpin() : Pick<AnimateTemplate, "animate"> {
  return {
    animate : { rotate: 360 },
  };
}