import { motion } from "motion/react"

export default function Mascot() {
  return (
    <motion.div 
      className="absolute z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Speech Bubble */}
      <div 
        className="absolute flex items-center justify-center bg-white border-[0.82px] border-black rounded-[10px]"
        style={{
          width: '196.51px',
          height: '96.06px',
          top: '725px',
          left: '94.09px',
          transform: 'rotate(-180deg)'
        }}
      >
        <p className="text-[16px] font-semibold text-gray-800 whitespace-nowrap" style={{ transform: 'rotate(180deg)' }}>
          Best of Luck!
        </p>
        {/* Pointer would need adjustment for rotation */}
      </div>

      {/* Cat GIF */}
      <div 
        className="absolute"
        style={{
          width: '173.45px',
          height: '173.45px',
          top: '794.55px',
          left: '240.55px',
        }}
      >
        <img 
          src="/cat-paw.gif" 
          alt="Cat paw mascot" 
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}
