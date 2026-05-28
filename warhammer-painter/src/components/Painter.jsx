import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Painter({ brushColor }) {
  const { nodes } = useGLTF("/spacemarine.glb");
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [partColors, setPartColors] = useState({});
  const { camera } = useThree();
  const meshRefs = useRef({});

  const getGroupName = (meshName) => meshName.replace(/_\d+$/, "");

  const flyToGroup = (groupName) => {
    const box = new THREE.Box3();
    meshNames
      .filter((n) => getGroupName(n) === groupName)
      .forEach((n) => {
        const mesh = meshRefs.current[n];
        if (mesh) box.expandByObject(mesh);
      });
    flyToBox(box);
  };

  const flyToMesh = (meshName) => {
    const mesh = meshRefs.current[meshName];
    if (!mesh) return;
    const box = new THREE.Box3().setFromObject(mesh);
    flyToBox(box);
  };

  const flyToBox = (box) => {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const distance = (maxDim / 2 / Math.tan(fov / 2)) * 2;

    const startPos = camera.position.clone();
    const endPos = center.clone().add(new THREE.Vector3(0, 0, distance));
    const startTime = performance.now();
    const duration = 600;

    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(startPos, endPos, ease);
      camera.lookAt(center);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const meshNames = Object.keys(nodes).filter(
    (name) => nodes[name].type === "Mesh"
  );

  useFrame(() => {
    meshNames.forEach((name) => {
      const mesh = meshRefs.current[name];
      if (!mesh) return;
      const groupName = getGroupName(name);
      const mat = Array.isArray(mesh.material)
        ? mesh.material[0]
        : mesh.material;
      if (!mat) return;

      let shouldEmit = false;

      if (selectedGroup === groupName) {
        // Gruppe er valgt: highlight individuelt mesh
        shouldEmit = hoveredMesh === name;
      } else {
        // Ingen gruppe valgt: highlight hele gruppen
        shouldEmit = hoveredGroup === groupName;
      }

      mat.emissive.set(shouldEmit ? "white" : "black");
      mat.emissiveIntensity = shouldEmit ? 0.15 : 0;
    });
  });

  return (
    <group dispose={null}>
      {meshNames.map((name) => {
        const node = nodes[name];
        const groupName = getGroupName(name);
        const isSelected = selectedGroup === groupName;

        const origMat = Array.isArray(node.material)
          ? node.material[0]
          : node.material;
        const colorKey = name;
        const origColor = origMat?.color
          ? "#" + origMat.color.getHexString()
          : "gray";

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(partColors[colorKey] || origColor),
          name: origMat?.name || "",
        });

        return (
          <mesh
            key={name}
            ref={(el) => (meshRefs.current[name] = el)}
            geometry={node.geometry}
            material={material}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (isSelected) {
                setHoveredMesh(name);
              } else {
                setHoveredGroup(groupName);
              }
            }}
            onPointerOut={() => {
              setHoveredMesh(null);
              setHoveredGroup(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isSelected) {
                setSelectedGroup(groupName);
                flyToGroup(groupName);
              } else {
                setPartColors((prev) => ({ ...prev, [colorKey]: brushColor }));
                flyToMesh(name);
              }
            }}
          />
        );
      })}
    </group>
  );
}