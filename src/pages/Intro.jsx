import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import titleIcon from "../assets/title1.png";
export default function Intro() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    setTimeout(()=>setIsActive(true),3000)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-5xl font-semibold text-white tracking-widest">
            WELCOME
          </h1>
          <p className="text-4xl text-white m-5">To</p>
          <img src={titleIcon} alt="title" className="w-150 " />
        </div>
        {isActive && <div className="h-90 w-170 p-5 absolute top-[50%] left-[50%] -translate-[50%] z-20 flex justify-evenly w-80 flex-col items-center rounded-lg border border-red-900/90 bg-black/90 backdrop-blur-sm">
            <h1 className="text-5xl font-bold text-red-600">WARNING</h1>
            <p className="text-3xl text-center w-150 text-red-800/60">This site contains extreme violence. <br/> If you are sensitive, just leave this site.</p>
            <div className="flex justify-evenly w-full p-[5px]">
                <button type="button" class="w-40 rounded border border-[#d7071d]/60 bg-red-800 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white cursor-pointer">Leave</button>
                <button type="button" class="w-40 rounded border border-[#d7071d]/60 bg-[#d7071d]/15 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#d7071d] transition hover:border-[#d7071d] hover:bg-[#d7071d]/25 cursor-pointer"
                    onClick={()=>navigate("/terms")}
                >Enter</button>
            </div>
        </div>}
      </div>
    );
  }