import { StateCreator } from 'zustand';
import { authDetailsInterface, userTypes } from 'types';

export type subcontractorStateType = {
  subContractorName: string;
  setsubContractor: (arg: string) => void;
};

const subcontractorStore: StateCreator<
  subcontractorStateType,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  subContractorName: 'jeff',
  setsubContractor: (arg) => {
    set({ subContractorName: arg });
  },
});

export default subcontractorStore;
