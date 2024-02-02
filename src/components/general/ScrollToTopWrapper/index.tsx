import ScrollToTop from 'components/animation/scroll-to-top';

import React from 'react';

interface IProps {
  children: React.ReactElement;
}

const ScrollToTopWrapper = ({ children }: IProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

export default ScrollToTopWrapper;
