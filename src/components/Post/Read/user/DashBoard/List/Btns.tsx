import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Btn } from '../../../../../../Tools/Button';

interface IBtnWrap {
  type: string;
  username: string;
  setType: Dispatch<SetStateAction<string>>;
}
export const BtnWrap = ({ username, type, setType }: IBtnWrap) => {
  return (
    <Cont type={type}>
      <Btn
        type="button"
        name={`${username}'s Boards`}
        onClick={() => setType('board')}
        isclicked={Boolean(type === 'board')}
      />
      <Btn
        type="button"
        name={`${username}'s Posts`}
        onClick={() => setType('post')}
        isclicked={Boolean(type === 'post')}
      />
      <Btn
        type="button"
        name={`${username}'s Reviews`}
        onClick={() => setType('review')}
        isclicked={Boolean(type === 'review')}
      />
      <Btn
        type="button"
        name={`${username}'s Likes`}
        onClick={() => setType('like')}
        isclicked={Boolean(type === 'like')}
      />
    </Cont>
  );
};
const Cont = styled.div<{ type: string }>`
  gap: 10rem;
  display: flex;
  margin: 20px 0 30px;
  align-items: center;
  justify-content: center;
  button {
    font-size: 1rem;
    padding: 10px 12px;
    border-radius: 5px;
  }
`;
