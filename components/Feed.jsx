"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-4 prompt_layout">
      {data.map((prompt, key) => {
        return (
          <div key={key}>
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleTagClick={handleTagClick}
            />
          </div>
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleTagClick = (tagName) => {
    if (searchText === tagName) {
      setSearchedResults([]);
      setSearchText("");
    } else if (searchText === "") {
      setSearchText(tagName);
      filterPrompts(tagName);
    }
  };

  const filterPrompts = (searchtext) => {
    console.log(posts)
    const filteredPrompts = posts.filter(
      (item) => item.tag.includes(searchtext) || item.creator.username.includes(searchtext)
    );
    setSearchedResults(filteredPrompts);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        filterPrompts(e.target.value);
      }, 500)
    );
  };

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchedResults && searchText ? (
        <>
          <h1 className="mt-16 tag_header text-black">
            Showing posts related to{" "}
            <span className="font-medium">{searchText}</span>
          </h1>
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        </>
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
