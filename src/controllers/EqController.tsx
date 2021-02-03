import {EQ3} from 'tone';

interface EqState {
  setAttribute: (setState: {}) => void;
}

export type EqController = (props: {eq?: EQ3}) => EqState;

export const useEqController: EqController = ({eq}) => {
  const setAttribute = (setState: {}) => {
    eq?.set({...setState});
  };
  return {setAttribute};
};
