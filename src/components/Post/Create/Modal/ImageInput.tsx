import { Label } from './Label';
import styled from '@emotion/styled';
import { DeleteIcon } from './DeleteIcon';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IPostForm } from '../../../../types/post';
import { FlexCol } from '../../../../../styles/global';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IImageInput {
  _data: {
    theme: boolean;
    isNext: boolean;
    _watch: UseFormWatch<IPostForm>;
    _register: UseFormRegister<IPostForm>;
  };
}
export const ImageInput = ({ _data }: IImageInput) => {
  const { theme, isNext, _watch, _register } = _data;
  const id = 'post_image';
  const watch = _watch('post_image')!;
  const register = _register('post_image')!;
  const [preview, setPreview] = useState('');
  const custom = { preview, isNext, hidePrev: Boolean(!preview && isNext) };
  useEffect(() => {
    if (watch && watch.length > 0) {
      const file = watch[0];
      setPreview(URL.createObjectURL(file)!);
    } else setPreview('');
  }, [watch, setPreview]);

  return (
    <AnimatePresence>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        variants={create_vars}
        custom={{ ...custom }}
        className="image-input"
        style={{ overflow: 'hidden' }}
      >
        <Label _data={{ theme, preview, isNext, id }} />
        <DeleteIcon
          _data={{ theme, preview, isNext, onClick: () => setPreview('') }}
        />
        <input
          {...register}
          id={id}
          name={id}
          type="file"
          accept="image/*"
          disabled={isNext}
          style={{ display: 'none' }}
        />
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol)`
  overflow: hidden;
  position: relative;
`;
const create_vars = {
  initial: ({ isNext, hidePrev }: any) => ({
    ...scale_zero,
    transition: { duration: 0.5 },
    width: hidePrev ? '0%' : isNext ? '35%' : '100%',
    height: hidePrev ? '0%' : isNext ? '30%' : '100%',
  }),
  animate: ({ preivew, isNext, hidePrev }: any) => ({
    ...scale_one,
    x: isNext ? 30 : 0,
    y: isNext ? 10 : 0,
    transition: { duration: 0.5 },
    minHeight: preivew ? '10rem' : '0rem',
    marginBottom: isNext ? '0.5rem' : '0rem',
    width: hidePrev ? '0%' : isNext ? '30%' : '100%',
    height: hidePrev ? '0%' : isNext ? '30%' : '92%',
  }),
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
const scale_one = { scale: 1, opacity: 1 };
const scale_zero = { scale: 0.1, opacity: 0 };
