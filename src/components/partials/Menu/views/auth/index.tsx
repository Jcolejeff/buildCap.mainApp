import { IDropNavTitles, menuLinks } from 'components/partials/app-nav';
import { sideNavLinks } from 'components/partials/side-nav';
import { DropdownMenuSeparator } from 'components/shadcn/dropdown-menu';
import CONSTANTS from 'constant';
import useCheckTypeOfUser from 'hooks/business-logic/useCheckTypeOfUser';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from 'store';
import Icon from 'utils/Icon';

const AuthMenu = ({ close }: { close: () => void }) => {
  const nav = useNavigate();
  const currentTypeOfUser = useStore((state) => state.typeOfUser);

  const navigate = (i: string) => {
    close();
    nav(i);
  };
  const { isAllowed } = useCheckTypeOfUser({ currentTypeOfUser: currentTypeOfUser });

  return (
    <div className='flex h-full w-full flex-col gap-[2.125rem]'>
      <div
        onClick={() => navigate(`/${CONSTANTS.ROUTES['dashboard']}`)}
        className={`group flex cursor-pointer items-center  gap-[0.625rem] rounded-[8px] p-4  transition-all duration-300
         ease-in-out hover:bg-primary-6 hover:text-primary-1
         ${isAllowed(`maincontractor`) ? `text-secondary-9` : `text-secondary-13`}
         `}
      >
        {!isAllowed(`maincontractor`) ? (
          <Icon
            name='padLock'
            svgProp={{
              width: 20,
              height: 20,
              className: 'group-hover:text-primary-1',
            }}
          />
        ) : (
          <Icon
            name='dashboardIcon'
            svgProp={{
              width: 20,
              height: 20,
              className: 'group-hover:text-primary-1',
            }}
          />
        )}
        <span className='text-[16px] font-[400] leading-[20px]'>Overview</span>
      </div>
      <div className='flex flex-col'>
        {sideNavLinks['discussions']?.map((i, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/${i?.link}`)}
            className={`group flex cursor-pointer items-center  gap-[0.625rem] rounded-[8px] p-4  
              text-secondary-9
           transition-all hover:bg-primary-6 hover:text-primary-1`}
          >
            {i.icons}
            <span className='text-[16px] font-[400] leading-[20px]'>{i?.title}</span>
          </div>
        ))}
      </div>

      <div className='flex flex-col'>
        {sideNavLinks['features']?.map((i, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/${i?.link}`)}
            className={`group flex cursor-pointer items-center  gap-[0.625rem] rounded-[8px] p-4  
              text-secondary-9
             transition-all hover:bg-primary-6 hover:text-primary-1`}
          >
            {i.icons}
            <span className='text-[16px] font-[400] leading-[20px]'>{i?.title}</span>
          </div>
        ))}
      </div>

      <DropdownMenuSeparator className='border-b-2 border-extraColor-borderBottom-2' />
      <div className='flex flex-col '>
        <div className='mb-4 flex items-center gap-2 px-4'>
          <div className='h-max w-max rounded-[50px] border border-extraColor-borderBottom-2'>
            <Icon name='demoDp' />
          </div>
          <div className='flex flex-col text-[14px] tracking-[0.15px]'>
            <h6 className='font-inter font-[600] text-textColor-primary'>John Doe</h6>
            <span className='text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
              User
            </span>
          </div>
        </div>
        {menuLinks['level1']?.map((i, idx) => (
          <div
            onClick={() => navigate(`/${i?.link}`)}
            key={idx}
            className='flex cursor-pointer items-center gap-[0.63rem]  p-4 text-[14px] leading-[21px] tracking-[0.15px] text-secondary-13 transition-colors duration-300 ease-in-out hover:text-textColor-primary'
          >
            <div className='flex items-center'>{i?.icons}</div>
            <div className='flex flex-grow justify-between'>
              {' '}
              <span>{i?.title}</span>
            </div>
          </div>
        ))}
        {menuLinks['level2']
          ?.filter((i) => i?.title === 'Settings')
          ?.map((i, idx) => (
            <div
              onClick={() => navigate(`/${i?.link}`)}
              key={idx}
              className='flex cursor-pointer items-center gap-[0.63rem]  p-4 text-[14px] leading-[21px] tracking-[0.15px] text-secondary-13 transition-colors duration-300 ease-in-out hover:text-textColor-primary'
            >
              <div className='flex items-center'>{i?.icons}</div>
              <div className='flex flex-grow justify-between'>
                {' '}
                <span>{i?.title}</span>
              </div>
            </div>
          ))}
        {menuLinks['level3']?.map((i, idx) => (
          <div
            onClick={() => navigate(`/${i?.link}`)}
            key={idx}
            className='flex cursor-pointer items-center gap-[0.63rem] p-4 text-[14px] leading-[21px] tracking-[0.15px] text-danger-2 transition-colors duration-300 ease-in-out hover:text-danger-1'
          >
            <div className='flex items-center'>{i?.icons}</div>
            <div className='flex flex-grow justify-between'>
              {' '}
              <span>{i?.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthMenu;
