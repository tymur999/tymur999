import {Article} from "./articles";
import {motion} from "framer-motion";
import {useAnimate} from "motion/react";
import {TargetAndTransition} from "motion";
import {useEffect} from "react";

type Transition = "open" | "closed";
const READER : Record<Transition, TargetAndTransition> = {
  closed : { opacity: 0 },
  open : { opacity: 1 }
};

type Props = { post: Article | null, setPost: (_: Article | null) => void };
export function Reader({ post, setPost }: Props) {
  const [ scope, animate ]= useAnimate<HTMLElement>();

  useEffect(() => {
    if(post && scope.current) {
      animate(scope.current, READER.open);
    }
  }, [post, scope]);

  function handleClose() {
    animate(scope.current, READER.closed)
      .then(() => setPost(null));
  }

  return post ? (
    <motion.article
      key="reader"
      ref={scope}
      initial={READER.closed}
      animate={READER.open}
      onClick={handleClose}
      className="reader link">
        <section onClick={e => e.stopPropagation()}>
          <post.article/>
        </section>
    </motion.article>
  ) : <></>;
}