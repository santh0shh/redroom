import { useEffect, useMemo, useState } from "react";
import { FAKE_USERS } from "../hooks/useFakeChat"
import { FAKE_PAYMENT_USERS } from "../constants/payments";
import dp from "../assets/dp.jpg";

export default function Crew(){

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const showTimer = setTimeout(() => {
          setVisible(true);
        }, 2000);
    
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 7000);
    
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
    }, []);

    let mid = 51;
    const users = useMemo(() => {
        const result = [...new Set([...FAKE_USERS, ...FAKE_PAYMENT_USERS])];
        console.log(mid)
        result.splice(mid, 0, "you");
        return result;
    }, []);

    const [activeIndex, setActiveIndex] = useState(-1);
    const [visited, setVisited] = useState(new Set())
    const [fadeToBlack, setFadeToBlack] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    useEffect(() => {
        const order = shuffle([...Array(users.length).keys()]);
        order.splice(order.indexOf(mid),1);
        order.splice(-1,0,mid);
        console.log(order);
        let step = 0;
        let timedout;
        const run = () => {
          const idx = order[step++];
          setActiveIndex(idx);
          setVisited(prev => {
            const next = new Set(prev);
            next.add(idx);
            return next;
        });

          if (step >= order.length) {
                setFadeToBlack(true);
                setTimeout(() => {
                    setShowFinalMessage(true);
                }, 2000);
            
                return;
            }

          // const progress = step / order.length;
          // const delay = 20 + Math.pow(2,progress) * 500;

        //   const delay = step>order.length-10 ? Math.pow(2,(step+9-order.length)*2/3)*100+100 : 100;
        //   const delay = step>order.length-15 ? Math.pow(2,(step+14-order.length)*5/12)*100+100 : 100;
          const delay = step>order.length-5 ? Math.pow(2,step+4-order.length)*1000 : 150;
          if(step>order.length-10)console.log(step,delay);
          timedout = setTimeout(run, delay);
        };
    
        setTimeout(run,9*1000);
        return ()=>clearTimeout(timedout);
    }, [users]);

    return(
        <div className="h-full w-full bg-black p-2">
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
            {users.map((user, i) => (
                <div
                    key={user}
                    className={`relative flex items-center rounded-[3px] p-[18.2px] text-center font-mono text-sm transition-all duration-75 text-red-500 border
                    ${
                        i === activeIndex
                        ? "border-red-500 shadow-lg shadow-red-500/40"
                        : "border-zinc-800 bg-zinc-900"
                    }
                    `}
                >
                    <img
                    src={dp}
                    alt="profile"
                    className="absolute left-[5px] h-7 w-7 rounded-full border border-white"
                    />
                    <p className="pl-7">{user}</p>
                </div>
            ))}
            </div>
        {visible && <div className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-l flex items-center justify-center">
                <div className="text-center bg-black p-20 border border-red-500 rounded-md">
                    <p className="text-red-500 text-xl">Wait a minute<br/>
                    One among you disregard the rules of the room.<br/>
                    Lets see who it is</p>
                </div>
            </div>}
            
            <div
                className={`fixed inset-0 bg-black z-50 flex items-center justify-center
                transition-opacity duration-[3000ms]
                ${fadeToBlack ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <div
                    className={`transition-all duration-[5000ms]
                    ${showFinalMessage
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                >
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-red-600 text-8xl font-black drop-shadow-[0_0_4px_rgba(100,5,5,1)]">MEET YOU SOON</h1>
                </div>
            </div>
        </div>
    )
}