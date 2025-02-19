import { useState } from "react";
import { CircleCheck } from "lucide-react";

interface AnimatedButtonProps {
    option: string
    handlerClick: (arg1: string, arg2: any) => void;
    initialTimer: any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ handlerClick, initialTimer, option }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowPlusOne(true);
    handlerClick(option, initialTimer);

    setTimeout(() => {
      setIsClicked(false);
    }, 500); // Duração do clique

    setTimeout(() => {
      setShowPlusOne(false);
    }, 500); // Duração do "+1"
  };

  return (
    <div className="relative w-[15em] h-[3rem] flex text-textColor text-xl">
      <button
        className={`
          flex 
          items-center 
          justify-center 
          w-[80%] 
          h-full 
          rounded-md 
          border-2 
          border-borderItems 
          bg-itemsBackgroud 
          transition-transform 
          hover:scale-110 
          focus:outline-none
          active:scale-90
          ${isClicked ? "scale-90 animate-pulse" : ""}
        `}
        onClick={handleClick}
      >
        <p className="text-2xl mr-5">{option} is better</p>
        <CircleCheck />
      </button>

      {/* "+1" Animation */}
      {showPlusOne && (
        <span
          className={`
            absolute ${option == "B"? "left-full" : "right-full mr-20"} text-green-500 text-2xl font-bold
            animate-[fadeUp_0.5s_ease-out]
          `}
        >
          +1
        </span>
      )}

      {/* Keyframes para animação personalizada */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(10px); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedButton;
