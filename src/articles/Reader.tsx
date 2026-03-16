import {useArticle} from "./ArticleContext";
import {motion} from "framer-motion";
import {useAnimate, animate as animateClass} from "motion/react";
import {TargetAndTransition} from "motion";
import {useEffect} from "react";

type Transition = "open" | "closed";
const READER : Record<Transition, TargetAndTransition> = {
  closed : { opacity: 0 },
  open : { opacity: 1 }
};
const ARTICLE : Record<Transition, TargetAndTransition> = {
  closed : { top: "-100%" },
  open : { top: "50%" }
};


export function Reader() {
  const [ scope, animate ] = useAnimate<HTMLElement>();
  const [post, setPost] = useArticle();

  useEffect(() => {
    if(post && scope.current) {
      animate(scope.current, READER.open);
      animateClass(".read-box", ARTICLE.open);
    }
  }, [post, scope]);

  useEffect(() => {
    function pressEscape(e: KeyboardEvent) {
      e.key === "Escape" && handleClose();
    }

    document.addEventListener("keydown", pressEscape);
    return () => document.removeEventListener("keydown", pressEscape);
  }, []);

  function handleClose() {
    Promise.all([
      animate(scope.current, READER.closed),
      animateClass(".read-box", ARTICLE.closed)
    ]).then(() => setPost(undefined));
  }


  return post ? (
    <motion.article
      key="reader"
      ref={scope}
      initial={READER.closed}
      animate={READER.open}
      onClick={handleClose}
      className="reader link">
        <motion.section className="read-box" initial={{top: "-100%"}} animate={{top: "50%"}} onClick={e => e.stopPropagation()}>
          <post.article/>
        </motion.section>
    </motion.article>
  ) : <></>;
}