import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'components/shadcn/ui/navigation-menu';

import { url } from 'lib/utils';
interface INavDrop {
  darkNavBg?: boolean;
}

const NavDrop = ({ darkNavBg }: INavDrop) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className=''>
          <NavigationMenuItem>
            <span className=' block cursor-pointer px-8 font-[400]  leading-[1.5rem] tracking-[0.005rem] text-white lg:text-[1rem]'>
              <a href={url('/about-us')}>About</a>
            </span>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <span
              className={` block cursor-pointer px-8  font-[400]  leading-[1.5rem]  tracking-[0.005rem] text-white lg:text-[1rem] `}
            >
              <a href={url('/#features')}>Features</a>
            </span>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <span
              className={` block cursor-pointer px-8 font-[400]  leading-[1.5rem]  tracking-[0.005rem] text-white lg:text-[1rem] `}
            >
              <a href={url('/terms')}>Terms </a>
            </span>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <span
              className={`  block cursor-pointer whitespace-nowrap px-8 font-[400]  leading-[1.5rem]  tracking-[0.005rem] text-white lg:text-[1rem] `}
            >
              <a href={url('/contact-us')}>Contact Us</a>
            </span>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavDrop;
