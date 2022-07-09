import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { LoadingModal } from '../../../LoadingModal';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { DimBackground, Modal } from '../../../../../styles/global';
import { ICommentRes, IPostComment } from '../../../../types/comments';

interface IDeleteComment extends IPostComment {
  comment_id: number;
  setSelectId: Dispatch<SetStateAction<number>>;
  setDeleteCmt: Dispatch<SetStateAction<boolean>>;
}
export const DeletePostComment = ({
  post,
  comment_id,
  setSelectId,
  setDeleteCmt,
}: IDeleteComment) => {
  const [DeleteComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/${comment_id}/delete`
  );
  const clickCancel = () => {
    setSelectId(0);
    setDeleteCmt(false);
  };
  useEffect(() => {
    if (data?.ok) {
      alert('댓글을 삭제했습니다/');
      setSelectId(0);
      setDeleteCmt(false);
    }
  }, [data, setDeleteCmt, setSelectId]);
  //
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