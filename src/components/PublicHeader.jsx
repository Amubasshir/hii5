export default function PublicHeader({ logoUrl, bannerUrl, businessName }) {
  return (
    <div className="w-full">
      {bannerUrl && (
        <img
          src={bannerUrl}
          className="w-full h-48 object-cover rounded-b-xl"
        />
      )}

      <div className="flex flex-col items-center mt-4">
        {logoUrl && (
          <img
            src={logoUrl}
            className="w-24 h-24 object-cover rounded-full border-4 border-gray-700"
          />
        )}

        <h1 className="text-2xl font-semibold text-white mt-3">
          {businessName}
        </h1>
      </div>
    </div>
  );
}
