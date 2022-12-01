import { Info } from './Info';
import styled from '@emotion/styled';
import { Setting } from '../Setting';
import { PostCmt } from '../PostCmt';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../types/post';
import { OverlayBg } from '../../../../../Tools/overlay';
import { useUser } from '../../../../../libs/client/useUser';
import { avatarLink } from '../../../../../Tools/Avatar/indexxx';
import { PostModal, postVar } from '../../../../../../styles/post';

export interface IReadPostModal {
  _data: {
    theme: boolean;
    post: IPostType;
    layoutId: string;
  };
  _modal: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const ReadPost = ({ _data, _modal }: IReadPostModal) => {
  const { loggedInUser } = useUser();
  const { layoutId, post, theme } = _data;
  const { modal, setModal, setCmtModal } = _modal;
  const host_id = post?.host_id!;
  const isMyPost = Boolean(host_id === loggedInUser?.id);
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
            className="post-modal"
          >
            <Setting
              theme={theme}
              host_id={host_id}
              isMyPost={isMyPost}
              setModal={setModal}
            />
            <motion.img alt="post image" src={avatarLink(post?.post_image)} />
            <Info _data={{ theme, post, setCmtModal }} />
            <PostCmt _data={{ theme, post, setModal, setCmtModal }} />
          </Cont>
          <OverlayBg dark={0.3} closeModal={() => setModal('')} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostModal)``;
