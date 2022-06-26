import { Profile } from './Profile';
import styled from '@emotion/styled';
import { TopLayer } from './TopLayer';
import { useRouter } from 'next/router';
import { Setting } from './Edit/Setting';
import { Btn } from '../../../Style/Button';
import { BottomLayer } from './BottomLayer';
import { Svg } from '../../../Style/Svg/Svg';
import { SaveUpdate } from './Edit/SaveUpdate';
import { PostList } from '../../Post/PostList';
import { CancelEdit } from './Edit/CancelEdit';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { MutationRes } from '../../../../types/mutation';
import { CreatePost } from '../../Post/Create/CreatePost';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';
import { useForm, UseFormRegister } from 'react-hook-form';
import useMutation from '../../../../libs/client/useMutation';
import { IBoardForm, IBoardWithAttrs } from '../../../../types/board';
import { useEffect, useState } from 'react';

export interface IReadBoardProps {
  board?: IBoardWithAttrs;
}
export interface IBoardInfosProps {
  onEdit: boolean;
  board?: IBoardWithAttrs;
  register: UseFormRegister<IBoardForm>;
}
export const ReadBoard = ({ board }: IReadBoardProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
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
  const isMyBoard = Boolean(board?.UserID === loggedInUser?.id);
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <Board>
            {isMyBoard ? (
              <Svg type="isOwner" />
            ) : (
              <FollowBoardBtn USERID={board?.UserID!} BOARDID={board?.id!} />
            )}
            <Profile board={board} />
            <Data>
              <TopLayer board={board} onEdit={onEdit} register={register} />
              <BottomLayer board={board} onEdit={onEdit} register={register} />
              <Icons>
                <IconBtn
                  type="button"
                  svgType="compass"
                  onClick={() => router.push(`/user/all/boards`)}
                />
                {isBoardHost && (
                  <Setting
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCreate={onCreate}
                    onSetting={onSetting}
                    setOnEdit={setOnEdit}
                    setCancelEdit={setCancelEdit}
                    setOnDelete={setOnDelete}
                    setOnCreate={setOnCreate}
                    setOnSetting={setOnSetting}
                  />
                )}
              </Icons>
            </Data>
            {onEdit && (
              <Submit>
                <Btn
                  type="button"
                  name="SAVE"
                  onClick={() => setSaveEdit(true)}
                />
              </Submit>
            )}
            {cancelEdit && <CancelEdit closeModal={setCancelEdit} />}
          </Board>

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
const Data = styled.article`
  /* border: 2px solid yellow; */
  position: relative;
  input,
  select,
  textarea {
    :disabled {
      opacity: 1;
      border: none;
      color: inherit;
      background-color: inherit;
      box-shadow: none;
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
  top: 5%;
  right: -25%;
  position: absolute;
  gap: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Submit = styled.article`
  bottom: 15%;
  right: 10%;
  position: absolute;
`;
