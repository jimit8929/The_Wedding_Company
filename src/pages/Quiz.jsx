import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData } from '../data/questions';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelectAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = quizData.filter((q, index) => 
        answers[index] === q.correctAnswer
      ).length;
      const percentage = Math.round((correctAnswers / quizData.length) * 100);
      navigate('/result', { state: { score: percentage } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    // Background Gradient/Aurora
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
          className="relative bg-[#F4FDFF] rounded-[42px] shadow-2xl overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            width: '1542px',
            height: '856px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '4px solid rgba(255, 255, 255, 0.5)', 
          }}>
          
          {/* Content wrapper */}
          <div className="relative w-full h-full flex flex-col items-center">
            
            {/* Header: "Test Your Knowledge" */}
            <div className="absolute flex flex-col items-center justify-center"
                 style={{
                   top: '80px',
                   left: '320px',
                   width: '930px',
                   height: '200px',
                 }}>
              <h1 className="font-dm-serif italic text-center"
                  style={{
                    fontSize: '110px',
                    fontWeight: 400,
                    lineHeight: '150px',
                    letterSpacing: '-5px',
                    background: 'linear-gradient(to right, #15313D, #3CABDA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                Test Your Knowledge
              </h1>
              {/* Subtitle added below header */}
              <p className="text-center text-gray-800 font-medium"
                 style={{
                   fontSize: '18px',
                   marginTop: '-4px', 
                 }}>
                Answer all your questions to see the result
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="absolute"
                 style={{
                   top: '320px',
                   width: '896px',
                 }}>
              <div className="flex gap-[10px]">
                {quizData.map((_, index) => (
                  <div 
                    key={index}
                    className="h-[6px] flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index <= currentQuestion ? '#287094' : '#E5E7EB',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Question and Options Container */}
            <div className="absolute"
                 style={{
                   top: '380px',
                   width: '896px',
                 }}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-[24px]"
                >
                  {/* Question Box */}
                  <div style={{
                         width: '100%',
                         minHeight: '100px',
                         borderRadius: '16px',
                         border: '1px solid #C6E9F7',
                         padding: '24px 40px',
                         background: 'linear-gradient(180deg, #D4F1FD 0%, #F0FAFF 100%)',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                       }}>
                    <p className="text-[#1e3a5f] font-semibold text-center"
                       style={{
                         fontSize: '24px',
                         lineHeight: '32px',
                       }}>
                      {currentQuestion + 1}. {quizData[currentQuestion].question}
                    </p>
                  </div>
                  
                  {/* Answer Options */}
                  <div className="flex flex-col gap-[16px]">
                    {quizData[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSelectAnswer(option)}
                        style={{
                          width: '100%',
                          height: '64px',
                          borderRadius: '12px',
                          padding: '0 32px',
                          backgroundColor: answers[currentQuestion] === option ? '#D4F1FD' : '#FFFFFF',
                          border: answers[currentQuestion] === option 
                            ? '2px solid #71C6E2' 
                            : '1px solid #E5E7EB',
                          fontSize: '18px',
                          fontWeight: 500,
                          color: '#374151',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                        whileHover={{ scale: 1.01, backgroundColor: answers[currentQuestion] === option ? '#D4F1FD' : '#F9FAFB' }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute flex gap-[16px]"
                 style={{
                   bottom: '60px',
                   right: '60px',
                 }}>
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#E5EDF3',
                  color: '#64748b',
                  fontSize: '24px',
                  border: 'none',
                  cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentQuestion === 0 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                whileHover={currentQuestion !== 0 ? { scale: 1.05 } : {}}
                whileTap={currentQuestion !== 0 ? { scale: 0.95 } : {}}
              >
                ←
              </motion.button>
              
              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                style={{
                  width: currentQuestion === quizData.length - 1 ? 'auto' : '56px', 
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#71C6E2',
                  color: 'white',
                  fontSize: currentQuestion === quizData.length - 1 ? '18px' : '24px',
                  fontWeight: 600,
                  padding: currentQuestion === quizData.length - 1 ? '0 24px' : '0',
                  border: 'none',
                  cursor: !answers[currentQuestion] ? 'not-allowed' : 'pointer',
                  opacity: !answers[currentQuestion] ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(113, 198, 226, 0.3)'
                }}
                whileHover={answers[currentQuestion] ? { scale: 1.05 } : {}}
                whileTap={answers[currentQuestion] ? { scale: 0.95 } : {}}
              >
                {currentQuestion === quizData.length - 1 ? 'Submit' : '→'}
              </motion.button>
            </div>

            {/* Cat Mascot */}
            <AnimatePresence>
              {currentQuestion === 0 && (
                <motion.div 
                  className="absolute bottom-0 left-10 z-50 pointer-events-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                   <div className="relative" style={{ width: '170px', height: '170px' }}>
                      {/* Speech Bubble */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-12 left-0 bg-white border-4 border-cyan-200 rounded-xl px-4 py-2 shadow-lg z-10"
                        style={{ transform: 'rotate(-5deg)' }}
                      >
                        <p className="font-bold text-base text-gray-800 font-handwriting">Best of Luck!</p>
                        {/* Triangle */}
                        <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black"></div>
                        <div className="absolute -bottom-[6px] left-[26px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
                      </motion.div>

                      {/* Cat Image */}
                      <motion.img 
                        src="/cat-paw.gif" 
                        alt="Mascot"
                        className="absolute bottom-0 left-0 w-full object-contain"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
