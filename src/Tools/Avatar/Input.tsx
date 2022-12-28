import { Svg } from '../Svg';
import { avatarLink } from '.';
import styled from '@emotion/styled';
import { Flex } from '../../../styles/global';
import { border } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { useResponsive } from '../../libs/client/useTools';

export interface IAvatarInput {
  _data: {
    theme: boolean;
    preview: string;
    avatar?: string | null;
    reset: UseFormReset<any>;
    register: UseFormRegister<any>;
    setPreview: Dispatch<SetStateAction<string>>;
  };
}
export const AvatarInput = ({ _data }: IAvatarInput) => {
  const { isDesk } = useResponsive();
  const { avatar, register, theme, preview, setPreview } = _data;
  const [disabled, setDisabled] = useState(false);
  const clickTrash = () => {
    setPreview('');
    setDisabled(true);
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
            <>
              {avatar && (
                <Img
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  variants={imgVar}
                  src={avatarLink(avatar)}
                />
              )}
              {!avatar && (
                <NoPreview className="no_preview">
                  <Svg type="user" theme={theme} item={{ size: '4rem' }} />
                </NoPreview>
              )}
            </>
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
  overflow: hidden;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  .trash {
    z-index: 111;
    left: 1.8rem;
    bottom: 1.8rem;
    position: absolute;
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
