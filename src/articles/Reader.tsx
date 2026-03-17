import {useArticle} from "./ArticleContext";
import {motion} from "framer-motion";
import {useAnimate, animate as animateClass} from "motion/react";
import {useEffect} from "react";
import {AnimateDirection, AnimateFade, AnimateTemplate} from "../animations";

const READER : AnimateTemplate = AnimateFade();
const ARTICLE : AnimateTemplate = AnimateDirection("top", "50%");


export function Reader() {
  const [ scope, animate ] = useAnimate<HTMLElement>();
  const [post, setPost] = useArticle();

  useEffect(() => {
    if(post && scope.current) {
      animate(scope.current, READER.animate);
      animateClass(".read-box", ARTICLE.animate!);
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
      animate(scope.current, READER.initial),
      animateClass(".read-box", ARTICLE.initial!)
    ]).then(() => setPost(undefined));
  }


  return post ? (
    <motion.article
      key="reader"
      ref={scope}
      initial={READER.initial}
      animate={READER.animate}
      onClick={handleClose}
      className="reader link">
        <motion.section className="read-box"  initial={{top: "-100%"}} animate={{top: "50%"}} onClick={e => e.stopPropagation()}>
          <post.article/>
        </motion.section>
    </motion.article>
  ) : <></>;
}