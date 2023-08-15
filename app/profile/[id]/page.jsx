"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const otherProfile = ({ params }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id !== params.id) {
      fetchPrompts();
    }
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div>
      {posts ? (
        <Profile
        name={`${posts[0].creator.username}`}
        desc={`This is ${posts[0].creator.username}'s profile.`}
        data={posts}
        userId={posts[0].creator._id}
      />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default otherProfile;
