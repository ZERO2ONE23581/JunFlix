import { useEffect, useState } from 'react';
import { Profile } from './Profile';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { TitleLayer } from './TitleLayer';
import { Description } from './Description';
import { PostList } from '../../Post/PostList';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { IBoardForm, IBoardWithAttrs } from '../../../../types/board';
import { CreatePost } from '../../Post/Create/CreatePost';
import { FormCont, ModalClose } from '../../../../../styles/global';
import { User } from '@prisma/client';
import { useForm, UseFormRegister } from 'react-hook-form';
import useMutation from '../../../../libs/client/useMutation';
import { MutationRes } from '../../../../types/mutation';
import { Setting } from './BoardSetting';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';
import { Svg } from '../../../Style/Svg/Svg';
import { useRouter } from 'next/router';

export interface IReadBoardProps {
  board?: IBoardWithAttrs;
}
export interface IBoardInfosProps extends IReadBoardProps {
  onEdit: boolean;
  user?: User;
  register: UseFormRegister<IBoardForm>;
}
export const ReadBoard = ({ board }: IReadBoardProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isBoardHost = Boolean(loggedInUser?.id === board?.UserID);
  //
  const [onSetting, setOnSetting] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const isPosts = Boolean(board?.posts?.length! > 0);
  const isMyBoard = Boolean(board?.UserID === loggedInUser?.id);

  //post
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', `${board.genre}`);
      if (board.intro) setValue('intro', `"${board.intro}"`);
    }
  }, [board, setValue]);
  //
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${board?.UserID}/board/${board?.id}/edit`
  );
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    setAvatarLoading((p) => !p);
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      setAvatarLoading((p) => !p);
      return EditBoard({ title, genre, intro, avatar: id });
    } else {
      setAvatarLoading((p) => !p);
      return EditBoard({ title, genre, intro });
    }
  };
  //
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <Board>
            <Profile board={board} />
            <div className="flex">
              <Info>
                <TitleLayer
                  onEdit={onEdit}
                  board={board}
                  user={loggedInUser}
                  register={register}
                />
                <Description
                  board={board}
                  onEdit={onEdit}
                  register={register}
                />
              </Info>
              {isBoardHost && (
                <BtnFlex>
                  {isMyBoard ? (
                    <Svg type="isOwner" />
                  ) : (
                    <FollowBoardBtn
                      USERID={board?.UserID!}
                      BOARDID={board?.id!}
                    />
                  )}
                  <IconBtn
                    type="button"
                    svgType="compass"
                    onClick={() => router.push(`/user/all/boards`)}
                  />
                  <Setting
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCreate={onCreate}
                    onSetting={onSetting}
                    setOnEdit={setOnEdit}
                    setOnDelete={setOnDelete}
                    setOnCreate={setOnCreate}
                    setOnSetting={setOnSetting}
                  />
                </BtnFlex>
              )}
            </div>
          </Board>
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

      {/* {deletePost && (
        <DeletePost
          openCreatePost={openCreatePost}
          openDeletePost={openDeletePost}
        />
      )}
      {deleteBoard && <DeleteBoardModal closeModal={openDeleteBoard} />} */}
    </>
  );
};

const Cont = styled.section`
  margin: 0 auto;
  min-width: 900px;
  max-width: 80vw;
  position: relative;
  border: 8px solid yellow;
`;
const Board = styled.article`
  gap: 50px;
  border: none;
  display: flex;
  padding: 20px 40px;
  position: relative;
  border-radius: 8px;
  justify-content: center;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  .flex {
    gap: 50px;
    display: flex;
    align-items: flex-start;
  }
`;
const Info = styled.article`
  min-width: 600px;
`;
const BtnFlex = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
`;
