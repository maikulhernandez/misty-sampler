import {FeedbackDelay} from 'tone';

interface DelayState {
  handleParameterChange: (newParam: {}) => void;
}

export type DelayController = (props: {delay?: FeedbackDelay}) => DelayState;

export const useDelayController: DelayController = ({delay}) => {
  const handleParameterChange = (newParam: {
    wet?: number;
    delayTime?: number;
    feedback?: number;
  }) => {
    delay?.set({...newParam});
  };

  return {handleParameterChange};
};
