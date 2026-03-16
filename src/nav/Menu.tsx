import "./menu.sass";
import {animate, motion} from "framer-motion";
import {useEffect} from "react";
import {ARTICLES, useArticle} from "../articles/ArticleContext";


const hidden = -999;

export function Menu({active} : {active: boolean}) {
  const [, setReading] = useArticle();
  useEffect(() => {
    if(active) {
      animate(".menu", {left : 0})
    } else {
      animate(".menu", {left : hidden})
    }
  }, [active]);

  return (
    <motion.section initial={{left: hidden}} className="menu">
      <ul>
        {
          ARTICLES.map((article) =>
            <li key={article.name}>
              <button className="link" onClick={() => setReading(article)} >
                {article.name}
              </button>
            </li>
          )
        }
      </ul>

    </motion.section>
  )
}