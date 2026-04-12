import "./canvas.sass";
import {motion} from "framer-motion";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import {Moon} from "./Moon";
import {BakeShadows, Environment, Html, OrbitControls, Preload, useTexture} from "@react-three/drei";
import Jupiter from "../img/2k_jupiter.webp";
import Makemake from "../img/2k_makemake_fictional.webp";
import Ceres from "../img/2k_ceres_fictional.webp";
import Haumea from "../img/2k_haumea_fictional.webp";
import MilkyWay from "../img/2k_stars_milky_way.jpg";
import SaturnRings from "../img/12k_jupiter_rings.webp";
import {useRef} from "react";
import type {Mesh} from "three";
import * as THREE from "three";

useTexture.preload([Jupiter, Makemake, Ceres, Haumea, MilkyWay, SaturnRings]);

export default function Canvas() {
  // fade animation sync with loading
  return (
    <motion.main className="canvas">
      <section className="canvas-ctr">
        <ThreeCanvas camera={{position: [0,0,10]}} shadows dpr={[1, 2]}>
          <OrbitControls enablePan={false} enableZoom={false} />
          <BakeShadows/>
          <Environment background files={MilkyWay}/>
          <Moons/>
          <Planet/>
          <Rings/>
          <Html center transform position={[0,0,2]}>
            <h1 className="welcome">
              Welcome to my blog
            </h1>
          </Html>
          <ambientLight args={[1,1]} />
          <directionalLight color="#E3A857" args={[1,10]} position={[100,10,100]} />
          <Preload all />
        </ThreeCanvas>
      </section>
      <h3 className="tooltip">
        Drag to orbit
      </h3>
    </motion.main>
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

function Rings() {
  const map = useTexture(SaturnRings);
  
  // To avoid seeing the backside as invisible, use DoubleSide.
  // We should also use a RingGeometry rather than a CircleGeometry so it is empty in the center.
  return <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[1.2, 1.7, 64]} />
    <meshPhysicalMaterial map={map}  transparent={true} side={THREE.DoubleSide} iridescence={1}/>
  </mesh>
}

function Planet() {
  const colorMap = useTexture(Jupiter);
  const planetRef = useRef<Mesh>(null);

  // add planet spin
  useFrame(() => {
    if(!planetRef.current) return;

    planetRef.current.rotation.y += 0.005;
  });

  return <mesh ref={planetRef} position={[0,0,0]}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshPhysicalMaterial map={colorMap} color="orange" iridescence={1} />
  </mesh>
}