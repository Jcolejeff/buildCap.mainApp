import Icon from 'utils/Icon';
import { iconTypes } from 'utils/Icon';

interface IFunkyPagesHero {
  title: string;
  description: string;
  customBgClass?: string;
  textColor?: string;
  iconType?: iconTypes;
}

const FunkyPagesHero = ({
  description,
  title,
  customBgClass,
  textColor,
  iconType,
}: IFunkyPagesHero) => {
  return (
    <div className='relative   min-h-[3rem] w-full overflow-hidden rounded-full'>
      <div className={`absolute h-full w-full bg-primary-1 ${customBgClass ? customBgClass : ``}`}>
        <Icon name={`${iconType ? iconType : 'funkyPagesHero'}`} />
      </div>
      <div className='absolute z-[10] flex h-full w-full items-center  px-2 '>
        <div className='z-[10] flex  h-max w-max flex-col  items-center px-6 '>
          <h4
            className={`relative  text-[14px] font-[600] leading-[21px] tracking-[0.15px] ${
              textColor ? textColor : `text-white`
            }  `}
          >
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FunkyPagesHero;
