import { useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Suzanne() {
  const { nodes } = useGLTF("/suzanne.glb");

  const [hovered, setHovered] = useState(null);

  return (
    <group dispose={null}>
      {Object.keys(nodes).map((name) => {
        if (nodes[name].type !== "Mesh") return null;

        const isHovered = hovered === name;

        return (
          <mesh key={name} geometry={nodes[name].geometry}
            onPointerOver=
            {(e) => {
              e.stopProagation();
              setHovered(name);
            }}
            onPointerOut=
            {(e) => {
              setHovered(null);
            }}>
            <meshStandardMaterial
              color="orange"
              emissive={isHovered ? "white" : "black"}
              emissiveIntensity={isHovered ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
