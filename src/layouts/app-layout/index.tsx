import ScrollToTop from 'components/animation/scroll-to-top';
import AppNav from 'components/partials/app-nav';
import SideNav from 'components/partials/side-nav';
import { useOutlet } from 'react-router-dom';
import { ExternalNav } from 'components/partials/external-nav';

const AppLayout = () => {
  const outlet = useOutlet();

  return (
    <main className='h-full w-full'>
      {/* <ExternalNav /> */}

      <div className='flex h-full w-full '>
        <aside className='z-[1] hidden h-full w-max overflow-visible md:flex'>
          <SideNav />
        </aside>
        <main className='flex flex-grow flex-col bg-primary-2'>
          <ScrollToTop />
          <AppNav />
          <section className='no-scrollbar relative mx-auto h-full w-full max-w-[70.75rem] overflow-auto'>
            <ScrollToTop />
            {outlet}
          </section>
        </main>
      </div>
    </main>
  );
};

export default AppLayout;
