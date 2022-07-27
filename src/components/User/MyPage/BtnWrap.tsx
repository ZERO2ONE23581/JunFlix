import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';

interface IBtnWrap {
  type: string;
  SelectType: (type: string) => void;
}
export const BtnWrap = ({ type, SelectType }: IBtnWrap) => {
  return (
    <Cont type={type}>
      <Btn
        type="button"
        name="My Boards"
        CLASSNAME="board"
        onClick={() => SelectType('board')}
      />
      <Btn
        type="button"
        name="My Posts"
        CLASSNAME="post"
        onClick={() => SelectType('post')}
      />
      <Btn
        type="button"
        name="My Reviews"
        CLASSNAME="review"
        onClick={() => SelectType('review')}
      />
      <Btn
        type="button"
        name="My Likes"
        CLASSNAME="likes"
        onClick={() => SelectType('likes')}
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
    min-width: 130px;
    border-radius: 8px;
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
    border: 3px solid ${(p) => p.theme.color.font};
    :hover {
      color: ${(p) => p.theme.color.bg};
      background-color: ${(p) => p.theme.color.font};
    }
  }
  .board {
    font-weight: ${(p) => p.type === 'board' && 550};
    color: ${(p) => p.type === 'board' && p.theme.color.logo};
    border-color: ${(p) => p.type === 'board' && p.theme.color.logo};
    :hover {
      color: ${(p) => p.type === 'board' && p.theme.color.font};
      background-color: ${(p) => p.type === 'board' && p.theme.color.logo};
    }
  }
  .post {
    font-weight: ${(p) => p.type === 'post' && 550};
    color: ${(p) => p.type === 'post' && p.theme.color.logo};
    border-color: ${(p) => p.type === 'post' && p.theme.color.logo};
    :hover {
      color: ${(p) => p.type === 'post' && p.theme.color.font};
      background-color: ${(p) => p.type === 'post' && p.theme.color.logo};
    }
  }
  .review {
    font-weight: ${(p) => p.type === 'review' && 550};
    color: ${(p) => p.type === 'review' && p.theme.color.logo};
    border-color: ${(p) => p.type === 'review' && p.theme.color.logo};
    :hover {
      color: ${(p) => p.type === 'review' && p.theme.color.font};
      background-color: ${(p) => p.type === 'review' && p.theme.color.logo};
    }
  }
  .likes {
    font-weight: ${(p) => p.type === 'likes' && 550};
    color: ${(p) => p.type === 'likes' && p.theme.color.logo};
    border-color: ${(p) => p.type === 'likes' && p.theme.color.logo};
    :hover {
      color: ${(p) => p.type === 'likes' && p.theme.color.font};
      background-color: ${(p) => p.type === 'likes' && p.theme.color.logo};
    }
  }
`;
