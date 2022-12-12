import {
  useGetPosts,
  useGetLikedPosts,
  useGetQuickSaved,
} from '../../../../src/libs/client/usePosts';
import {
  useGetBoards,
  useGetFollowingBoards,
} from '../../../../src/libs/client/useBoards';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../../src/Tools/Button';
import { Head_ } from '../../../../src/Tools/head_title';
import { BtnWrap, Page } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { color, redColor } from '../../../../styles/variants';
import { useGetUser, useUser } from '../../../../src/libs/client/useUser';
import { useCapLetter } from '../../../../src/libs/client/useTools';
import { PostSchema } from '../../../../src/components/Post/Schema';
import { Host } from '../../../../src/components/User/Read/MyPage/Host';
import { BoardsGrid } from '../../../../src/components/Board/Read/Grid';

const UserPage: NextPage<{
  theme: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
}> = ({ theme, setFixed }) => {
  const router = useRouter();
  const { user_id } = useUser();
  const host_id = Number(router.query.user_id!);
  const isMyAcct = Boolean(host_id === user_id);
  const { user: host, userId, username } = useGetUser(host_id);
  const NAME = username ? username : userId;

  const { boards, isBoard } = useGetBoards(host_id);
  const { posts } = useGetPosts({ host_id, board_id: 0 });
  const { posts: quickSaved } = useGetQuickSaved(host_id);
  const saves = host?.followings?.map((e) => e.board_id);
  const { SavedBoards, isSaved } = useGetFollowingBoards({ saves });
  const { posts_liked, isLikedPost } = useGetLikedPosts({ host_id });
  //
  const [clicked, setClicked] = useState('posts');
  const arr = ['posts', 'likes', 'boards', 'saved'];
  return (
    <>
      <Head_ title={`${useCapLetter(NAME)}'s page`} />
      <Container>
        <Host _data={{ theme, host, isMyAcct, setFixed }} />
        <BtnWrap className="btn_wrap">
          {arr.map((type) => (
            <Btn
              type="button"
              _vars={vars}
              key={arr.indexOf(type)}
              onClick={() => setClicked(type)}
              item={{
                theme,
                name: useCapLetter(type),
                isClicked: Boolean(clicked === type),
              }}
            />
          ))}
        </BtnWrap>
        <article className="cnts_wrap">
          {clicked === 'posts' && (
            <PostSchema setFixed={setFixed} _data={{ grid: 5, theme, posts }} />
          )}
          {clicked === 'likes' && (
            <PostSchema
              setFixed={setFixed}
              _data={{ grid: 5, theme, posts: posts_liked }}
            />
          )}
          {clicked === 'boards' && (
            <BoardsGrid
              _data={{ theme, isBoard, boards, quickSaved, user_id: host_id }}
            />
          )}
          {clicked === 'saved' && (
            <BoardsGrid
              _data={{ theme, isBoard: isSaved, boards: SavedBoards! }}
            />
          )}
        </article>
      </Container>
    </>
  );
};
export default UserPage;
const Container = styled(Page)`
  min-width: 100%;
  min-height: 100%;
  padding: 1.1rem;
  .host {
  }
  .btn_wrap {
    gap: 2rem;
    margin: 1.5rem auto 0;
    width: fit-content;
    button {
      width: 7rem;
      border-radius: 0;
      padding-bottom: 0.5rem;
      //background-color: inherit;
    }
  }

  .cnts_wrap {
    //border: 5px solid blueviolet;
    padding: 1rem 10rem;
    .posts_grid_wrap {
      //min-width: 1000px;
      //border: 3px solid yellowgreen;
      padding-top: 1rem;
      .icon_layer {
        .icons {
          gap: 1.5rem;
        }
        width: fit-content;
        //border: 2px solid yellow;
        position: absolute;
        top: -1rem;
        right: 0rem;
      }
      .posts_grid {
        img {
          width: 100%;
          max-height: 15rem;
        }
      }
    }
    .boards_grid {
      margin-top: 1rem;
      .grid_box {
        .board_cover {
          width: 100%;
          max-height: 15rem;
        }
      }
    }
  }
`;
const vars = {
  animate: ({ theme, isClicked }: any) => ({
    scale: 1,
    transition: { duration: 0.4 },
    backgroundColor: color(!theme),
    color: isClicked ? redColor : color(theme),
    borderBottom: isClicked ? '4px solid red' : '4px solid transparent',
  }),
  hover: ({ theme }: any) => ({
    color: redColor,
    scale: 1.1,
    transition: { duration: 0.4 },
    backgroundColor: color(!theme),
    borderBottom: '4px solid red',
  }),
};
