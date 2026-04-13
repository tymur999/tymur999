import {animate, motion} from "framer-motion";
import {useEffect} from "react";
import {AnimateFade, AnimateTemplate} from "../animations";
import "./reader.sass";
import {ExternalLink} from "../router/Link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";
import {Article} from "./articles";

const READER : AnimateTemplate = AnimateFade();

export function Reader({post, setPost}: {post: Article | null, setPost: (_: Article | null) => void}) {

  useEffect(() => {
    function pressEscape(e: KeyboardEvent) {
      e.key === "Escape" && handleClose();
    }

    document.addEventListener("keydown", pressEscape);
    return () => document.removeEventListener("keydown", pressEscape);
  }, []);

  function handleClose() {
    animate(".reader", READER.initial)
      .then(() => setPost(null));
  }

  return post ? (
    <motion.section
      initial={READER.initial}
      animate={READER.animate}
      onClick={handleClose}
      className="reader link">
        <article onClick={e => e.stopPropagation()}>
          <button onClick={handleClose} className="link reader-close">
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className="content">
            <post.article components={{
              'a': ExternalLink
            }}/>
          </div>
        </article>
    </motion.section>
  ) : <></>;
}