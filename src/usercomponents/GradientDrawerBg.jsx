export default function GradientDrawerBg() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(20, 40, 90, 0.45) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(12, 24, 55, 0.65) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(12, 24, 55, 0.65) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(12, 24, 55, 0.65) 0%, transparent 80%)
        `,
      }}
    />
  );
}
