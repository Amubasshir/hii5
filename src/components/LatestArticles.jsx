import React from 'react';
// Import the necessary icons from react-icons/fa
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';

const ArticleCard = ({ category, title, date, readTime, isFirst }) => {
  return (
    <div
      className={`
            bg-gray-800 rounded-xl overflow-hidden shadow-lg 
            relative transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl
            border border-transparent hover:text-pink-600
        `}
    >
      <div
        className={`
        relative h-72 w-full 
        overflow-hidden
    `}
      >
        {/* 1. Conditional Image Rendering (CORRECT WAY) */}
        {isFirst ? (
          <img
            src="https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/6111b7f536c6b5fbc677c496_image-thumbnail-6-blog-dark-template.jpg"
            alt="IPO Article"
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src="https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/6111b9e9be7bdd21a81d1756_image-thumbnail-5-blog-dark-template.jpg"
            alt="Stock Trading Article"
            className="object-cover w-full h-full"
          />
        )}

        {/* 2. Visual elements for the card header (Overlayed on top of the image) */}
        <div className="absolute inset-0 z-10">
          {isFirst ? (
            <div className="flex items-center justify-center p-4">
              {/* Simulation of stacked hexagons with blurred divs */}
              <div className="absolute w-28 h-28 bg-white/20 rounded-lg blur-xl transform -rotate-12 -translate-x-8" />
              <div className="absolute w-28 h-28 bg-white/15 rounded-lg blur-xl transform rotate-6 translate-x-4" />
              <div className="absolute w-28 h-28 bg-white/10 rounded-lg blur-xl transform -rotate-6 translate-x-12" />
            </div>
          ) : (
            <div className="flex justify-evenly items-center opacity-30">
              {/* Simulation of stock chart lines with blurred white divs */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-3/5 bg-white rounded-full blur-sm"
                  style={{ height: `${50 + i * 8}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. Category Tag (Overlayed on top of the image and patterns) */}
        <span
          className="
            absolute top-4 right-4 z-20
            bg-gray-900 text-white text-lg font-medium 
            px-5 py-3 rounded-full backdrop-blur-sm
            flex items-center space-x-1
        "
        >
          {category === 'Articles' ? '📖' : '💡'} {category}
        </span>
      </div>
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 leading-tight">{title}</h3>

        {/* Metadata */}
        <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
          <span className="flex items-center space-x-1">
            <FaCalendarAlt className="h-4 w-4" />{' '}
            {/* Replaced CalendarDaysIcon */}
            <span>{date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaClock className="h-4 w-4" /> {/* Replaced ClockIcon */}
            <span>{readTime}</span>
          </span>
        </div>

        {/* Read More Link */}
        <a
          href="#"
          className="
    relative inline-flex items-center space-x-2 text-violet-400 font-medium
    group transition-colors duration-200
  "
        >
          <span>Read more</span>
          <FaArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />

          {/* Animated Border Line */}
          <span
            className="
    absolute left-0 -bottom-1 h-[2px] w-full 
    bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-violet-500/80
    transform scale-x-0 group-hover:scale-x-100 origin-left
    transition-transform duration-300 ease-out
  "
          />
        </a>
      </div>
    </div>
  );
};

const LatestArticles = () => {
  const articles = [
    {
      id: 1,
      category: 'Articles',
      title: 'What is an Initial Public Offering (IPO)?',
      date: 'September 1, 2022',
      readTime: '7 min read',
    },
    {
      id: 2,
      category: 'Guides',
      title: 'Stock trading: A guide for beginners',
      date: 'September 1, 2022',
      readTime: '7 min read',
    },
  ];

  return (
    <div className={`min-h-screen py-16 px-4  text-white`}>
      <div className="max-w-4xl mx-auto ">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-semibold">Latest articles</h2>
          <a
            href="/articles"
            className={`
                            bg-card-dark text-white px-6 py-3 rounded-lg border border-gray-600 
                            hover:bg-gray-700 transition-colors duration-200
                        `}
          >
            Browse all articles
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} {...article} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
