import { StateCreator } from 'zustand';
import { authDetailsInterface, userTypes } from 'types';

export type AuthStateType = {
  authLoading: boolean;
  loggedIn: boolean;
  typeOfUser: userTypes;
  setLoggedIn: (arg: boolean) => void;
  setPlan: (arg: userTypes) => void;
  setAuthLoading: (arg: boolean) => void;
  authDetails: authDetailsInterface;
  setAuthDetails: (arg: authDetailsInterface) => void;
  appId: string;
  setAppId: (arg: string) => void;
  pageId: string;
  setPageId: (arg: string) => void;
  currentApp: any;
  setCurrentApp: (arg: any) => void;
  currentPage: any;
  setCurrentPage: (arg: any) => void;
  currentWorkflow: any;
  setCurrentWorkflow: (arg: any) => void;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  searchInput: string;
  setSearchInput: (arg: string) => void;
  filteredApps: any[];
  setFilteredApps: (arg: any[]) => void;
};

const authStore: StateCreator<AuthStateType, [['zustand/devtools', never]], []> = (set) => ({
  searchInput: '',
  setSearchInput: (arg) => {
    set({ searchInput: arg });
  },
  filteredApps: [],
  setFilteredApps: (arg) => {
    set({ filteredApps: arg });
  },
  authLoading: true,
  loggedIn: false,
  appId: '',
  setAppId: (arg) => {
    set({ appId: arg });
  },
  isLoading: true,
  setIsLoading: (arg) => {
    set({ isLoading: arg });
  },
  currentApp: {},
  setCurrentApp: (arg) => {
    set({ currentApp: arg });
  },
  currentPage: {},
  setCurrentPage: (arg) => {
    set({ currentPage: arg });
  },
  currentWorkflow: {},
  setCurrentWorkflow: (arg) => {
    set({ currentWorkflow: arg });
  },
  pageId: '',
  setPageId: (arg) => {
    set({ pageId: arg });
  },
  typeOfUser: 'maincontractor',
  setAuthLoading: (arg) => {
    set({ authLoading: arg });
  },
  setLoggedIn: (arg) => {
    set({ loggedIn: arg });
  },
  setPlan: (arg) => {
    set({ typeOfUser: arg });
  },
  authDetails: {},
  setAuthDetails: (arg) => {
    set({ authDetails: arg });
  },
});

export default authStore;
