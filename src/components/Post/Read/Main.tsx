import styled from '@emotion/styled';
import { Author } from '../../../../Author';
import { TextArea } from '../../Style/Input/TextArea';

interface IMain {
  POST_TITLE: string;
  POST_CONTENT: string;
  CREATOR_AVATAR: string;
  CREATOR_USERNAME: string;
}
export const Main = ({
  POST_TITLE,
  POST_CONTENT,
  CREATOR_AVATAR,
  CREATOR_USERNAME,
}: IMain) => {
  return (
    <>
      <Cont>
        <Author
          CREATOR_AVATAR={CREATOR_AVATAR}
          CREATOR_USERNAME={CREATOR_USERNAME}
        />
        <Title>{POST_TITLE}</Title>
        <TextArea disabled value={POST_CONTENT} />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  flex-direction: column;
  //
  padding: 20px;
  textarea {
    font-size: 1em;

    border: none;
    padding: 20px 0;
    box-shadow: none;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 2em;
  line-height: 1.2em;
`;
