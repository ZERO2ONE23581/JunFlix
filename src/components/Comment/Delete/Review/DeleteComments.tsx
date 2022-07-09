import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { IComment } from '../../ReadComment';
import { LoadingModal } from '../../../LoadingModal';
import { ICommentRes } from '../../../../types/comments';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DimBackground, Modal } from '../../../../../styles/global';

interface IDeleteComment extends IComment {
  id?: number | null;
  setSaveId?: any;
  setDelComment: Dispatch<SetStateAction<boolean>>;
}
export const DeleteComments = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  id,
  setSaveId,
  setDelComment,
}: IDeleteComment) => {
  const router = useRouter();
  const [DeleteComment, { loading, data }] = useMutation<ICommentRes>(
    BOARDID && POSTID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${id}/delete`
      : REVIEWID
      ? `/api/user/${USERID}/review/${REVIEWID}/comment/${id}/delete`
      : ''
  );
  const clickCancel = () => {
    setSaveId(0);
    setDelComment(false);
  };
  useEffect(() => {
    if (data?.ok) return router.reload();
  }, [router, data]);

  return (
    <>
      {!loading && (
        <Cont>
          <div>
            <span>선택한 댓글을 삭제 하시겠습니까?</span>
            <span className="red">삭제시 복구가 불가합니다.</span>
          </div>
          <div>
            <span>Are you deleting this comment?</span>
            <span className="red">
              You can't recover the comment when it is removed.
            </span>
          </div>
          <div className="btn-wrap">
            <Btn name="삭제" type="button" onClick={() => DeleteComment({})} />
            <Btn type="button" name="취소" onClick={clickCancel} />
          </div>
        </Cont>
      )}
      {loading && (
        <LoadingModal
          text={{ kor: '댓글 삭제중...', eng: 'Deleting comment...' }}
        />
      )}
      <DimBackground zIndex={99} />
    </>
  );
};
const Cont = styled(Modal)`
  gap: 10px;
  div {
    text-align: center;
    line-height: 25px;
    span {
      display: block;
    }
    .red {
      opacity: 0.9;
      color: ${(p) => p.theme.color.logo};
    }
  }
  .btn-wrap {
    width: 80%;
    button {
      padding: 8px;
      width: 100%;
    }
  }
`;
