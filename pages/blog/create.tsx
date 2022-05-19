import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input, Select } from '../../src/components/Input';
import { CreateBlogModal } from '../../src/components/Modal/CreateBlogModal';
import useMutation from '../../src/libs/client/useMutation';
import { BlogForm } from '../../src/types/blog';
import { CreateBlogResponse } from '../../src/types/postResponse';
import { ErrMsg, Form, PageContainer } from '../../styles/components/default';

const CreateBlog: NextPage = () => {
  //Post
  const [createBlog, { loading, data }] =
    useMutation<CreateBlogResponse>(`/api/blog/create`);
  console.log(data);
  //Form
  const { register, handleSubmit } = useForm<BlogForm>({ mode: 'onSubmit' });
  const onValid = ({ title, intro, genre, avatar, follow }: BlogForm) => {
    if (loading) return;
    createBlog({ title, intro, genre });
  };
  //

  return (
    <>
      {data?.ok && (
        <CreateBlogModal
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

export default CreateBlog;
