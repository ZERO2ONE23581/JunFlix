import styled from '@emotion/styled';
import { ProfileAvatar } from '../Avatar/Profile';
import { FormCont } from '../../../../styles/global';
import { BoardPostList } from '../Post/BoardPostList';
import { IBoardWithAttrs } from '../../../types/board';

interface IBoardDetailProps {
  board?: IBoardWithAttrs;
  isMyBoard?: boolean;
}
export const BoardDetail = ({ board }: IBoardDetailProps) => {
  return (
    <Cont>
      <div>
        <div className="flex">
          <Title>{board?.title}</Title>
          <Counts>
            <div className="counts">
              <span>Posts</span>
              <span className="number">{board?._count.posts}</span>
            </div>
            <div className="counts">
              <span>Followers</span>
              <span className="number">{board?._count.followers}</span>
            </div>
          </Counts>
        </div>
        <div className="flex">
          <Description>
            <ProfileAvatar url={board?.user.avatar} size={100} />
            <Info>
              <li>
                <span>크리에이터: </span>
                <span className="data">{board?.user.username}</span>
              </li>
              <li>
                <span>보드장르: </span>
                <span className="data">{board?.genre}</span>
              </li>
              <li>
                <span>소개글: </span>
                {board?.intro && <p className="data">"{board?.intro}"</p>}
              </li>
            </Info>
          </Description>
        </div>
      </div>
      <div className="post">
        <BoardPostList />
      </div>
    </Cont>
  );
};
const Cont = styled(FormCont)`
  margin-top: 30px;
  padding: 30px 90px;
  .flex {
    gap: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .post {
    margin-top: 20px;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;
const Description = styled.article`
  margin-top: 10px;
  gap: 20px;
  display: flex;
  align-items: center;
`;
const Info = styled.ul`
  li {
    margin-bottom: 3px;
    p {
      margin-top: 5px;
    }
  }
  .data {
    margin-left: 5px;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;
const Counts = styled.article`
  gap: 40px;
  display: flex;
  align-items: center;
  .counts {
    font-size: 1.5rem;
    font-weight: 500;
    .number {
      margin-left: 10px;
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;
