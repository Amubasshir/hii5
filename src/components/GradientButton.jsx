export default function GradientButton({ children, brandColor, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: `linear-gradient(135deg, ${brandColor}, rgba(255,70,200,0.9), rgba(70,120,255,0.9))`,
      }}
      className="py-3 px-6 rounded-lg text-white font-semibold shadow-xl hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}
