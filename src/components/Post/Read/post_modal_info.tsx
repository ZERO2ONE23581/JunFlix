import styled from '@emotion/styled';
import { Host } from './post_modal_info_host';
import { Detail } from './post_modal_info_detail';
import { FlexCol } from '../../../../styles/global';
import { variants } from '../../../../styles/variants';
import { CommentBox } from './post_modal_commentBox';

interface IMain {
  theme: boolean;
  isMyPost: boolean;
  post: {
    hash: string;
    link: string;
    title: string;
  };
  host: {
    desc: string;
    userId: string;
    host_id: number;
    followers: number;
    host_avatar: string;
  };
}
export const Main = ({ theme, isMyPost, post, host }: IMain) => {
  const hash = post?.hash;
  const link = post?.link;
  const title = post?.title;
  const desc = host?.desc!;
  const userId = host?.userId!;
  const host_id = host?.host_id!;
  const avatar = host?.host_avatar!;
  const followers = host?.followers!;
  //
  return (
    <>
      <Cont
        custom={theme}
        variants={variants}
        animate="animate"
        className="info"
      >
        <Host
          theme={theme}
          isMyPost={isMyPost}
          host={{ avatar, userId, host_id, followers }}
        />
        <Detail post={{ hash, link, title }} desc={desc} />
      </Cont>
      <CommentBox theme={theme} />
    </>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  min-height: 55vh;
  padding: 30px;
  padding-bottom: 0;
  .host,
  .detail,
  .comment_box {
    width: 100%;
  }
`;
