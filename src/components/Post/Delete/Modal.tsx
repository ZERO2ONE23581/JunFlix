import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { ErrorMsg } from '../../Style/ErrMsg';
import { LoadingModal } from '../../LoadingModal';
import useUser from '../../../libs/client/useUser';
import { IPostCmtQuery } from '../../../types/post';
import { IconBtn } from '../../Style/Button/IconBtn';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DimBackground, AnswerModal } from '../../../../styles/global';

interface IDeletePost extends IPostCmtQuery {
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const DeleteModal = ({
  postId,
  userId,
  boardId,
  setDeletePost,
}: IDeletePost) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(loggedInUser?.id === userId);
  const [DeletePost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/delete`
  );
  const clickYes = () => {
    if (!isMyPost) alert('삭제권한이 없습니다.');
    DeletePost({});
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [data, router]);
  return (
    <>
      {!loading && (
        <Cont>
          <IconBtn
            size="1.8rem"
            type="button"
            svgType="close"
            onClick={() => setDeletePost(false)}
          />
          <ul>
            <li>
              <span>이 포스트를 삭제 하시겠습니까?</span>
            </li>
            <li>
              <span>포스트 삭제후 복구가 불가합니다.</span>
            </li>
            <li>
              <span>Are you sure to delete this post?</span>
            </li>
            <li>
              <span>You cant' recover the post once it is deleted.</span>
            </li>
          </ul>
          <div className="btn-wrap">
            <Btn name="YES" type="button" onClick={clickYes} />
            <Btn name="NO" type="button" onClick={() => setDeletePost(false)} />
          </div>
          {data?.error && <ErrorMsg error={data?.error} />}
        </Cont>
      )}

      {loading && (
        <LoadingModal
          zIndex={103}
          text={{ kor: '포스트 삭제중...', eng: 'Deleting post...' }}
        />
      )}

      <DimBackground zIndex={102} onClick={() => setDeletePost(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 103;
  align-items: center;
  border: ${(p) => p.theme.border.thin};
  .close {
    top: 5px;
    right: 5px;
    position: absolute;
  }
  svg {
    fill: ${(p) => p.theme.color.font};
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  input {
    margin: 0 auto;
  }
`;
