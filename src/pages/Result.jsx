import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  
  // Rolling number animation
  const count = useMotionValue(100);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, score, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [score, count]);

  return (
    // Background Gradient
    <div className="w-screen h-screen fixed inset-0 flex items-center justify-center" 
         style={{
           background: 'linear-gradient(135deg, #BECFEE 0%, #71C6E2 33%, #D9F4FA 66%, #BECFEE 100%)',
         }}>
      
      {/* Glassmorphism Container */}
      <div className="relative flex items-center justify-center p-8"
           style={{
             width: '100%',
             height: '100%',
             backdropFilter: 'blur(20px)',
           }}>

        {/* Background Border Box */}
        <div 
          style={{
            position: 'absolute',
            width: '1600px', 
            height: '920px', 
            borderRadius: '54px', 
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            zIndex: 0,
          }}
        />

        {/* Main White Card Container */}
        <motion.div 
          className="relative bg-[#F4FDFF] rounded-[42px] shadow-2xl overflow-hidden flex flex-col items-center justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            width: '1542px',
            height: '856px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}>
          
          {/* Keep Learning Badge */}
          <motion.div
            className="absolute"
            style={{ top: '150px' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
              <p className="text-[#1e3a5f] text-[16px] font-medium">
                Keep Learning!
              </p>
            </div>
            {/* Vertical dotted line connecting badge to title */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-[40px] border-l-2 border-dashed border-[#71C6E2]"></div>
          </motion.div>

          {/* Title: "Your Final score is" */}
          <motion.h1 
            className="font-dm-serif italic text-[64px] leading-tight mb-8 absolute"
            style={{
              top: '230px',
              color: '#1e3a5f',
              fontWeight: 400,
              letterSpacing: '-2px',
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Final score is
          </motion.h1>

          {/* Score Display with Crosshair Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none">
             {/* Full width Horizontal dotted line */}
             <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-[#71C6E2] opacity-50"></div>
             
             {/* Full height Vertical dotted line */}
             <div className="absolute top-[-200px] bottom-[-200px] left-1/2 -translate-x-1/2 w-[2px] border-l-2 border-dashed border-[#71C6E2] opacity-50"></div>
             
             {/* Score Value */}
             <motion.div
               className="relative z-10 bg-[#F4FDFF] px-8 py-4"
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
             >
               <h2 className="font-dm-serif text-[180px] leading-none text-[#1e3a5f] flex items-baseline">
                 <motion.span>{rounded}</motion.span>
                 <span className="text-[100px]">%</span>
               </h2>
             </motion.div>
          </div>

          {/* Start Again Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="absolute bottom-[150px] px-12 py-5 rounded-[16px] font-semibold text-[20px] transition-all shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: '#C6E9F7',
              color: '#1e3a5f',
              border: '1px solid #B8D8E8'
            }}
            whileHover={{ scale: 1.05, backgroundColor: '#B8D8E8' }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Start Again
          </motion.button>

        </motion.div>
      </div>
    </div>
  );
}
