import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input, Select } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { Form, PageContainer } from '../../styles/components/default';

interface BlogForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: string;
  follow?: string;
}

const CreateBlog: NextPage = () => {
  //Post
  const [createBlog, { loading, data }] = useMutation(`/api/blog/create`);
  //Form
  const { register, handleSubmit } = useForm<BlogForm>({ mode: 'onSubmit' });
  const onValid = ({ title, intro, genre, avatar, follow }: BlogForm) => {
    if (loading) return;
    createBlog({ title, intro, genre });
  };
  //

  return (
    <>
      <PageContainer>
        <Form onSubmit={handleSubmit(onValid)}>
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

          <Btn type="submit" btnName="나의 보드 만들기" />
        </Form>
      </PageContainer>
    </>
  );
};

export default CreateBlog;
