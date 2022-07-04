import { useState } from 'react';
import { Answer } from './Answer';
import styled from '@emotion/styled';
import { ListInfo } from './ListInfo';
import { IsOwner } from '../../IsOwner';
import { useRouter } from 'next/router';
import { Grid } from '../../../../styles/global';
import { WithAvatar } from '../../Avatar/AvatarInput';
import { IBoardListProps } from '../../../types/board';
import { IconBtnFixed } from '../../Style/Button/IconBtnFixed';
import useUser from '../../../libs/client/useUser';

interface IClickBoardProps {
  isCreate?: boolean;
  USERID: number;
  BOARDID?: number;
  TITLE?: string;
}
export const BoardList = ({ boards }: IBoardListProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const clickBoard = ({
    isCreate,
    USERID,
    BOARDID,
    TITLE,
  }: IClickBoardProps) => {
    if (isCreate) return router.push(`/user/${USERID}/board/create`);
    return router.push(`/user/${USERID}/board/${BOARDID}/${TITLE}`);
  };
  const [question, setQuestion] = useState(false);
  return (
    <>
      {boards?.length > 0 ? (
        <>
          <Grid size={5}>
            {boards?.map((board) => (
              <Board key={board.id} avatar={board.avatar}>
                <Button
                  onClick={() =>
                    clickBoard({
                      USERID: board.UserID,
                      BOARDID: board.id,
                      TITLE: board.title,
                    })
                  }
                />
                <ListInfo board={board} />
                <IsOwner USERID={board.UserID} />
                <IconBtnFixed
                  type="button"
                  svgType="add"
                  isClicked={false}
                  onClick={() =>
                    clickBoard({
                      isCreate: true,
                      USERID: loggedInUser?.id!,
                    })
                  }
                />
              </Board>
            ))}
            <IconBtnFixed
              type="button"
              svgType="question"
              isClicked={question}
              onClick={() => setQuestion(true)}
            />
          </Grid>
          {question && <Answer openModal={setQuestion} />}
        </>
      ) : (
        <>
          <h1>보드가 존재하지 않습니다...</h1>
        </>
      )}
    </>
  );
};
const Button = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  background: none;
`;
const Board = styled(WithAvatar)`
  display: flex;
  justify-content: end;
  flex-direction: column;
  min-width: 200px;
  min-height: 350px;
  border-radius: 3px;
  .is-owner {
    svg {
      top: 5%;
      left: 5%;
    }
  }
  .add {
    bottom: 20%;
  }
`;
