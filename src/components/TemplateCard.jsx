import { FaRegCopy } from 'react-icons/fa';

export default function TemplateCard({ title, content, link, brandColor }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert(`${title} copied!`);
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-1 text-gray-300">{title}</h3>

      <div className="border border-gray-700 rounded-lg p-3 bg-gray-900">
        <p className="text-sm text-gray-300">{content}</p>

        <p
          className="text-sm mt-1 break-all font-mono"
          style={{ color: brandColor }}
        >
          {link}
        </p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="mt-1 flex items-center text-sm text-gray-400 hover:text-white"
      >
        <FaRegCopy className="mr-1" /> Copy
      </button>
    </div>
  );
}
