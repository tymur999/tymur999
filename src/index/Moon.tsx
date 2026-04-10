import {useRef} from "react";
import type {Mesh} from "three";
import {useFrame} from "@react-three/fiber";

export function Moon(props: {radius: number, color: string, map: any, step: number}) {
  const {radius, color, map, step} = props;
  const moonRef = useRef<Mesh>(null);
  const thetaRef = useRef(0);

  useFrame(() => {
    if(!moonRef.current) return;

    moonRef.current.position.set(
      radius * Math.sin(thetaRef.current),
      0,
      radius * Math.cos(thetaRef.current),
    );
    moonRef.current.rotation.y += 0.001;

    thetaRef.current += step / 3;
  })

  return (
    <mesh ref={moonRef} position={[0,0,0]}>
      <sphereGeometry args={[.5]} />
      <meshPhysicalMaterial color={color} map={map} iridescence={1} />
    </mesh>
  )
}