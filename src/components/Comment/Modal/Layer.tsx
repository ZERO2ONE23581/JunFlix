import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Layer_ } from '../../../../styles/global';

interface ICmtModalLayer {
  _data: {
    theme: boolean;
    closeModal: () => void;
  };
}
export const Layer = ({ _data }: ICmtModalLayer) => {
  const { theme, closeModal } = _data;
  return (
    <Cont>
      <div>
        <Svg
          type="close_"
          theme={theme}
          onClick={closeModal}
          item={{ size: '1.8rem' }}
        />
      </div>
      <div>
        <h1 className="title">Comments</h1>
        <Svg type="comments" theme={theme} onClick={closeModal} />
      </div>
      <div />
    </Cont>
  );
};
const Cont = styled(Layer_)`
  padding: 0.8rem 1rem;
  border-bottom: 1px dotted ${(p) => p.theme.color.font};
  > div {
    :nth-of-type(2) {
      h1 {
        font-size: 1.6rem;
        margin-right: 1rem;
      }
    }
  }
`;
