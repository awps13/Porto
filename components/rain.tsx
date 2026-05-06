const lines = [
  { left: "10%", duration: "8s" },
  { left: "15%", duration: "11s" },
  { left: "20%", duration: "9s" },
  { left: "25%", duration: "12s" },
  { left: "30%", duration: "10s" },
  { left: "35%", duration: "13s" },
  { left: "40%", duration: "8.5s" },
  { left: "45%", duration: "10s" },
  { left: "50%", duration: "12.5s" },
  { left: "55%", duration: "9.5s" },
  { left: "60%", duration: "11.5s" },
  { left: "65%", duration: "10.5s" },
  { left: "70%", duration: "15s" },
  { left: "75%", duration: "11s" },
  { left: "80%", duration: "13.5s" },
  { left: "85%", duration: "9s" },
  { left: "90%", duration: "9s" },
  { left: "95%", duration: "14s" },
];

const Rain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          className="rain-line"
          style={{
            left: line.left,
            top: "-10%",
            animation: `rain ${line.duration} linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Rain;
