import CONSTANTS from 'constant';
import useCheckTypeOfUser from 'hooks/business-logic/useCheckTypeOfUser';
import { useMemo } from 'react';
import useStore from 'store';
import { routePathTypes } from 'types';

interface IUserPageGuard {
  page: routePathTypes;
  children: JSX.Element;
}

const UserPageGuard = ({ children, page }: IUserPageGuard) => {
  const currentTypeOfUser = useStore((state) => state?.typeOfUser);
  const { isAllowed } = useCheckTypeOfUser({ currentTypeOfUser: currentTypeOfUser });

  const allowed = useMemo(() => {
    const typeOfUser = CONSTANTS.USER_PAGES_PERMISSIONS[page];
    return isAllowed(typeOfUser);
  }, [isAllowed, page]);

  return allowed ? (
    children
  ) : (
    <section className='flex w-full flex-grow flex-col items-center justify-center gap-4 pt-8'>
      <div></div>
      <p className='text-[14px] leading-[20px] tracking-[0.15px] text-primary-1'>
        You are not allowed to access this page
      </p>{' '}
    </section>
  );
};

export default UserPageGuard;
