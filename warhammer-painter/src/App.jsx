import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";
import Suzanne from "./components/Suzanne";

import "./App.css";
import TempUi from "./components/TempUi";

function App() {

  const [activeColor, setActiveColor] = useState("royalblue");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TempUi activeColor={activeColor} setActiveColor={setActiveColor} />
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Suzanne brushColor={activeColor} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default App;
