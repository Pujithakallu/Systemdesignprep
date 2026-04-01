import { useState } from 'react';

export default function MCQ({ question, options, correctAnswerIndex, explanation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedOption === correctAnswerIndex;

  return (
    <div className="my-8 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-gray-100">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ";
          
          if (!isSubmitted) {
            buttonClass += selectedOption === index 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400 ring-1 ring-blue-500" 
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/50";
          } else {
            if (index === correctAnswerIndex) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-400";
            } else if (selectedOption === index) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-400";
            } else {
              buttonClass += "border-gray-200 opacity-40 dark:border-gray-600";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              disabled={isSubmitted}
              className={buttonClass}
            >
              <div className="flex items-start">
                <div className={`w-6 h-6 min-w-[1.5rem] rounded-full border-2 flex items-center justify-center mr-3 mt-0.5
                  ${isSubmitted && index === correctAnswerIndex
                    ? 'border-green-500 bg-green-500'
                    : isSubmitted && selectedOption === index
                      ? 'border-red-500 bg-red-500'
                      : selectedOption === index
                        ? 'border-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                  }`}>
                  {isSubmitted && index === correctAnswerIndex && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isSubmitted && selectedOption === index && index !== correctAnswerIndex && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {!isSubmitted && selectedOption === index && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="text-gray-800 dark:text-gray-200 leading-relaxed">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200
              ${selectedOption !== null 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'}`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Try Again
          </button>
        )}
      </div>

      {isSubmitted && (
        <div className={`mt-5 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {explanation && (
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span className="font-medium">Explanation:</span> {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
