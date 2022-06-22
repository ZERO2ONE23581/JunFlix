import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { FollowCounts } from './Follow/counts';
import { Dispatch, SetStateAction } from 'react';
import { ProfileAvatar } from '../Avatar/Profile';
import useUser from '../../../libs/client/useUser';
import { FormCont } from '../../../../styles/global';
import { IsHostSvg } from '../../Style/Svg/IsHostSvg';
import { IBoardWithAttrs } from '../../../types/board';
import { FollowBoardBtn } from './Follow/FollowBoardBtn';

interface IBoardDetailProps {
  isPost: boolean;
  board?: IBoardWithAttrs;
  setIsDel: Dispatch<SetStateAction<boolean>>;
  setIsPost: Dispatch<SetStateAction<boolean>>;
}
export const BoardDetail = ({
  isPost,
  board,
  setIsDel,
  setIsPost,
}: IBoardDetailProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const isHost = Boolean(isLoggedIn && loggedInUser?.id === board?.UserID);
  return (
    <>
      <Cont>
        <Creator>
          <ProfileAvatar url={board?.user.avatar} size={140} />
          <div className="host">
            <span className="dim">Host:</span>
            <span className="name">{board?.user.username}</span>
          </div>
        </Creator>
        <Board>
          <article className="title">
            <h1>
              <span>{board?.title}</span>
              <span>
                <IsHostSvg
                  USERID={board?.UserID!}
                  property={{ size: 28, top: -2, right: -50 }}
                />
                {!isHost && (
                  <FollowBoardBtn
                    ID={{ USERID: board?.UserID!, BOARDID: board?.id! }}
                    property={{ size: 35, top: -2, right: -70 }}
                  />
                )}
              </span>
            </h1>
            <BtnWrap
              isPost={isPost}
              setIsPost={setIsPost}
              isHost={isHost}
              setIsDel={setIsDel}
            />
          </article>
          <Info>
            <ul>
              <li>
                <FollowCounts counts={board?._count} />
              </li>
              <li>
                <span className="item">보드장르</span>
                <span className="dim">"{board?.genre}"</span>
              </li>
              <li>
                <span className="item">소개글:</span>
                {board?.intro && <p className="dim intro">"{board?.intro}"</p>}
              </li>
            </ul>
          </Info>
        </Board>
      </Cont>
    </>
  );
};
const Cont = styled(FormCont)`
  gap: 100px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .dim {
    opacity: 0.6;
    font-weight: 600;
  }
`;
const Creator = styled.article`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .host {
    span {
      margin-right: 10px;
    }
    .name {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
`;
const Board = styled.article`
  min-width: 620px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0;
      position: relative;
    }
  }
`;
const Info = styled.ul`
  font-size: 1.1rem;
  li {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dotted ${(p) => p.theme.color.font};
    span {
      margin-right: 10px;
    }
    .dim {
      font-size: 1.3rem;
    }
    .intro {
      margin-top: 10px;
      font-style: italic;
      font-weight: 500;
    }
  }
`;
