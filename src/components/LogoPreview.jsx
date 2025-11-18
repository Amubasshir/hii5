export default function LogoPreview({ logoUrl }) {
  if (!logoUrl) return null;

  return (
    <div className="mt-2">
      <img
        src={logoUrl}
        className="w-24 h-24 object-cover rounded-full border border-gray-600"
      />
    </div>
  );
}
