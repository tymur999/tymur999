import {useArticle} from "./ArticleContext";
import {animate, motion} from "framer-motion";
import {useEffect} from "react";
import {AnimateFade, AnimateTemplate} from "../animations";
import "./reader.sass";
import {ExternalLink} from "../router/Link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";

const READER : AnimateTemplate = AnimateFade();

export function Reader() {
  const [post, setPost] = useArticle();

  useEffect(() => {
    function pressEscape(e: KeyboardEvent) {
      e.key === "Escape" && handleClose();
    }

    document.addEventListener("keydown", pressEscape);
    return () => document.removeEventListener("keydown", pressEscape);
  }, []);

  function handleClose() {
    Promise.all([
        animate(".reader", READER.initial)
      ]
    ).then(() => setPost(undefined));
  }

  return post ? (
    <motion.section
      key="reader"
      initial={READER.initial}
      animate={READER.animate}
      onClick={handleClose}
      className="reader link">
        <article onClick={e => e.stopPropagation()}>
          <button onClick={handleClose} className="link reader-close">
            <FontAwesomeIcon icon={faClose} />
          </button>
          <post.article components={{
           'a': ExternalLink
          }}/>
        </article>
    </motion.section>
  ) : <></>;
}