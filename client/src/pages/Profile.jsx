import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 self-center"
          src={currentUser.avatar}
          alt=""
        />
        <input className = "p-3 border rounded-lg" type="text" placeholder="username" id="username" />
        <input className = "p-3 border rounded-lg" type="text" placeholder="email" id="email" />
        <input className = "p-3 border rounded-lg" type="text" placeholder="password" id="password" />
        <button className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95">Update</button>
      </form>

      <div className="flex justify-between mt-3">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">sign out</span>
      </div>
    </div>
  );
}
