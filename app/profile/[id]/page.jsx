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
    if (session?.user.id) {
      fetchPrompts();
    }
  }, [session?.user.id]);

  useEffect(() => {
    console.log(posts);
  }, [posts])
  return <div>{params.id}</div>;
};

export default otherProfile;
