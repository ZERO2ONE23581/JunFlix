import { Top } from './Top';
import { Bottom } from './Bottom';
import { Profile } from './Profile';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Setting } from '../Edit/Setting';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Svg } from '../../../Style/Svg/Svg';
import { CancelEdit } from '../Edit/CancelEdit';
import { SaveUpdate } from '../Edit/SaveUpdate';
import { PostList } from '../../Post/Read/PostList';
import { DeleteBoard } from '../Delete/DeleteBoard';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { MutationRes } from '../../../../types/mutation';
import { CreatePost } from '../../Post/Create/CreatePost';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';
import useMutation from '../../../../libs/client/useMutation';
import { IBoardForm, IBoardWithAttrs } from '../../../../types/board';

export interface IReadBoardProps {
  board?: IBoardWithAttrs;
}

export const ReadBoard = ({ board }: IReadBoardProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
  //
  const [onSetting, setOnSetting] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const isPosts = Boolean(board?.posts?.length! > 0);

  //post
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${board?.UserID}/board/${board?.id}/edit`
  );
  const onValid = async ({ title, genre, intro }: IBoardForm) => {
    if (loading) return;
    return EditBoard({ title, genre, intro });
  };
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (data?.ok) {
      router.reload();
    }
  }, [board, setValue, data, router]);
  //
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <Board>
            {isBoardHost ? (
              <Svg type="isOwner" />
            ) : (
              <FollowBoardBtn USERID={board?.UserID!} BOARDID={board?.id!} />
            )}
            <Profile board={board} />
            <Flex>
              <BoardInfo>
                <Top onEdit={onEdit} register={register} />
                <Bottom
                  board={board!}
                  onEdit={onEdit}
                  register={register}
                  setSaveEdit={setSaveEdit}
                />
              </BoardInfo>
              <Icons>
                <IconBtn
                  type="button"
                  svgType="compass"
                  onClick={() => router.push(`/user/all/boards`)}
                />
                {isBoardHost && (
                  <Setting
                    onEdit={onEdit}
                    onSetting={onSetting}
                    setOnEdit={setOnEdit}
                    setCancelEdit={setCancelEdit}
                    setOnDelete={setOnDelete}
                    setOnCreate={setOnCreate}
                    setOnSetting={setOnSetting}
                  />
                )}
              </Icons>
            </Flex>
          </Board>

          {cancelEdit && <CancelEdit closeModal={setCancelEdit} />}
          {saveEdit && (
            <SaveUpdate
              data={data}
              loading={loading}
              closeModal={setSaveEdit}
              errors={{
                data: data?.error,
                title: errors.title?.message,
                genre: errors.genre?.message,
                intro: errors.intro?.message,
              }}
            />
          )}
        </form>
        {onDelete && <DeleteBoard closeModal={setOnDelete} />}

        {isPosts ? (
          <PostList
            isHost={isBoardHost}
            BOARDID={board?.id!}
            USERID={board?.UserID!}
          />
        ) : (
          <>
            <h1>포스트가 아직 없습니다.</h1>
          </>
        )}
      </Cont>
      {onCreate && <CreatePost board={board} openCreatePost={setOnCreate} />}
    </>
  );
};

const Cont = styled.section`
  margin: 0 auto;
  min-width: 800px;
  max-width: 70vw;
  position: relative;
`;
const Board = styled.div`
  position: relative;
  gap: 20px;
  display: flex;
  justify-content: center;
  border: none;
  padding: 30px;
  margin: 0 auto;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const BoardInfo = styled.article`
  input,
  select,
  textarea {
    :disabled {
      opacity: 1;
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
const Icons = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
