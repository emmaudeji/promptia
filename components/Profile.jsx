import PromptCard from "./PromptCard";
import Link from "next/link";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        
        {data?.lenght ? data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        )) : 
        <div className="grid">
          <div className="pb-4"> You haven'nt created any prompt. </div>
          <div>
            <Link href={'/create-prompt'} className="black_btn"> Create prompt </Link>
          </div>
        </div >
        }
      </div>
    </section>
  );
};

export default Profile;
