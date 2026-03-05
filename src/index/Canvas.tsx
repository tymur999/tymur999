import {motion} from "framer-motion";
import "./canvas.scss";
import {Canvas as ThreeCanvas, useFrame} from "@react-three/fiber";
import {Vector3} from "three";
import {Moon} from "./Moon";
import {Stars} from "./Stars";

export default function Canvas() {

  return (
    <main className="canvas">
        <ThreeCanvas gl={{antialias: true, alpha: true}} >
          <Sphere/>
          <Moon radius={8} color="pink" step={0.01}/>
          <Moon radius={6} color="grey" step={0.02}/>
          <Moon radius={4} color="green" step={0.03}/>
          <Stars/>
          <directionalLight color="#E3A857" args={[1,10]} position={[100,10,100]} />
        </ThreeCanvas>
      <motion.h2 className="welcome" animate={{ rotate: 360 }}>
        Welcome to my blog
      </motion.h2>
    </main>
  )
}

function Sphere() {
  useFrame(state => {
    const { x, y } = state.pointer
    // Smoothly interpolate the camera position
    // We multiply by a factor (e.g., 5) to increase the range of movement
    state.camera.position.lerp(new Vector3(x * 10, y * 10, 5), 0.1)
    // Always keep the camera looking at the center
    state.camera.lookAt(0, 0, 0)
  })

  return <mesh position={[0,0,0]}>
    <sphereGeometry />
    <meshPhysicalMaterial color="blue" iridescence={.5} />
  </mesh>
}