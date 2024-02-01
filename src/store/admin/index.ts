import { StateCreator } from 'zustand';
import { authDetailsInterface, userTypes } from 'types';

export type adminStateType = {
  adminName: string;
  setadmin: (arg: string) => void;
};

const adminStore: StateCreator<adminStateType, [['zustand/devtools', never]], []> = (set) => ({
  adminName: 'jeff',
  setadmin: (arg) => {
    set({ adminName: arg });
  },
});

export default adminStore;
