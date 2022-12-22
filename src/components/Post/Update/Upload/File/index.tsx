import { Icon } from './Icon';
import { Click } from './Click';
import { Preview } from './Preview';
import styled from '@emotion/styled';
import { IPostUseform } from '../../../../../types/post';
import { FlexCol } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IFileInput extends IPostUseform {
  _data: {
    theme: boolean;
    preview: string;
    setPreview: Dispatch<SetStateAction<string>>;
  };
}
export const FileInput = ({ _data, _useform }: IFileInput) => {
  const input_id = 'post_image';
  const { watch, register } = _useform;
  const { theme, preview, setPreview } = _data;
  useEffect(() => {
    const image = watch!('post_image');
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watch!('post_image'), setPreview]);
  return (
    <Cont
      variants={vars}
      exit="exit"
      initial="initial"
      animate="animate"
      className="file-input"
    >
      <Label isNext={!open} htmlFor={'post_image'} className="img-label">
        <Click _data={{ preview, theme }} />
        <Preview _data={{ preview, isNext: !open }} />
      </Label>
      <Icon theme={theme} preview={preview} setPreview={setPreview} />
      <input
        {...register!(input_id)}
        id={input_id}
        disabled={!open}
        name={input_id}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  height: 80vh;
  min-width: 30vw;
  overflow: hidden;
  position: relative;
  label {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .delete-icon {
    top: 1rem;
    left: 1.5rem;
    position: absolute;
  }
  label {
    position: relative;
    .click {
      top: 50%;
      left: 50%;
      font-size: 2rem;
      font-weight: 400;
      position: absolute;
    }
  }
`;
const Label = styled.label<{ isNext: boolean }>`
  cursor: ${(p) => !p.isNext && 'pointer'};
`;
const vars = {
  exit: () => ({ opacity: 0, transition: { duration: 0.8 } }),
  initial: () => ({ opacity: 0, transition: { duration: 0.8 } }),
  animate: () => ({ opacity: 1, transition: { duration: 0.8 } }),
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
