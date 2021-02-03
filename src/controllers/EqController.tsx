import {EQ3} from 'tone';

interface EqState {
  handleLowChange: (value: number) => void;
  handleMidChange: (value: number) => void;
  handleHighChange: (value: number) => void;
}

export type EqController = (props: {eq?: EQ3}) => EqState;

export const useEqController: EqController = ({eq}) => {
  const handleLowChange = (value: number) => {
    eq?.set({low: value});
  };
  const handleMidChange = (value: number) => {
    eq?.set({mid: value});
  };
  const handleHighChange = (value: number) => {
    eq?.set({mid: value});
  };

  return {handleLowChange, handleMidChange, handleHighChange};
};
