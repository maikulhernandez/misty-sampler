import {Chorus} from 'tone';
import {useState} from 'react';

interface ChorusState {
  isActive: boolean;
  handleOnStart: () => void;
  handleOnStop: () => void;
  handleWetSignalChange: (value: number) => void;
  handleDepthChange: (value: number) => void;
  handleSpreadChange: (value: number) => void;
  handleFrequencyChange: (value: number) => void;
  handleDelayChange: (value: number) => void;
  handleFeedbackChange: (value: number) => void;
}

export type ChorusController = (props: {chorus?: Chorus}) => ChorusState;

export const useChorusController: ChorusController = ({chorus}) => {
  const [isActive, setIsActive] = useState(false);

  const handleOnStart = () => {
    chorus?.start();
    setIsActive(true);
  };
  const handleOnStop = () => {
    chorus?.stop();
    setIsActive(false);
  };

  const handleWetSignalChange = (value: number) => {
    chorus?.set({wet: value});
  };
  const handleDepthChange = (value: number) => {
    chorus?.set({depth: value});
  };
  const handleSpreadChange = (value: number) => {
    chorus?.set({spread: value});
  };
  const handleFrequencyChange = (value: number) => {
    chorus?.set({frequency: value});
  };
  const handleDelayChange = (value: number) => {
    chorus?.set({delayTime: value});
  };
  const handleFeedbackChange = (value: number) => {
    chorus?.set({feedback: value});
  };

  return {
    isActive,
    handleOnStart,
    handleOnStop,
    handleWetSignalChange,
    handleDepthChange,
    handleSpreadChange,
    handleFrequencyChange,
    handleDelayChange,
    handleFeedbackChange,
  };
};
