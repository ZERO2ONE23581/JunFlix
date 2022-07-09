import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { EditPost } from '../Edit/EditPost';
import { PostModel } from '../../../types/post';
import { DeletePost } from '../Delete/DeletePost';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from '../../Style/Button/IconBtn';
import { Dispatch, SetStateAction, useState } from 'react';
import { DimBackground, Modal } from '../../../../styles/global';

interface ISettingBtnProps {
  post: PostModel;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const Setting = ({ post, setReadPost }: ISettingBtnProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(loggedInUser?.id === post?.UserID);
  const [onSetting, setOnSetting] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const handleClick = (type: string) => {
    setOnSetting(false);
    if (type === 'edit') return setEditPost(true);
    if (type === 'delete') return setDeletePost(true);
    if (type === 'board') {
      setReadPost(false);
      router.push(
        `/user/${post?.UserID}/board/${post?.BoardID}/${post?.board?.title}/`
      );
    }
  };
  return (
    <>
      <Cont>
        <IconBtn
          type="button"
          svgType="ellipsis-v"
          isClicked={onSetting}
          onClick={() => setOnSetting((p) => !p)}
        />
        {onSetting && (
          <BtnWrap>
            {isMyPost && (
              <>
                <Btn
                  type="button"
                  name="포스트 수정"
                  onClick={() => handleClick('edit')}
                />
                <Btn
                  type="button"
                  name="포스트 삭제"
                  CLASSNAME="delete-post-btn"
                  onClick={() => handleClick('delete')}
                />
              </>
            )}
            <Btn
              type="button"
              name="보드로 이동하기"
              onClick={() => handleClick('board')}
            />
          </BtnWrap>
        )}
      </Cont>

      {editPost && (
        <EditPost
          POSTID={post?.id!}
          USERID={post?.UserID!}
          BOARDID={post?.BoardID!}
          setEditPost={setEditPost}
        />
      )}
      {deletePost && (
        <DeletePost
          POSTID={post?.id!}
          USERID={post?.UserID!}
          BOARDID={post?.BoardID!}
          openModal={setDeletePost}
        />
      )}

      {onSetting && (
        <DimBackground zIndex={99} onClick={() => setOnSetting((p) => !p)} />
      )}
    </>
  );
};
const Cont = styled.div`
  svg {
    width: 22px;
    height: 22px;
    fill: ${(p) => p.theme.color.font};
  }
`;
const BtnWrap = styled(Modal)`
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 3px;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
  .delete-post-btn {
    button {
      border-bottom: none;
    }
  }
`;
