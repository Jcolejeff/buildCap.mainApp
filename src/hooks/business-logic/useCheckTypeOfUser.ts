import { useCallback } from 'react';
import { userTypes } from 'types';

interface IAllowedTypesOfUsers {
  currentTypeOfUser: userTypes;
}

const usersAllowed: Record<userTypes, userTypes> = {
  admin: 'admin',
  maincontractor: 'maincontractor',
  subcontractor: 'subcontractor',
  supplier: 'supplier',
};

function useCheckTypeOfUser({ currentTypeOfUser }: IAllowedTypesOfUsers) {
  const isAllowed = useCallback(
    (allowedUser: userTypes) => {
      return usersAllowed[currentTypeOfUser] === usersAllowed[allowedUser] ? true : false;
    },
    [currentTypeOfUser],
  );

  return { isAllowed };
}

export default useCheckTypeOfUser;
