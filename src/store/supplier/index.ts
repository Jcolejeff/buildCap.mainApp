import { StateCreator } from 'zustand';
import { authDetailsInterface, userTypes } from 'types';

export type SupplierStateType = {
  supplierName: string;
  setSupplier: (arg: string) => void;
};

const supplierStore: StateCreator<SupplierStateType, [['zustand/devtools', never]], []> = (
  set,
) => ({
  supplierName: 'jeff',
  setSupplier: (arg) => {
    set({ supplierName: arg });
  },
});

export default supplierStore;
