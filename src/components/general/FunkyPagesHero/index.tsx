import Icon from 'utils/Icon';

interface IFunkyPagesHero {
  title: string;
  description: string;
  customBgClass?: string;
}

const FunkyPagesHero = ({ description, title, customBgClass }: IFunkyPagesHero) => {
  return (
    <div className='relative   min-h-[4rem] w-full overflow-hidden rounded-[16px]'>
      <div className={`absolute h-full w-full bg-primary-1 ${customBgClass ? customBgClass : ``}`}>
        <Icon name='funkyPagesHero' />
      </div>
      <div className='absolute z-[10] flex h-full w-full items-center  px-2 '>
        <div className='z-[10] flex  h-max w-max flex-col  items-center px-6 '>
          <h4 className='relative  text-[14px] font-[600] leading-[21px] tracking-[0.15px]  text-white'>
            {title}
            <div className='absolute -left-[1.5rem] -top-[1.5rem]'>
              <Icon name='funkyPagesTextTop' />
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FunkyPagesHero;
