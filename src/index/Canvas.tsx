import "./canvas.sass";
import {motion} from "framer-motion";
import {Canvas as ThreeCanvas} from "@react-three/fiber";
import {Moon} from "./Moon";
import {AnimateSpin} from "../animations";
import {Environment, OrbitControls, useTexture} from "@react-three/drei";
import Jupiter from "../img/2k_jupiter.jpg";
import Makemake from "../img/2k_makemake_fictional.jpg";
import Ceres from "../img/2k_ceres_fictional.jpg";
import Haumea from "../img/2k_haumea_fictional.jpg";
import MilkyWay from "../img/2k_stars_milky_way.jpg";

export default function Canvas() {

  return (
    <main className="canvas">
      <section className="canvas-ctr">
        <ThreeCanvas shadows>
          <OrbitControls enableZoom={false} />
          <Environment background files={MilkyWay}/>
          <Moons/>
          <Planet/>
          <directionalLight color="#E3A857" args={[1,10]} position={[100,10,100]} />
        </ThreeCanvas>
      </section>
      <motion.h1 className="welcome" animate={AnimateSpin().animate}>
        Welcome to my blog
      </motion.h1>
      <h3 className="tooltip">
        Drag to orbit
      </h3>
    </main>
  )
}

function Moons() {
  const makemake = useTexture(Makemake);
  const haumea = useTexture(Haumea);
  const ceres = useTexture(Ceres);

  return <>
    <Moon radius={8} color="pink" map={makemake} step={0.01}/>
    <Moon radius={6} color="grey" map={haumea} step={0.02}/>
    <Moon radius={4} color="green" map={ceres} step={0.03}/>
  </>
}

function Planet() {
  const colorMap = useTexture(Jupiter);

  return <mesh position={[0,0,0]}>
    <sphereGeometry />
    <meshPhysicalMaterial map={colorMap} color="orange" iridescence={1} />
  </mesh>
}