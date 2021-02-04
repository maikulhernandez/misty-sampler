import {Chorus} from 'tone';
import {useState} from 'react';

interface ChorusState {
  isActive: boolean;
  handleOnStart: () => void;
  handleOnStop: () => void;
  handleParameterChange: (newParam: {}) => void;
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

  const handleParameterChange = (newParam: {
    wet?: number;
    depth?: number;
    spread?: number;
    frequency?: number;
    delayTime?: number;
    feedback?: number;
  }) => {
    chorus?.set({...newParam});
  };

  return {
    isActive,
    handleOnStart,
    handleOnStop,
    handleParameterChange,
  };
};
