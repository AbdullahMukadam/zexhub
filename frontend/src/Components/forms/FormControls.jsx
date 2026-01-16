
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';

const FormControls = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit, 
  isFirstStep, 
  isLastStep,
  canProceed = true
}) => {
  return (
    <div className="flex items-center justify-between font-sans">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
          isFirstStep
            ? 'text-util-gray/30 cursor-not-allowed'
            : 'text-util-gray hover:text-white hover:bg-white/5'
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        Back
      </button>

      {/* Next/Submit Button */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg ${
            canProceed
              ? 'bg-white text-black hover:bg-gray-200 shadow-white/5'
              : 'bg-white/10 text-util-gray/50 cursor-not-allowed'
          }`}
        >
          Finish
          <FiCheck className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
            canProceed
              ? 'bg-white text-black border-white hover:bg-gray-200'
              : 'bg-transparent border-white/10 text-util-gray/50 cursor-not-allowed'
          }`}
        >
          Next
          <FiChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FormControls;
