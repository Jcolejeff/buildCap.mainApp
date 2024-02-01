import { navLinks as majorNavLinks, navTitleTypes } from 'components/partials/external-nav';
import { useNavigate } from 'react-router-dom';
import { ItitleLinks, routePathTypes } from 'types';

const NonAuthMenu = ({ close }: { close: () => void }) => {
  const nav = useNavigate();

  const navigate = (i: string) => {
    close();
    nav(i);
  };

  const navLinks: ItitleLinks<navTitleTypes | 'Login' | 'Sign Up', routePathTypes>[] = [
    ...majorNavLinks,

    {
      title: 'Login',
      link: 'login',
    },
    {
      title: 'Sign Up',
      link: 'create-account',
    },
  ];

  return (
    <div className='h-full w-full flex-col'>
      {navLinks?.map((i, idx) => (
        <div
          onClick={() => navigate(`/${i?.link}`)}
          key={idx}
          className='cursor-pointer rounded-[8px] p-4 text-[16px] font-[400] text-secondary-12 transition-all duration-300 ease-in-out hover:bg-primary-6 hover:text-primary-1'
        >
          {i?.title}
        </div>
      ))}
    </div>
  );
};

export default NonAuthMenu;
