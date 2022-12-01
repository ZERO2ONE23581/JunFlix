import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';
import { color } from '../../../../styles/variants';

interface IComments {
  _data: {
    theme: boolean;
    sliced: boolean;
    rep_length: number;
    setSliced: Dispatch<SetStateAction<boolean>>;
  };
}
export const More = ({ _data }: IComments) => {
  const { theme, sliced, rep_length, setSliced } = _data;

  return (
    <>
      {
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={{ theme }}
          variants={moreVar}
          onClick={() => setSliced((p) => !p)}
        >
          <span>------</span>
          {sliced && (
            <>
              <span>See</span>
              <span>({rep_length - 1})</span>
              <span>more</span>
              <span>{rep_length - 1 > 1 ? 'replies' : 'reply'}</span>
            </>
          )}
          {!sliced && (
            <>
              <span>Fold</span>
              <span>({rep_length - 1})</span>
              <span>{rep_length - 1 > 1 ? 'replies' : 'reply'}</span>
            </>
          )}
          <span>------</span>
        </Cont>
      }
    </>
  );
};
const Cont = styled(Flex)`
  gap: 0.3rem;
  opacity: 0.9;
  cursor: pointer;
  font-size: 1.05rem;
  font-style: italic;
`;
const moreVar = {
  exit: () => ({ opacity: 0, scale: 0 }),
  initial: () => ({ opacity: 0, scale: 0 }),
  hover: () => ({ color: '#E50914', transition: { duration: 0.5 } }),
  animate: ({ theme }: any) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
  }),
};
