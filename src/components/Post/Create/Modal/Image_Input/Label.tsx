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
