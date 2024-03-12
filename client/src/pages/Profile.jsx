import { useSelector } from "react-redux"

function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=' text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form className=" flex flex-col gap-4">
        <img src="{currentUser.avatar}" alt="profile picture" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
        <input type="text" placeholder="username" id='username' className="border p-3 rounded-lg "/>
        <input type="email" placeholder="email" id='email' className="border p-3 rounded-lg "/>
        <input type="password" placeholder="password" id='password' className="border p-3 rounded-lg "/>
        <button  className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
        <div className=" flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  )
}

export default Profile