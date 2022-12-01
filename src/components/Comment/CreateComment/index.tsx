import { CreateBox } from './Box';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex, FlexCol } from '../../../../styles/global';

interface ICreateComment {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const CreateComment = ({ _data }: ICreateComment) => {
  const { theme, setPost, post_id, host_id, setCmtModal } = _data;
  const clickIcon = () => setCmtModal((p) => !p);
  return (
    <Cont>
      <Title>
        <h1>Comments</h1>
        <Svg type="comments" theme={theme} onClick={clickIcon} />
      </Title>
      <Text className="text">
        <Svg type="quote-left" theme={theme} item={{ size: '1.2rem' }} />
        <span className="kor">포스트에 대해 의견을 남겨주세요!</span>
        <span>Share feedbacks!</span>
        <Svg type="quote-right" theme={theme} item={{ size: '1.2rem' }} />
      </Text>
      <CreateBox _data={{ theme, post_id, host_id, setPost }} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 0.8rem;
  margin-bottom: 1rem;
`;
const Title = styled(Flex)`
  gap: 0.5rem;
  font-size: 1.5rem;
`;
const Text = styled(Flex)`
  gap: 0.5rem;
  font-size: 1.2rem;
  font-style: italic;
  //border: 1px solid yellow;
  .kor {
    font-size: 1.1rem;
  }
  span {
    display: block;
    //text-align: center;
  }
`;
