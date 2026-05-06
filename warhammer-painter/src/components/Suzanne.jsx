import { useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Suzanne() {
  const { nodes } = useGLTF("/suzanne.glb");

  const [hovered, setHovered] = useState(null);

  const [partColors, setPartColors] = useState({
    Suzanne_1: "orange",
    Suzanne_2: "orange",
    Suzanne_3: "orange",
    Suzanne_4: "orange",
    Suzanne_5: "orange",
    Suzanne_6: "orange",
  });

  return (
    <group dispose={null}>
      {Object.keys(nodes).map((name) => {
        if (nodes[name].type !== "Mesh") return null;

        const isHovered = hovered === name;

        return (
          <mesh key={name} geometry={nodes[name].geometry}
            onPointerOver=
            {(e) => {
              e.stopPropagation();
              setHovered(name);
            }}
            onPointerOut= {() => setHovered(null)}
            onClick={(e) => {
                e.stopPropagation();
                setPartColors((prev) => ({
                    ...prev,
                    [name]: "royalblue",
                }));
            }}
              
            >
            <meshStandardMaterial
              color={partColors[name] || "orange"}
              emissive={isHovered ? "white" : "black"}
              emissiveIntensity={isHovered ? 0.1 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
