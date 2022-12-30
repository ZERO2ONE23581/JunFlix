import styled from '@emotion/styled';
import { useResponsive } from '../../../../../libs/client/useTools';
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
  const { isDesk } = useResponsive();
  const { id, theme, preview, isNext } = _data;
  return (
    <Cont isDesk={isDesk} isNext={isNext!} htmlFor={id} className="img-label">
      <Preview _data={{ preview, isNext }} />
      <Click _data={{ theme, preview }} />
    </Cont>
  );
};

const Cont = styled.label<{ isNext: boolean; isDesk: boolean }>`
  cursor: ${(p) => !p.isNext && 'pointer'};
  width: 100%;
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  position: relative;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  height: ${(p) => (p.isDesk ? '65vh' : '166vh')};
  font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
  border: 2px solid ${(p) => p.theme.color.font};
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
