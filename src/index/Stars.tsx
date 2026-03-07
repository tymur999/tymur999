import {useMemo} from "react";

const RADIUS = 20;
const COUNT = 100;
type Coordinate = [number, number, number];
export function Stars() {
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

  return positions.map((coord, i) => <mesh key={i} position={coord}>
      <sphereGeometry args={[.1]} />
      <meshBasicMaterial />
    </mesh>
  )
}
