"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-12 prompt_layout">
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
  const [searchText, setearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [unfilteredPosts, setUnfilteredPosts] = useState([])
  const [filterOn, setFilterOn] = useState(false);
  const [filterTag, setFilterTag] = useState("");

  const handleSearchChange = (e) => {};

  const handleTagClick = (tag) => {
    setFilterTag(tag);

    if (tag === filterTag) {
      setPosts(unfilteredPosts);
      setFilterTag("");
      setFilterOn(false);
    }
    else {
      setFilterOn(true);
      const filteredPrompts = posts.filter((post) => post.tag.includes(tag));
      setPosts(filteredPrompts);
      setFilterOn(true);
    }
  };

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
    setUnfilteredPosts(data);
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
      {filterOn ? (
        <h1 className="mt-16 tag_header text-black">Showing posts related to <span className="font-medium">{filterTag}</span></h1>
      ) : (
        ""
      )}
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
