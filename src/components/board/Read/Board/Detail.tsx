import styled from '@emotion/styled';
import { Flex } from '../../../../../styles/global';

interface IBoardDetail {
  _data: {
    Posts: number;
    Saved: number;
    onPrivate: boolean;
  };
}
export const Detail = ({ _data }: IBoardDetail) => {
  const { onPrivate, Posts, Saved } = _data;
  return (
    <Cont className="detail">
      <Flex>
        <Flex>
          <span>{onPrivate ? 'private' : 'public'}</span>
        </Flex>
        <Flex>
          <span>{Saved}</span>
          <span>saved</span>
        </Flex>
        <Flex>
          <span>{Posts}</span>
          <span>posts</span>
        </Flex>
      </Flex>
    </Cont>
  );
};
const Cont = styled.div`
  opacity: 0.9;
  > div {
    gap: 1rem;
    > div {
      gap: 1rem;
    }
  }
`;
