function Dots() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </>
  );
}

export default Dots;
