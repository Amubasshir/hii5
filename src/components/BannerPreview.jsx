export default function BannerPreview({ bannerUrl }) {
  if (!bannerUrl) return null;

  return (
    <div className="mt-4">
      <img
        src={bannerUrl}
        className="w-full h-36 object-cover rounded-lg border border-gray-700"
      />
    </div>
  );
}
