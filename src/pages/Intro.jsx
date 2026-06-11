export default function Intro() {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-7xl font-extrabold text-red-600 tracking-widest">
            WELCOME TO
          </h1>
          <h1 className="text-8xl font-extrabold text-red-600 tracking-widest">RED ROOM</h1>
  
          <button className="mt-10 px-8 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition duration-300 rounded-lg"
          onClick={()=>navigate("/main")}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }