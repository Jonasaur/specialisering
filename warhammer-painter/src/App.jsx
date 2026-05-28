import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Suzanne from "./components/Suzanne";
import SpaceMarine from "./components/SpaceMarine/SpaceMarine";
import "./App.css";
import ColourUI from "./components/ColourUI/ColourUI";

function App() {
  const [activeColor, setActiveColor] = useState("");
  const [primeTrigger, setPrimeTrigger] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ColourUI activeColor={activeColor} setActiveColor={setActiveColor} onPrime={() => setPrimeTrigger((prev) => prev + 1)} />
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [0, 0, 4], fov: 50, zoom: 0.8 }}
        style={{ position: "absolute", top: 0, left: 100 }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={2.5}>
            <SpaceMarine brushColor={activeColor} primeTrigger={primeTrigger} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default App;
