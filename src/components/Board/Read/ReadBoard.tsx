import useSWR from 'swr';
import { Top } from './Top';
import { Bottom } from './Bottom';
import { Profile } from './Profile';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Setting } from '../Edit/Setting';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '../../../libs/client/useUser';
import { IGetAllPosts } from '../../../types/post';
import { PostList } from '../../Post/Read/PostList';
import { DeleteBoard } from '../Delete/DeleteBoard';
import { IconBtn } from '../../Style/Button/IconBtn';
import { MutationRes } from '../../../types/mutation';
import { CreatePost } from '../../Post/Create/CreatePost';
import useMutation from '../../../libs/client/useMutation';
import { IBoardForm, IBoardWithAttrs } from '../../../types/board';
import { SaveEditBoard } from '../Edit/SaveEditBoard';

export interface IReadBoardProps {
  editBoard: boolean;
  board?: IBoardWithAttrs;
}
export const ReadBoard = ({ board, editBoard }: IReadBoardProps) => {
  const router = useRouter();
  const isPosts = Boolean(board?.posts?.length! > 0);
  //post
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${board?.UserID}/board/${board?.id}/edit`
  );
  const onValid = async ({ title, genre, intro }: IBoardForm) => {
    if (loading) return;
    return EditBoard({ title, genre, intro });
  };
  const [saveEditBoard, setSaveEditBoard] = useState(false);
  const clickSave = () => {
    if (errors.title || errors.genre || errors.intro) return;
    setSaveEditBoard(true);
  };
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.reload();
    }
  }, [board, setValue, data, router]);
  //
  const { data: post } = useSWR<IGetAllPosts>(
    `/api/user/${board?.UserID}/board/${board?.id}/post`
  );
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <Board>
            <Profile
              BOARDID={board?.id!}
              USERID={board?.user.id!}
              USER_AVATAR={board?.user?.avatar!}
              USER_USERNAME={board?.user?.username!}
            />
            <Info>
              <Top
                onEdit={editBoard}
                register={register}
                ERR_TITLE={errors.title?.message}
                ERR_GENRE={errors.genre?.message}
              />
              <Bottom
                onEdit={editBoard}
                register={register}
                BOARD_COUNT={board?._count!}
                ERR_INTRO={errors.intro?.message}
              />
            </Info>
            {saveEditBoard && (
              <SaveEditBoard loading={loading} closeModal={setSaveEditBoard} />
            )}
            {editBoard && (
              <Btn
                name="SAVE"
                type="button"
                onClick={clickSave}
                isClicked={saveEditBoard}
                CLASSNAME="save-board-edit"
              />
            )}
          </Board>
        </form>

        {isPosts ? (
          <PostList posts={post?.posts!} />
        ) : (
          <>
            <h1>포스트가 아직 없습니다.</h1>
          </>
        )}
      </Cont>
    </>
  );
};

const Cont = styled.section`
  margin: 0 auto;
  min-width: 800px;
  max-width: 80vw;
  position: relative;
  border: 10px solid hotpink;
  .question {
    bottom: 20%;
  }
  .compass {
    bottom: 30%;
  }
`;
const Board = styled.article`
  position: relative;
  border: none;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 20px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .save-board-edit {
    width: auto;
  }
`;
const Info = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 0 20px;
  input,
  select,
  textarea {
    :disabled {
      opacity: 1;
      width: 100%;
      border: none;
      color: inherit;
      box-shadow: none;
      background-color: inherit;
    }
    opacity: 0.6;
    color: ${(p) => p.theme.color.logo};
    border: 2px solid ${(p) => p.theme.color.logo};
    :focus {
      opacity: 1;
      color: ${(p) => p.theme.color.green};
      outline: 2px solid ${(p) => p.theme.color.green};
    }
  }
`;
