import useSWR from 'swr';
import { Info } from './Info';
import styled from '@emotion/styled';
import { Avatar } from '../../../Avatar';
import { EditPost } from '../../Edit';
import { DeleteModal } from '../../../Tools/Modal/DeletePostModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { IGetPost } from '../../../../types/post';
import { Modal, DimBackground } from '../../../../../styles/global';
import { IQuery } from '../../../../types/global';

interface IPostModal extends IQuery {
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const PostModal = ({ query, setModal }: IPostModal) => {
  const { data } = useSWR<IGetPost>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}`
  );
  const [edit, setEdit] = useState(false);
  const [del, setDelete] = useState(false);
  return (
    <>
      <Cont isAvatar={Boolean(data?.post?.avatar)}>
        <Avatar id="postAvatar" avatar={data?.post?.avatar!} disabled />
        <Info
          query={query}
          post={data?.post!}
          setModal={setModal}
          setEdit={setEdit}
          setDelete={setDelete}
        />
        {edit && (
          <>
            <EditPost
              query={query}
              setEdit={setEdit}
              title={data?.post?.title!}
              content={data?.post?.content!}
              postAvatar={data?.post?.avatar!}
            />
            <DimBackground
              zIndex={102}
              className="dim"
              onClick={() => setEdit(false)}
            />
          </>
        )}
      </Cont>
      {del && <DeleteModal query={query} setDelete={setDelete} />}
      <DimBackground zIndex={99} onClick={() => setModal(false)} />
    </>
  );
};
const Cont = styled(Modal)<{ isAvatar: boolean }>`
  gap: 0;
  padding: 0;
  z-index: 102;
  width: 80vw;
  height: 90vh;
  display: flex;
  overflow: hidden;
  min-width: 1200px;
  border-radius: 8px;
  flex-direction: row;
  border: ${(p) => !p.isAvatar && p.theme.border.thick};
  .postAvatar {
    pointer-events: none;
    .noImageDiv,
    .isImageTag {
      width: 45vw;
      height: 90vh;
      min-width: 680px;
      min-height: 600px;
    }
  }
  .read-post-info {
    width: 35vw;
    height: 90vh;
    min-width: 520px;
    min-height: 300px;
  }
`;
