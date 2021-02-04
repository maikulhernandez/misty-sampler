import {EQ3} from 'tone';

interface EqState {
  handleLevelChange: (newLevel: {}) => void;
}

export type EqController = (props: {eq?: EQ3}) => EqState;

export const useEqController: EqController = ({eq}) => {
  const handleLevelChange = (newLevel: {
    low?: number;
    mid?: number;
    high?: number;
  }) => {
    eq?.set({...newLevel});
  };

  console.log('eq');

  return {handleLevelChange};
};
