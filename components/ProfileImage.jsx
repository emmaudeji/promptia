

const ProfileImage = ({username}) => {
  return (
    <div className="rounded-full w-12 h-12 flex justify-center items-center text-white bg-purple-800 font-semibold uppercase">{username?.slice(0,1)}</div>
  )
}

export default ProfileImage