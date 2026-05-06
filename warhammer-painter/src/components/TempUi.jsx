export default function TempUi({ activeColor, setActiveColor }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
        display: "flex",
        gap: "10px",
        background: "rgba(255,255,255,0.8)",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <button
        onClick={() => setActiveColor("royalblue")}
        style={{ background: "royalblue", color: "white" }}
      >
        Blue
      </button>
      <button
        onClick={() => setActiveColor("hotpink")}
        style={{ background: "hotpink", color: "white" }}
      >
        Pink
      </button>
      <button
        onClick={() => setActiveColor("limegreen")}
        style={{ background: "limegreen", color: "white" }}
      >
        Green
      </button>
      <p style={{ margin: 0, alignSelf: "center", color: "#333" }}>
        Active: {activeColor}
      </p>
    </div>
  );
}
