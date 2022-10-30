import styled from '@emotion/styled';
import { Label } from './Label';
import { useEffect, useState } from 'react';
import { IPostForm } from '../../../../../types/post';
import { AnimatePresence, motion } from 'framer-motion';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { DeleteIcon } from './Delete_Icon';
import { FlexCol } from '../../../../../../styles/global';

interface IImageInput {
  data: {
    theme: boolean;
    inputId?: string;
    isNext?: boolean;
    _useform: {
      watch: UseFormWatch<IPostForm>;
      register: UseFormRegister<IPostForm>;
    };
  };
}
export const ImageInput = ({ data }: IImageInput) => {
  const id = 'post_image';
  const theme = data?.theme!;
  const isNext = data?.isNext!;
  const watch = data?._useform?.watch('post_image')!;
  const register = data?._useform?.register('post_image')!;
  const [preview, setPreview] = useState('');
  const custom = { isNext, hidePrev: Boolean(!preview && isNext) };

  useEffect(() => {
    if (watch && watch.length > 0) {
      const file = watch[0];
      setPreview(URL.createObjectURL(file)!);
    } else setPreview('');
  }, [watch, setPreview]);

  return (
    <AnimatePresence>
      <FlexCol
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
      </FlexCol>
    </AnimatePresence>
  );
};

const create_vars = {
  initial: ({ isNext, hidePrev }: any) => ({
    ...scale_zero,
    transition: { duration: 0.5 },
    width: hidePrev ? '0%' : isNext ? '35%' : '100%',
    height: hidePrev ? '0%' : isNext ? '30%' : '100%',
  }),
  animate: ({ isNext, hidePrev }: any) => ({
    ...scale_one,
    x: isNext ? 30 : 0,
    y: isNext ? 10 : 0,
    transition: { duration: 0.5 },
    width: hidePrev ? '0%' : isNext ? '30%' : '100%',
    height: hidePrev ? '0%' : isNext ? '30%' : '92%',
  }),
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
const scale_one = { scale: 1, opacity: 1 };
const scale_zero = { scale: 0.1, opacity: 0 };
