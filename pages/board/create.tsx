import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { BoardForm } from '../../src/types/blog';
import { Input, Select } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { CreateBoardResponse } from '../../src/types/postResponse';
import { ErrMsg, Form, PageContainer } from '../../styles/components/default';
import { CreateBoardModal } from '../../src/components/Modal/CreateBoardModal';

const CreateBoard: NextPage = () => {
  //Post
  const [createBoard, { loading, data }] =
    useMutation<CreateBoardResponse>(`/api/board/create`);

  //Form
  const { register, handleSubmit } = useForm<BoardForm>({ mode: 'onSubmit' });
  const onValid = ({ title, intro, genre, avatar, follow }: BoardForm) => {
    if (loading) return;
    createBoard({ title, intro, genre });
  };
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
      <PageContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
          <Input
            type="text"
            label="Title"
            name="title"
            errMsg=""
            placeholder="생성하실 보드의 제목을 입력하세요."
            register={register('title', {
              required: '생성하실 보드의 제목을 입력하세요.',
            })}
          />
          <Input
            type="text"
            label="Intro"
            name="intro"
            errMsg=""
            placeholder="보드의 소개글을 작성해 보세요."
            register={register('intro', {
              maxLength: 50,
            })}
          />
          <Select
            name="genre"
            label="Movie Genre"
            errMsg=""
            options={[
              'SF',
              'Drama',
              'Horror',
              'Comedy',
              'Fantasy',
              'Romance',
              'Action',
              'Mystery',
              'Thriller',
            ]}
            placeholder="최애 장르를 선택해주세요."
            register={register('genre')}
          />

          <Btn type="submit" btnName="나의 보드 만들기" loading={loading} />
        </Form>
      </PageContainer>
    </>
  );
};

export default CreateBoard;
