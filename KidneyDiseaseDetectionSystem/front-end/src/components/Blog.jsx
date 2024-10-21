import React from "react";

const Blog = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-gray-900 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Our Blogs
        </h1>
        <p className="text-lg md:text-xl">
          Explore our latest blogs to stay informed about kidney health,
          cutting-edge technologies, and industry trends.
        </p>
        <div className="mt-4">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Blog Title 1</h2>
            <p className="text-gray-500">Published on February 1, 2024</p>
            <p className="text-lg md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Sed ut ligula eu lectus tristique ullamcorper.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Blog Title 2</h2>
            <p className="text-gray-500">Published on February 5, 2024</p>
            <p className="text-lg md:text-xl">
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
              dui. Pellentesque in ipsum id orci porta dapibus.
            </p>
          </div>
          {/* Add more blog entries as needed */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
