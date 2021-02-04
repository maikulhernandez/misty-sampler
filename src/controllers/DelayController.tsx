import {FeedbackDelay} from 'tone';

interface DelayState {
  handleWetSignalChange: (value: number) => void;
  handleTimeChange: (value: number) => void;
  handleFeedbackChange: (value: number) => void;
}

export type DelayController = (props: {delay?: FeedbackDelay}) => DelayState;

export const useDelayController: DelayController = ({delay}) => {
  const handleWetSignalChange = (value: number) => {
    delay?.set({wet: value});
  };
  const handleTimeChange = (value: number) => {
    delay?.set({delayTime: value});
  };
  const handleFeedbackChange = (value: number) => {
    delay?.set({feedback: value});
  };
  return {handleWetSignalChange, handleTimeChange, handleFeedbackChange};
};
