import styled from '@emotion/styled';
import { NextPage } from 'next';
import { Title } from '../../../../../../../src/components/Layout/Title';
import { PostForm } from '../../../../../../../src/components/User/Post/Form';
import { Page } from '../../../../../../../styles/global';

const CreatePost: NextPage = () => {
  return (
    <>
      <Title title="포스트 생성" />
      <Cont>
        <PostForm />
      </Cont>
    </>
  );
};
export default CreatePost;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
