import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';

interface IList {
  item: {
    step: number;
    title: string;
    theme: boolean;
    isStep: boolean;
    onClick: (text: string) => void;
    useError?: () => void;
  };
}
export const List = ({ item }: IList) => {
  const step = item.step;
  const theme = item.theme;
  const title = item.title;
  const isStep = item.isStep;
  const onClick = item.onClick;
  const isBackBtn = Boolean(step === 2 || step === 3);

  return (
    <>
      {isStep && (
        <>
          {step === 1 && (
            <Span>
              <Svg theme={theme} type={'X'} onClick={() => onClick('close')} />
            </Span>
          )}
          {isBackBtn && (
            <Span>
              <Svg
                theme={theme}
                type={'left-chev'}
                onClick={() => onClick('back')}
              />
            </Span>
          )}
          <Span>
            <h1>{title}</h1>
          </Span>
          {step === 1 && (
            <Span>
              <Btn
                type="button"
                item={{ theme, name: 'Next' }}
                onClick={() => onClick('next')}
              />
            </Span>
          )}
          {step === 2 && (
            <Span>
              <Btn type="submit" item={{ theme, name: 'Save' }} />
            </Span>
          )}
        </>
      )}
    </>
  );
};
export const Span = styled(motion.span)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  :first-of-type {
    justify-content: flex-start;
  }
  :nth-of-type(2) {
  }
  :last-of-type {
    justify-content: flex-end;
  }
  svg {
    display: block;
    position: static;
  }
`;
