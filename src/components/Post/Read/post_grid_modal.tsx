import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Flex } from '../../../../styles/global';
import { PostModalStyle } from '../../../../styles/post';
import { color } from '../../../../styles/variants';
import useFollow from '../../../libs/client/useFollow';
import { useCapLetters } from '../../../libs/client/useTools';
import useUser from '../../../libs/client/useUser';
import { Avatar, useImgUrl } from '../../../Tools/Avatar';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { Svg } from '../../../Tools/Svg';
import { TrimText } from '../../../Tools/trimText';
import { IPostType } from '../../../types/post';
import { EllipsModal } from './update_btn_modal';

interface IPostGrid {
  id: number;
  theme: boolean;
  modal: boolean;
  post: IPostType;
  closeModal: () => void;
}

export const PostModal = ({
  id,
  post,
  theme,
  modal,
  closeModal,
}: IPostGrid) => {
  const { loggedInUser } = useUser();
  const host = post?.host;
  const hash = post?.hashtags;
  const link = post?.pageLink;
  const isHashLink = Boolean(hash || link);
  const host_followers = host?._count?.followers;
  const isMyPost = Boolean(loggedInUser?.id === host?.id);
  const { onClick, name, isFollowing } = useFollow(host?.id, 'user');
  const [ellips, setEllips] = useState(false);
  //
  return (
    <>
      {modal && (
        <>
          {post && (
            <>
              <Modal
                layoutId={id + ''}
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={modalVar}
              >
                <img src={useImgUrl(post.post_image)} alt="post image" />
                <>
                  <Svg type="close_" theme={theme} onClick={closeModal} />
                  <Ellips>
                    <EllipsModal
                      theme={theme}
                      modal={ellips}
                      isMyPost={isMyPost}
                      closeModal={() => setEllips(false)}
                    />
                    <Svg
                      theme={theme}
                      type="ellipsis"
                      onClick={() => setEllips((p) => !p)}
                    />
                  </Ellips>
                </>
                <Info className="info">
                  <Host className="host">
                    <Flex className="flex">
                      <Avatar
                        size="4rem"
                        theme={theme}
                        isRound={true}
                        data={{
                          preview: null,
                          host_id: host.id,
                          avatar: host.avatar,
                        }}
                      />
                      <div className="host-info">
                        {post?.host?.userId && (
                          <span>@{post?.host?.userId}</span>
                        )}
                        <span>
                          <span className="num">
                            {post?.host?._count?.followers}
                          </span>
                          <span>
                            {host_followers > 1 ? 'followers' : 'follower'}
                          </span>
                        </span>
                      </div>
                    </Flex>
                    <Icon className="icon">
                      <Svg type="like" theme={theme} />
                      <Svg type="comment" theme={theme} />
                      {!isMyPost && (
                        <Btn
                          type="button"
                          onClick={onClick}
                          item={{ name, theme, isFollowing }}
                        />
                      )}
                    </Icon>
                  </Host>
                  <Detail className="detail">
                    <h1 className="title">
                      <TrimText text={useCapLetters(post.title)} max={30} />
                    </h1>
                    <p>
                      <TrimText text={post.description!} max={500} />
                    </p>
                    {isHashLink && (
                      <ul>
                        {hash && (
                          <li>
                            <span className="hash">{hash}</span>
                          </li>
                        )}
                        {link && (
                          <li>
                            <span>Website:</span>
                            <span>{link}</span>
                          </li>
                        )}
                      </ul>
                    )}
                  </Detail>

                  <CommentBox className="comment_box">
                    <div className="text">
                      <span className="eng">
                        Do you like this post? Write comment to
                        <span className="red">@{host.userId}</span>'s post.
                      </span>
                      <span className="kor">
                        이 포스트가 마음에 드나요?
                        <span className="red">@{host.userId}</span>의 포스트에
                        댓글을 남겨주세요.
                      </span>
                    </div>
                    <Flex className="cmt_form">
                      <Avatar
                        size="3rem"
                        theme={theme}
                        isRound={true}
                        data={{
                          preview: null,
                          host_id: loggedInUser?.id!,
                          avatar: loggedInUser?.avatar!,
                        }}
                      />
                      <form>
                        <InputWrap
                          id={'comment'}
                          type={'text'}
                          theme={theme}
                          label={''}
                          watch={''}
                          error={''}
                          placeholder={'write comment'}
                        />
                      </form>
                    </Flex>
                  </CommentBox>
                </Info>
              </Modal>
              <OverlayBg closeModal={closeModal} />
            </>
          )}
          {!post && <LoadingModal theme={theme} />}
        </>
      )}
    </>
  );
};
const Ellips = styled.div`
  width: 2rem;
  height: 2rem;
  top: 1rem;
  right: 1.5rem;
  position: absolute;
  .ellipsis {
  }
`;
const Modal = styled(PostModalStyle)`
  min-width: 520px;
  top: 5vh;
  left: 0%;
  right: 0%;
  margin: 0px auto;
  height: 90vh;
  min-height: 50vh;
  max-height: 95vh;
  z-index: 111;
  img {
    width: 100%;
    max-height: 100%;
  }
  .close_ {
    top: 1rem;
    left: 1rem;
    position: absolute;
  }
`;
const Info = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .host,
  .detail,
  .comment_box {
    width: 100%;
    //border: 1px solid yellow;
    .cmt_form {
      margin: 20px auto;
      //border: 1px solid yellow;
    }
  }
`;
const Host = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon {
    width: fit-content;
    button {
      padding: 12px;
      border-radius: 40px;
      width: fit-content;
    }
  }
  .flex {
    width: fit-content;
    justify-content: flex-start;
    .host-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      font-size: 1.1rem;
      .num {
        margin-right: 5px;
      }
    }
  }
`;
const Detail = styled(Flex)`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    span {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 1.2rem;
    word-break: break-all;
  }
  ul {
    //border: 1px solid blue;
    font-size: 1.05rem;
    font-style: italic;
    li {
      .hash {
        color: ${(p) => p.theme.color.logo};
      }
      span {
        line-height: 15px;
      }
    }
  }
`;
const CommentBox = styled.div`
  .text {
    opacity: 0.8;
    font-size: 1.1rem;
    gap: 5px;
    display: flex;
    font-style: italic;
    flex-direction: column;
    .kor,
    .eng {
      display: block;
      .red {
        color: ${(p) => p.theme.color.logo};
        margin: 0 5px;
        font-size: 1rem;
      }
    }
    .kor {
      font-size: 1rem;
    }
  }
  .cmt_form {
    gap: 10px;
    input {
      border-radius: 20px;
    }
  }
`;
const Icon = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  width: fit-content;
`;
const modalVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    scale: 0.1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
  exit: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
};
