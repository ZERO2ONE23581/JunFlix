import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { IBoardForm, IBoardFormRes } from '../../../types/board';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLength } from '../../../libs/client/useTools';
import { Box, Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { BoxTitle } from '../../../Tools/Title';
import { InputWrap } from '../../../Tools/Input';
import { SelectWrap } from '../../../Tools/Input/Select';
import { CreateBoardAvatar } from '../../Avatar/Board/Create';
import { Svg } from '../../../Tools/Svg';
import { joinBoxVar } from '../../../../styles/variants';
import { Btn } from '../../../Tools/Button';
import { AnimatePresence } from 'framer-motion';
import { ErrModal } from '../../../Tools/errorModal';
import useUser from '../../../libs/client/useUser';

interface ICreateBoard extends ITheme {
  isPreview: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const CreateBoard = ({ theme, isPreview, setPreview }: ICreateBoard) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [CreateBoard, { loading, data }] = useMutation<IBoardFormRes>(
    `/api/user/${loggedInUser?.id}/board/create`
  );
  const {
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });
  //
  const avatar = watch('avatar');
  const [dataErr, setDataErr] = useState('');
  const [Loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const isLoading = avatarLoading ? avatarLoading : Loading ? Loading : false;
  //
  const [maxTitle] = useState(30);
  const [maxIntro] = useState(1000);
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const intro = watch!('intro');
    setHeight(intro?.length * 0.2);
  }, [setHeight, watch!('intro')]);
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    if (loading) return;
    //
    if (useLength(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (useLength(watch!('intro'))! > maxIntro)
      return setError!('intro', {
        message: `길이는 ${maxIntro}자 이하입니다.`,
      });
    //
    setLoading(true);
    if (avatar && avatar.length > 0) {
      setAvatarLoading((p) => !p);
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
      CreateBoard({ title, intro, genre, avatar: id });
      setAvatarLoading((p) => !p);
    } else {
      CreateBoard({ title, intro, genre });
    }
  };
  //
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setDataErr(data.error);
        if (data.ok)
          return router.replace(`/board/${data.board.id}/${data.board.title}`);
      }, 1000);
    }
  }, [data, router, setDataErr, setTimeout, setLoading]);
  //
  return (
    <AnimatePresence>
      {!Loading && (
        <Cont
          exit="exit"
          className="box"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={joinBoxVar}
        >
          <BoxTitle
            theme={theme}
            type="create-board"
            boardMax={{ title: maxTitle, intro: maxIntro }}
          />
          <form onSubmit={handleSubmit(onValid)}>
            <Flex className="flex">
              <InputWrap
                id="title"
                type="text"
                label="Title"
                theme={theme}
                error={errors.title?.message}
                watch={watch('title')}
                register={register('title', {
                  required: '보드의 제목을 입력하세요.',
                })}
              />
              <SelectWrap
                id="genre"
                theme={theme}
                error={errors.genre?.message}
                register={register('genre')}
                watch={Boolean(watch('genre'))}
              />
            </Flex>
            <CreateBoardAvatar
              theme={theme}
              register={register!}
              isPreview={isPreview}
              setPreview={setPreview}
            />
            <TextAreaWrap
              id="intro"
              theme={theme}
              height={height}
              error={errors.intro?.message}
              register={register('intro')}
              watch={Boolean(watch('intro'))}
              placeholder="이 보드의 소개글을 작성해주세요."
            />
            <div className="toTheRight">
              <Btn name="Save" type="submit" theme={theme} />
            </div>
          </form>
          <ErrModal theme={theme} error={dataErr} setDataErr={setDataErr} />
        </Cont>
      )}
      {Loading && <LoadingModal theme={theme} />}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  gap: 20px;
  width: 35vw;
  min-height: 45vh;
  min-width: 700px;
  .flex {
    //border: 2px solid yellow;
    align-items: flex-start;
    .err-msg {
      margin-top: 20px;
    }
  }
  .box-title {
    width: 500px;
    min-width: 500px;
    h1 {
      font-size: 2.4rem;
    }
  }
  form {
    select {
      width: 40%;
    }
    textarea {
      font-size: 1.3rem;
    }
    //border: 3px solid blueviolet;
    gap: 20px;
    max-height: 40vh;
    .create-board-bg {
      top: 1.3em;
      right: 1.3em;
      position: absolute;
    }
    .toTheRight {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button {
        width: 120px;
      }
    }
  }
`;
