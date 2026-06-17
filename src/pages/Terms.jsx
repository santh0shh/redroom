import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Terms() {
  const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full border border-red-900 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">
          Terms and Conditions
        </h1>

        <div className="text-zinc-300 space-y-3 text-lg">
          <p>1. If you are in the live stream, you must comment.</p>
          <p>2. You must not talk about this site outside the stream.</p>
          <p>3. Once you enter the room, the room never forgets you.</p>
          <p>4. Do not leave the live event before it concludes. <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Leaving early is a direct violation of our rituals and traditions.
          </p>
          <p>5. Watch, Obey, Become part of the room.</p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <input
            id="rules"
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-5 w-5 accent-red-600"
          />

          <label
            htmlFor="rules"
            className="text-zinc-200 cursor-pointer"
          >
            Once you join, there is no stepping back.
          </label>
        </div>
        <div className="w-full flex justify-center">
        <button
          disabled={!accepted}
          className={`mt-8 p-3 px-5 rounded-lg font-semibold transition-all duration-300 ${
            accepted
              ? "bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
          }`}
          onClick={()=>navigate("/main")}
        >
          Accept and Continue
        </button>
        </div>
      </div>
    </div>
  );
}