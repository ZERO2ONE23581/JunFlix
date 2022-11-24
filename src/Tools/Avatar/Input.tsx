import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { border, TransBorder, TweenTrans } from '../../../styles/variants';
import { useGetUser } from '../../libs/client/useUser';
import { Flex } from '../../../styles/global';
import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { avatarLink } from '.';

export interface IAvatarInput {
  _data: {
    theme: boolean;
    preview: string;
    reset: UseFormReset<any>;
    register: UseFormRegister<any>;
    setPreview: Dispatch<SetStateAction<string>>;
  };
}
export const AvatarInput = ({ _data }: IAvatarInput) => {
  const { reset, register, theme, preview, setPreview } = _data;
  const [disabled, setDisabled] = useState(false);
  const clickTrash = () => {
    setPreview('');
    setDisabled(true);
    //reset({ avatar: undefined });
  };
  return (
    <AnimatePresence>
      <label htmlFor="avatar" onClick={() => setDisabled(false)}>
        <Cont
          variants={vars}
          custom={{ theme }}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="avatar_input"
        >
          {preview && (
            <>
              <Svg
                item={{ size: '1.5rem' }}
                type="trash"
                theme={theme}
                onClick={clickTrash}
              />
              <Img
                src={preview}
                exit="exit"
                initial="initial"
                animate="animate"
                variants={imgVar}
              />
            </>
          )}
          {!preview && (
            <NoPreview>
              <Svg type="user" theme={theme} item={{ size: '4rem' }} />
            </NoPreview>
          )}
          <input
            {...register('avatar')}
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            disabled={disabled}
          />
        </Cont>
      </label>
    </AnimatePresence>
  );
};
const Cont = styled(Flex)`
  position: relative;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  margin-top: 1rem;
  overflow: hidden;
  .trash {
    left: 1.8rem;
    bottom: 1.8rem;
    position: absolute;
    z-index: 1111;
  }
  input {
    display: none;
  }
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
`;
const NoPreview = styled(Flex)`
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
  svg {
    pointer-events: none;
  }
`;
const vars = {
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: ({ theme }: any) => ({
    opacity: 1,
    borderRadius: '10%',
    outline: border(theme),
    transition: { duration: 0.5 },
  }),
  hover: () => ({
    borderRadius: '100%',
    transition: { duration: 0.5 },
    outline: '3px solid #E50914',
  }),
};
const imgVar = {
  exit: () => ({ opacity: 0, scale: 0.1 }),
  initial: () => ({ opacity: 0, scale: 0.1 }),
  animate: () => ({ opacity: 1, scale: 1, transition: { duration: 0.3 } }),
};
