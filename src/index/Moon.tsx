import {useRef, useState} from "react";
import {Mesh} from "three";
import {useFrame} from "@react-three/fiber";

export function Moon(props: {radius: number, color: string, map: any, step: number}) {
  const {radius, color, map, step} = props;
  const moonRef = useRef<Mesh>(null);
  const [theta, setTheta] = useState(0);

  useFrame(() => {
    if(!moonRef.current) return;

    moonRef.current.position.set(
      radius * Math.sin(theta),
      0,
      radius * Math.cos(theta),
    )

    setTheta(theta + step);
  })

  return (
    <mesh ref={moonRef} position={[0,0,0]}>
      <sphereGeometry args={[.5]} />
      <meshPhysicalMaterial color={color} map={map} iridescence={0.2} />
    </mesh>
  )
}