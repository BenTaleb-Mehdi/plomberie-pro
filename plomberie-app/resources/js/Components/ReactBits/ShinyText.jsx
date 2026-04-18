export default function ShinyText({
  text = '',
  disabled = false,
  speed = 5,
  className = '',
}) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a1] bg-clip-text inline-block ${
        disabled ? '' : 'animate-shiny'
      } ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: -100%; }
        }
        .animate-shiny {
          animation-name: shine;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
