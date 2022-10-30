import styled from '@emotion/styled';
import { Click } from '../../../Update/Upload/File/Click';
import { Preview } from '../../../Update/Upload/File/Preview';

interface ILabel {
  _data: {
    id: string;
    theme: boolean;
    preview: string;
    isNext: boolean;
  };
}
export const Label = ({ _data }: ILabel) => {
  const id = _data?.id!;
  const theme = _data?.theme!;
  const preview = _data?.preview!;
  const isNext = _data?.isNext!;
  return (
    <Cont isNext={isNext!} htmlFor={id} className="img-label">
      <Preview _data={{ preview, isNext }} />
      <Click _data={{ theme, preview }} />
    </Cont>
  );
};
const Cont = styled.label<{ isNext: boolean }>`
  cursor: ${(p) => !p.isNext && 'pointer'};
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  position: relative;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .click {
    top: 50%;
    left: 50%;
    position: absolute;
  }
`;
const scale_one = { scale: 1, opacity: 1 };
const scale_zero = { scale: 0.1, opacity: 0 };
const isHover = { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } };
const create_vars = {
  initial: ({ isNext, isHide }: any) => ({
    ...scale_zero,
    transition: { duration: 0.5 },
    width: isHide ? '0%' : isNext ? '35%' : '100%',
    height: isHide ? '0%' : isNext ? '30%' : '100%',
  }),
  animate: ({ isNext, isHide }: any) => ({
    ...scale_one,
    x: isNext ? 30 : 0,
    y: isNext ? 10 : 0,
    transition: { duration: 0.5 },
    width: isHide ? '0%' : isNext ? '30%' : '100%',
    height: isHide ? '0%' : isNext ? '30%' : '92%',
  }),
  hover: { ...isHover },
};
const update_vars = {
  initial: () => ({
    ...scale_zero,
    transition: { duration: 0.8 },
  }),
  animate: () => ({
    ...scale_one,
    transition: { duration: 0.8 },
  }),
  exit: () => ({
    x: 999,
    ...scale_zero,
    transition: { duration: 0.8 },
  }),
  hover: { ...isHover },
};
