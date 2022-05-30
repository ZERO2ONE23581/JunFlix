import { ErrMsg, Form, PageSection } from '../../../../../styles/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../src/components/Button';
import { BoardForm } from '../../../../../src/types/board';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import { CreateBoardResponse } from '../../../../../src/types/mutation';
import { CreateBoardModal } from '../../../../../src/components/Modal/Board/Create';

const CreateBoard: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  //Post
  const [createBoard, { loading, data }] = useMutation<CreateBoardResponse>(
    `/api/user/${userId}/board/create`
  );
  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardForm>({ mode: 'onSubmit' });
  const onValid = ({ title, intro, genre, avatar, follow }: BoardForm) => {
    if (loading) return;
    createBoard({ title, intro, genre });
  };
  const movieGenre = [
    'SF',
    'Drama',
    'Horror',
    'Comedy',
    'Fantasy',
    'Romance',
    'Action',
    'Mystery',
    'Thriller',
  ];
  //
  return (
    <>
      {data?.ok && (
        <CreateBoardModal
          boardId={data?.boardId}
          boardTitle={data?.boardTitle}
          creatorId={data?.creatorId}
        />
      )}
      <PageSection>
        <Form onSubmit={handleSubmit(onValid)}>
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
          <Input
            register={register('title', {
              required: '생성하실 보드의 제목을 입력하세요.',
              maxLength: {
                value: 30,
                message: '보드제목은 30자 이내여야 합니다.',
              },
            })}
            type="text"
            label="Title"
            name="title"
            errMsg={errors.title?.message}
            placeholder="생성하실 보드의 제목을 입력하세요."
          />
          <Input
            register={register('intro', {
              maxLength: {
                value: 50,
                message: '소개글은 50자 이내여야 합니다.',
              },
            })}
            type="text"
            name="intro"
            label="Intro"
            errMsg={errors.intro?.message}
            placeholder="보드의 소개글을 작성해 보세요."
          />
          <Select
            register={register('genre')}
            name="genre"
            label="Movie Genre"
            options={[...movieGenre]}
            placeholder="최애 장르를 선택해주세요."
          />
          <Btn type="submit" btnName="나의 보드 만들기" loading={loading} />
        </Form>
      </PageSection>
    </>
  );
};

export default CreateBoard;
