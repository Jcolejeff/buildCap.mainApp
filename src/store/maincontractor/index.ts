import { StateCreator } from 'zustand';
import { authDetailsInterface, userTypes } from 'types';

export type maincontractorStateType = {
  mainContractorName: string;
  setmainContractor: (arg: string) => void;
};

const maincontractorStore: StateCreator<
  maincontractorStateType,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  mainContractorName: 'jeff',
  setmainContractor: (arg) => {
    set({ mainContractorName: arg });
  },
});

export default maincontractorStore;
