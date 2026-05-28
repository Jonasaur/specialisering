import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function SpaceMarine({ brushColor, primeTrigger }) {
  const { nodes } = useGLTF("/spacemarine.glb");
  const [hovered, setHovered] = useState(null);
  const [partColors, setPartColors] = useState({});

  useEffect(() => {
    if (primeTrigger === 0 || !brushColor) return;

    const primedState = {};
    Object.keys(nodes).forEach((name) => {
      if (nodes[name].type === "Mesh") {
        primedState[name] = brushColor;
      }
    });

    setPartColors(primedState);
  }, [primeTrigger]);

  return (
    <group dispose={null}>
      {Object.keys(nodes).map((name) => {
        if (nodes[name].type !== "Mesh") return null;

        const isHovered = hovered === name;
        const appliedPaint = partColors[name];
        const isPaintMetallic = appliedPaint && appliedPaint.isMetallic;

        return (
          <mesh
            key={name}
            geometry={nodes[name].geometry}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(name);
            }}
            onPointerOut={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setPartColors((prev) => ({
                ...prev,
                [name]: brushColor,
              }));
            }}
          >
            <meshStandardMaterial
              color={appliedPaint ? appliedPaint.hex : "gray"}
              metalness={isPaintMetallic ? 0.5 : 0.0}
              roughness={isPaintMetallic ? 0.2 : 0.7}
              emissive={isHovered ? "white" : "black"}
              emissiveIntensity={isHovered ? 0.1 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
