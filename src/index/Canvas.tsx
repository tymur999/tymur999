import {motion} from "framer-motion";
import "./canvas.scss";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import React, {useMemo, useRef} from "react";
import {Mesh, Vector3} from "three";
import {Moon} from "./Moon";

type Coordinate = [number, number, number];
export default function Canvas() {

  return (
    <main>
        <ThreeCanvas gl={{antialias: true, alpha: true}} >
          <Sphere/>
          <Frame/>
          <Moon radius={8} color="pink" step={0.01}/>
          <Moon radius={6} color="grey" step={0.02}/>
          <Moon radius={4} color="green" step={0.03}/>
          <Stars/>
          <directionalLight color="#E3A857" args={[1,10]} position={[100,10,100]} />
        </ThreeCanvas>
      <motion.h1 className="welcome" animate={{ rotate: 360 }}>
        Welcome to my blog
      </motion.h1>
    </main>
  )
}

function Frame() {
  useFrame(state => {
    const { x, y } = state.pointer

    // Smoothly interpolate the camera position
    // We multiply by a factor (e.g., 5) to increase the range of movement
    state.camera.position.lerp(new Vector3(x * 10, y * 10, 5), 0.1)

    // Always keep the camera looking at the center
    state.camera.lookAt(0, 0, 0)
  })

  return <></>
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