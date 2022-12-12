import styled from '@emotion/styled';
import { Svg } from '../../../../../../../Tools/Svg';
import { Flex } from '../../../../../../../../styles/global';

interface ILayer {
  _data: {
    theme: boolean;
    isFollower: boolean;
    closeModal: () => void;
  };
}
export const Layer = ({ _data }: ILayer) => {
  const { theme, closeModal, isFollower } = _data;
  const TITLE = isFollower ? 'Follower' : 'Following';
  return (
    <Cont>
      <div>
        <Svg type="close_" theme={theme} onClick={closeModal} />
      </div>
      <div>
        <h1>{TITLE}</h1>
      </div>
      <div className="null" />
    </Cont>
  );
};

const Cont = styled(Flex)`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  .null {
    width: 2rem;
  }
`;
