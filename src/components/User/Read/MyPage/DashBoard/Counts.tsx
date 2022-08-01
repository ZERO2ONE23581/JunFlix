import useSWR from 'swr';
import { IGet } from '../List';
import styled from '@emotion/styled';

export const Counts = () => {
  const { data: BOARD } = useSWR<IGet>(`/api/user/my/boards`);
  const { data: POST } = useSWR<IGet>(`/api/user/my/posts`);
  const { data: REVIEW } = useSWR<IGet>(`/api/user/my/reviews`);
  return (
    <Cont>
      <li>
        <label>Boards</label>
        <span>{BOARD?.boards?.length}</span>
      </li>
      <li>
        <label>Posts</label>
        <span>{POST?.posts?.length}</span>
      </li>
      <li>
        <label>Reviews</label>
        <span>{REVIEW?.reviews?.length}</span>
      </li>
    </Cont>
  );
};
const Cont = styled.ul`
  padding: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    label {
      opacity: 0.8;
      margin-right: 10px;
      color: ${(p) => p.theme.color.logo};
    }
    span {
      display: block;
      margin-top: 5px;
    }
  }
`;
