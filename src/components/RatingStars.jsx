export default function RatingStars({ rating, setRating }) {
  return (
    <div className="flex space-x-2 mt-4">
      {[1, 2, 3, 4, 5].map(num => (
        <button
          key={num}
          onClick={() => setRating(num)}
          className={`text-4xl transition ${
            rating >= num ? 'text-yellow-400' : 'text-gray-500'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
