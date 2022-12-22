import { Info } from './Info';
import { Close } from './Close';
import { Setting } from '../Setting';
import styled from '@emotion/styled';
import { PostCmt } from './PostCmt';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../types/post';
import { avatarLink } from '../../../../../Tools/Avatar';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { useUser } from '../../../../../libs/client/useUser';
import { PostModalStyle, postVar } from '../../../../../../styles/post';

export interface IPostModal {
  _data: {
    modal: boolean;
    theme: boolean;
    post: IPostType;
    layoutId: string;
    setModal: Dispatch<SetStateAction<string>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostModal = ({ _data }: IPostModal) => {
  const { layoutId, post, theme, modal, setModal, setCmtModal, setFixed } =
    _data;
  const host_id = post?.host_id!;
  const { loggedInUser } = useUser();
  const isCmtBlocked = post?.onPrivate!;
  const isMyPost = Boolean(host_id === loggedInUser?.id);
  const closeModal = () => {
    setModal('');
    setFixed(false);
  };
  return (
    <>
      {modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={postVar}
            layoutId={layoutId}
          >
            <Icons className="setting">
              <Close _data={{ theme, setModal }} />
              <Setting _data={{ theme, host_id, isMyPost, setModal }} />
            </Icons>
            <img alt="post image" src={avatarLink(post?.post_image)} />
            <Info _data={{ theme, post, setCmtModal }} />
            {!isCmtBlocked && (
              <PostCmt _data={{ theme, post, setModal, setCmtModal }} />
            )}
          </Cont>
          <OverlayBg dark={0.3} closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostModalStyle)``;
const Icons = styled.div`
  width: 100%;
  position: relative;
  .icon {
    top: 1rem;
    width: 2rem;
    height: 2rem;
    position: absolute;
  }
`;
