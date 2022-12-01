import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Flex } from '../../../../../../styles/global';
import { color } from '../../../../../../styles/variants';
import { useUser } from '../../../../../libs/client/useUser';

interface IHide {
  _data: {
    hide: boolean;
    theme: boolean;
    length: number;
    setHide: Dispatch<SetStateAction<boolean>>;
  };
}
export const Hide = ({ _data }: IHide) => {
  const { theme, length, setHide, hide } = _data;
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const clickMore = () => {
    if (!isLoggedIn) router.push('/login');
    setHide((p) => !p);
  };
  useEffect(() => {
    if (length! >= 2) setHide(true);
  }, [setHide, length]);
  return (
    <>
      {Boolean(length) && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={theme}
          onClick={clickMore}
          variants={variants}
        >
          <span>------</span>
          {hide && (
            <>
              <span>See</span>
              <span>({length})</span>
              <span>{length! > 1 ? 'replies' : 'reply'}</span>
            </>
          )}
          {!hide && (
            <>
              <span>(Fold)</span>
            </>
          )}
          <span>------</span>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 0.2rem;
  cursor: pointer;
  font-style: italic;
  width: fit-content;
  margin-bottom: 0.5rem;
  justify-content: flex-start;
`;
const variants = {
  exit: (theme: boolean) => ({ opacity: 0 }),
  initial: (theme: boolean) => ({ opacity: 0 }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  hover: (theme: boolean) => ({
    opacity: 1,
    color: '#E50914',
    transition: { duration: 0.5 },
  }),
};
