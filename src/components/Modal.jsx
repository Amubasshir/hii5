
"use client";

export default function Modal({ isOpen, onClose, children, brandColor='#ffffff' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2">
      <div
        className={`
          relative bg-[${brandColor}] rounded-xl shadow-xl overflow-y-auto
          w-3/4 h-[90%]
          md:w-3/4 md:h-[90%]
          sm:w-[95%] sm:h-auto
          p-4
        `}
        style={{background: brandColor}}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
