import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction, useState } from 'react';

interface IBoardBtnWrap {
  isPost: boolean;
  isHost: boolean;
  setIsPost: Dispatch<SetStateAction<boolean>>;
  setIsDel: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  isPost,
  isHost,
  setIsPost,
  setIsDel,
}: IBoardBtnWrap) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [clickSetting, setClickSetting] = useState(false);

  return (
    <Cont>
      {!clickSetting && (
        <Btn
          name="Boards"
          type="button"
          clicked={false}
          onClick={() => router.push(`/user/all/boards`)}
        />
      )}
      {isHost && (
        <>
          {!clickSetting && (
            <Btn
              name="Post"
              type="button"
              clicked={isPost}
              onClick={() => setIsPost(true)}
            />
          )}
          <Btn
            name="Setting"
            type="button"
            clicked={clickSetting}
            onClick={() => setClickSetting((p) => !p)}
          />
        </>
      )}
      {clickSetting && (
        <>
          <Btn
            name="Edit"
            type="button"
            onClick={() =>
              router.push(`/user/${user_id}/board/${board_id}/edit`)
            }
          />
          <Btn
            name="Delete"
            type="button"
            clicked={false}
            onClick={() => setIsDel((p: boolean) => !p)}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 5px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  gap: 15px;
  display: flex;
  align-items: center;
  button {
    width: 80px;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 6px 10px;
    border-radius: 3px;
  }
`;
