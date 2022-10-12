import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ICmtRes } from '../../../types/comments';
import useMutation from '../../../libs/client/useMutation';
import { DimBackground, Modal } from '../../../../styles/global';
import { IQuery } from '../../../types/global';
import { ITheme } from '../../../../styles/theme';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';

interface IDeleteComment extends ITheme {
  chosenId: number;
  setChosenId: Dispatch<SetStateAction<number>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const DeleteComment = ({
  theme,
  setDelete,
  chosenId,
  setChosenId,
}: IDeleteComment) => {
  const [DeleteComment, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${'query.userId'}/board/${'query.boardId'}/post/${'query.postId'}/comment/${chosenId}/delete`
  );
  const clickCancel = () => {
    setChosenId(0);
    setDelete(false);
  };
  useEffect(() => {
    if (data?.ok) {
      alert('댓글이 삭제되었습니다.');
      setChosenId(0);
      setDelete(false);
    }
  }, [data, setDelete, setChosenId]);
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
            <Btn
              type="button"
              isBoolean={{ theme }}
              isString={{ btnName: 'Delete' }}
              onClick={() => DeleteComment({})}
            />
            <Btn
              type="button"
              isBoolean={{ theme }}
              onClick={clickCancel}
              isString={{ btnName: 'Cancel' }}
            />
          </div>
        </Cont>
      )}
      {loading && <LoadingModal theme={theme} />}
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
    gap: 10px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 100%;
      padding: 5px;
    }
  }
`;
