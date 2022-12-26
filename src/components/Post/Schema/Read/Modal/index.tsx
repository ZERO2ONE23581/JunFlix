import { Info } from './Info';
import { Close } from './Close';
import { PostCmt } from './PostCmt';
import styled from '@emotion/styled';
import { Setting } from '../Setting';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../types/post';
import { avatarLink } from '../../../../../Tools/Avatar';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { useUser } from '../../../../../libs/client/useUser';
import { PostSt, postVar } from '../../../../../../styles/post';
import { useResponsive } from '../../../../../libs/client/useTools';

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
  const { post, theme, modal, setCmtModal, setModal } = _data;
  const { isDesk } = useResponsive();
  const host_id = post?.host_id!;
  const { loggedInUser } = useUser();
  const closeModal = () => setModal('');
  const isCmtBlocked = post?.onPrivate!;
  const isMyPost = Boolean(host_id === loggedInUser?.id);
  return (
    <>
      {modal === 'read' && (
        <>
          <Cont
            exit="exit"
            initial="initial"
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
          </Cont>
          <OverlayBg dark={0.3} closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostSt)``;
const Img = styled.img``;
const Icons = styled.div`
  width: 100%;
  position: relative;
`;
