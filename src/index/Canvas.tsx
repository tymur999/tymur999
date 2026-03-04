import {motion} from "framer-motion";
import "./canvas.scss";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import {Mesh} from "three";
import {Moon} from "./Moon";

export default function Canvas() {
  return (
    <main>
        <ThreeCanvas camera={{position: [5,5,5]}} shadows="basic">
          <Sphere/>
          <Moon radius={8} color="pink" step={0.01}/>
          <Moon radius={6} color="grey" step={0.02}/>
          <Moon radius={4} color="green" step={0.03}/>
          <Stars/>
          <directionalLight color="#E3A857" args={[1,10]} position={[100,10,100]}  />
        </ThreeCanvas>
      <motion.h1 className="welcome" animate={{ rotate: 360 }}>
        Welcome to my blog
      </motion.h1>
    </main>
  )
}

function Sphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  });

  return (
    <mesh ref={meshRef} position={[0,0,0]}>
      <sphereGeometry />
      <meshPhysicalMaterial color="blue" iridescence={.5} />
    </mesh>
  )
}

const RADIUS = 20;
const COUNT = 100;
type Coordinate = [number, number, number];
function Stars() {
  const positions = useMemo(() => {
    const positions: Coordinate[] = [];
    for(let i = 0; i < COUNT; i++) {
      const u = Math.random();
      const v = Math.random();

      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      // x = r*sin(theta)*cos(phi)
      // x = r*sin(theta)*sin(phi)
      // z = r*cos(phi)
      positions.push([
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.sin(phi) * Math.sin(theta),
        RADIUS * Math.cos(phi),
      ])
    }
    return positions;
  }, []);

  return positions.map(coord => <mesh position={coord}>
      <sphereGeometry args={[.1]} />
      <meshBasicMaterial />
    </mesh>
  )
}