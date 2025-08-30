import React from "react";
import Header from "./Header";
import About from "./About";
import ArticleList from "./ArticleList";
import blogData from "../data/blog";

function App() {
  return (
    <div className="App">
      <Header name="My Personal Blog" />
      <About 
        image="https://via.placeholder.com/215" 
        about="Welcome to my personal blog! Here I share thoughts, tutorials, and stories about coding and life."
      />
      <ArticleList posts={blogData} />
    </div>
  );
}

export default App;
