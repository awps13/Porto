"use client";

const lines = [
  { left: "10%", duration: "8s" },
  { left: "20%", duration: "11s" },
  { left: "30%", duration: "9s" },
  { left: "40%", duration: "10s" },
  { left: "50%", duration: "12s" },
  { left: "60%", duration: "10.5s" },
  { left: "70%", duration: "15s" },
  { left: "80%", duration: "13s" },
  { left: "90%", duration: "9s" },
];

const Rain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
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
