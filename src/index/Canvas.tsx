import "./canvas.sass";
import {motion} from "framer-motion";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import {Moon} from "./Moon";
import {Environment, Html, OrbitControls, Preload, useTexture} from "@react-three/drei";
import Jupiter from "../img/2k_jupiter.webp";
import Makemake from "../img/2k_makemake_fictional.webp";
import Ceres from "../img/2k_ceres_fictional.webp";
import Haumea from "../img/2k_haumea_fictional.webp";
import MilkyWay from "../img/2k_stars_milky_way.jpg";
import SaturnRings from "../img/12k_jupiter_rings.webp";
import {useRef} from "react";
import type {Mesh} from "three";
import {Bloom, EffectComposer, Vignette} from "@react-three/postprocessing";

useTexture.preload([Jupiter, Makemake, Ceres, Haumea, MilkyWay, SaturnRings]);

export default function Canvas() {
  // fade animation sync with loading
  return (
    <motion.main className="canvas">
      <section className="canvas-ctr">
        <ThreeCanvas camera={{position: [0,0,10]}} shadows dpr={[1, 2]}>
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          <OrbitControls enablePan={false} enableZoom={false} />
          <Environment background files={MilkyWay}/>
          <Sun/>
          <Moons/>
          <Planet/>
          <Html center transform position={[0,0,2]}>
            <h1 className="welcome">
              Welcome to my blog
            </h1>
          </Html>
          <Preload all />
        </ThreeCanvas>
      </section>
      <h3 className="tooltip">
        Drag to orbit
      </h3>
    </motion.main>
  )
}

export function Sun() {
  return (
    <mesh position={[-100, 0, -100]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial color={[10, 7, 3]} />
      <directionalLight intensity={2} position={[0, 0, 0]} />
    </mesh>
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
  const planetRef = useRef<Mesh>(null);

  // add planet spin
  useFrame(() => {
    if(!planetRef.current) return;

    planetRef.current.rotation.y += 0.005;
  });

  return <mesh castShadow ref={planetRef} position={[0,0,0]}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshPhysicalMaterial map={colorMap} color="orange" iridescence={1} />
  </mesh>
}