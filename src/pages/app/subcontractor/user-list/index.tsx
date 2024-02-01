import FunkyPagesHero from 'components/general/FunkyPagesHero';
import { useState } from 'react';
import UserPageGuard from 'guards/UserPageGuard';
import CONSTANTS from 'constant';

import Icon from 'utils/Icon';
import toast from 'helper';

type filterTypes = 'Trending' | 'Recently added' | 'Your Threads' | 'Starred' | 'Interactions';

const generalFilters: filterTypes[] = [
  'Trending',
  'Recently added',
  'Your Threads',
  'Starred',
  'Interactions',
];

const UserList = () => {
  const [url, setUrl] = useState<string>(
    `<--Global site tag (gtag.js) - Assistant --><script async src="https://www.assistantcreator.com/gtag/js?id=GA_MEASUREMENT_ID"></script><script> window.dataLayer = window.dataLayer || []  function gtag(){dataLayer.push(arguments);}  gtag('js', new Date()); gtag('config', 'GA_MEASUREMENT_ID');</script>`,
  );
  const [currFilter, setCurrFilter] = useState<filterTypes>('Trending');

  return (
    <UserPageGuard page={CONSTANTS.ROUTES['users-list']}>
      <div className='container flex w-full flex-col gap-6 px-container-base py-[1.875rem]'>
        <FunkyPagesHero
          description='manage your users here.
      '
          title='User List'
        />
      </div>
    </UserPageGuard>
  );
};

export default UserList;
