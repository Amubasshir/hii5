import { FaRegCopy } from 'react-icons/fa';

export default function CopyButton({ text }) {
  const copy = () => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <button onClick={copy} className="p-2 text-gray-400 hover:text-white">
      <FaRegCopy size={18} />
    </button>
  );
}
