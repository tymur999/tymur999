import "./menu.scss";
import {motion, animate} from "framer-motion";
import {useEffect} from "react";

const articles = [
  "Test 123",
  "Hello",
  "Title of Album"
];
const hidden = -999;

export function Menu({active} : {active: boolean}) {
  useEffect(() => {
    if(active) {
      animate(".menu", {left : 0})
    } else {
      animate(".menu", {left : hidden})
    }
  }, [active]);

  return (
    <motion.section initial={{left: hidden}} className="menu">
      {
        articles.map(title => <div>
          {title}
        </div>)
      }
    </motion.section>
  )
}