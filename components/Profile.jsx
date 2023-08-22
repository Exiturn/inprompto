"use client";

import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete, userId }) => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
    console.log("data: ", data);
    console.log("session?.user._id: ", session?.user.id);
    console.log("userId: ", userId)
  }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {session?.user.id !== userId ? (
          <span className="blue_gradient capitalize">{name} Profile</span>
        ) : (
          ""
        )}
      </h1>
      <p className="desc text-left">{desc}</p>
      {!data ? (
        <div className="mt-16 tag_header">
          {session?.user._id === userId
            ? "You have no prompts yet. Start creating new prompts to see them in your profile!"
            : "They have not created any prompts yet."}
        </div>
      ) : (
        ""
      )}

      {session?.user.id ? <div className="mt-16 tag_header"></div> : ""}
      <div className="mt-10 prompt_layout">
        {data ? (
          data.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleEdit={() => handleEdit && handleEdit(prompt)}
              handleDelete={() => handleDelete && handleDelete(prompt)}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default Profile;
