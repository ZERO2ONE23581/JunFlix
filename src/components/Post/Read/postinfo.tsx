import { PostText } from './posttext';
import styled from '@emotion/styled';
import { LikeIcon } from './PostLikes';
import { PostModel } from '../../../types/post';
import { CommentList } from '../../comment/Post/Read/List';
import { CommentIcon } from '../../comment/Post/Read/Icon';
import { CreateComment } from '../../comment/Post/Create/Wrap/Comment';
import { Profile } from '../../comment/Post/Read/Info/Profile';

export interface IPosInfo {
  data: PostModel;
}
export const PosInfo = ({ data, theme }: any) => {
  const query = {
    reveiwId: 0,
    postId: data.id,
    userId: data.host_id,
    boardId: data.board_id,
  };

  return (
    <>
      {data && (
        <Cont className="post-info">
          <h1>{data.title}</h1>
          <div className="content-cmt-wrap">
            <Content className="post-content">
              <Profile
                theme={theme}
                size="4rem"
                isInReply={false}
                userAvatar={data.user.avatar!}
              />
              <PostText
                sliceFrom={800}
                content={data.content!}
                username={data.user.username!}
                date={{
                  createdAt: data.createdAt!,
                  updatedAt: data.updatedAt!,
                }}
              />
            </Content>
            <CommentList query={query} />
          </div>

          <Bottom>
            <div className="wrap">
              <LikeIcon query={query} />
              <CommentIcon query={query} />
            </div>
            <CreateComment query={query} />
          </Bottom>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    padding: 10px;
    padding-top: 25px;
    font-size: 2em;
    text-align: center;
  }
  .content-cmt-wrap {
    height: 100%;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Content = styled.div`
  gap: 20px;
  display: flex;
  padding: 20px 40px;
  margin-bottom: 20px;
  align-items: flex-start;
`;
const Bottom = styled.div`
  height: fit-content;
  padding-bottom: 10px;
  border-top: 2px solid ${(p) => p.theme.color.font};
  .wrap {
    gap: 2rem;
    display: flex;
    padding: 15px 20px;
    padding-bottom: 10px;
    align-items: center;
    .counts {
      top: -8px;
      right: -10px;
      position: absolute;
      font-size: 15px;
      font-weight: 550;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
