import {motion} from "framer-motion";
import "./canvas.scss";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {Mesh} from "three";

export default function Canvas() {
  return (
    <main>
        <ThreeCanvas>
          <Sphere/>
          <mesh position={[1,2,-10]}>
            <sphereGeometry args={[0.1,0.1,0.1]}/>
            <meshBasicMaterial />
          </mesh>
          <mesh position={[1,-2,-10]}>
            <sphereGeometry args={[0.1,0.1,0.1]} />
            <meshBasicMaterial />
          </mesh>
          <directionalLight color="red" position={[5, 5, 5]} />
          <directionalLight color="blue" position={[5, 0, 5]} />
          <directionalLight color="yellow" position={[-5, 0, 5]} />
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
      <sphereGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  )
}