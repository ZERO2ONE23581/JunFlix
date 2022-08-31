import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface ICounts {
  user: {
    ID: number;
    username: string;
  };
  counts: {
    posts: number;
    boards: number;
    reviews: number;
  };
}
export const Counts = ({ user, counts }: ICounts) => {
  const router = useRouter();
  return (
    <Contents>
      <li
        onClick={() =>
          router.push(`/user/${user?.ID}/${user?.username}/boards`)
        }
      >
        <label>Boards</label>
        <span>{counts?.boards}</span>
      </li>
      <li
        onClick={() => router.push(`/user/${user?.ID}/${user?.username}/posts`)}
      >
        <label>Posts</label>
        <span>{counts?.posts}</span>
      </li>
      <li
        onClick={() =>
          router.push(`/user/${user?.ID}/${user?.username}/reviews`)
        }
      >
        <label>Reviews</label>
        <span>{counts?.reviews}</span>
      </li>
    </Contents>
  );
};
const Contents = styled.ul`
  gap: 20px;
  width: 100%;
  border: none;
  display: flex;
  position: relative;
  justify-content: space-around;
  li {
    gap: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    label {
      cursor: pointer;
      font-size: 1.1rem;
    }
    span {
      cursor: pointer;
      font-size: 1.2rem;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
