import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { IReview } from '../../../types/review';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { ICmtRes } from '../../../types/comments';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { DimBackground, Modal } from '../../../../styles/global';

interface IDelCmt extends IReview {
  comment_id: number;
  setSelectId: Dispatch<SetStateAction<number>>;
  setDel: Dispatch<SetStateAction<boolean>>;
}
export const DelCmt = ({
  review,
  comment_id,
  setSelectId,
  setDel,
}: IDelCmt) => {
  const [DeleteComment, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment_id}/delete`
  );
  const clickCancel = () => {
    setSelectId(0);
    setDel(false);
  };
  useEffect(() => {
    if (data?.ok) {
      alert('댓글을 삭제했습니다/');
      setSelectId(0);
      setDel(false);
    }
  }, [data, setDel, setSelectId]);
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
      {loading && <LoadingModal zIndex={100} type="delete" />}
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
