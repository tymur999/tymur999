import {motion} from "framer-motion";
import "./canvas.scss";

export default function Canvas() {
  return (
    <main>
      <motion.h1 className="welcome" animate={{ rotate: 360 }}>
        Welcome to my blog
      </motion.h1>
      <canvas>

      </canvas>
    </main>
  )
}