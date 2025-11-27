import { motion } from 'motion/react';

export default function Question({ question, options, selectedAnswer, onSelectAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
      style={{ gap: '14px' }}
    >
      <div className="bg-blue-100/60 rounded-[20px] px-[48px] py-[32px] text-center flex items-center justify-center"
           style={{ width: '897px' }}>
        <p className="text-gray-800 font-medium text-lg">{question}</p>
      </div>
      
      <div className="flex flex-col gap-[16px]">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectAnswer(option)}
            className={`flex items-center justify-center text-[18px] font-medium transition-all ${
              selectedAnswer === option 
                ? 'bg-[#B8D8E8] border-[#71C6E2] text-gray-800 shadow-md' 
                : 'bg-[#F5F7F9] hover:bg-gray-100 border-gray-200 text-gray-700'
            }`}
            style={{
              width: '896px',
              height: '78px',
              padding: '24px 277px',
              borderRadius: '10px',
              borderWidth: '1px',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
