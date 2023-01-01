import { Info } from '../Info';
import { Close } from './Close';
import { PostCmt } from './PostCmt';
import styled from '@emotion/styled';
import { Setting } from './Setting';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../types/post';
import { avatarLink } from '../../../../../Tools/Avatar';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { useUser } from '../../../../../libs/client/useUser';
import { PostSt, postVar } from '../../../../../../styles/post';
import { useResponsive } from '../../../../../libs/client/useTools';
import { Mob } from '../../../../../../styles/global';

export interface IPostModal {
  _data: {
    modal: string;
    theme: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostModal = ({ _data }: IPostModal) => {
  const { isDesk } = useResponsive();
  const { post, theme, modal, setCmtModal, setModal } = _data;
  const host_id = post?.host_id!;
  const { loggedInUser } = useUser();
  const closeModal = () => setModal('');
  const isCmtBlocked = post?.onPrivate!;
  const isMyPost = Boolean(host_id === loggedInUser?.id);
  return (
    <>
      {modal === 'read' && (
        <Cont isDesk={isDesk}>
          <PostSt
            exit="exit"
            initial="initial"
            className="modal"
            animate="animate"
            variants={postVar}
            layoutId={post?.id + ''}
            custom={{ theme, isDesk }}
          >
            <Icons className="setting">
              <Close _data={{ theme, setModal, isDesk }} />
              <Setting _data={{ isDesk, theme, host_id, isMyPost, setModal }} />
            </Icons>
            <Img alt="post image" src={avatarLink(post?.post_image)} />
            <Info _data={{ theme, post, setCmtModal }} />
            {!isCmtBlocked && (
              <PostCmt _data={{ theme, post, setModal, setCmtModal, isDesk }} />
            )}
          </PostSt>
          <OverlayBg dark={0.3} closeModal={closeModal} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Mob)`
  .modal {
    top: ${(p) => p.isDesk && '5vh'};
    max-width: ${(p) => (p.isDesk ? '500px' : '100%')};
    max-height: ${(p) => (p.isDesk ? '650px' : '100%')};
  }
`;
const Img = styled.img``;
const Icons = styled.div`
  width: 100%;
  position: relative;
`;
