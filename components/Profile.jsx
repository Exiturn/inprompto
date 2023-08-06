import PromptCard from "./PromptCard";
import { useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      {data ? 
      <div className="mt-16 tag_header">
        You have no prompts yet. Start creating new prompts to see them in your profile!
      </div>
      :
      ""}

      <div className="mt-10 prompt_layout">
        {data ? data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        )) : 
          <div>Loading...</div>
        }
      </div>
    </section>
  );
};

export default Profile;
