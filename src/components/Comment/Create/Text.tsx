import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { FlexCol, FlexCol_, Flex_ } from '../../../../styles/global';

interface ICreateCommentText {
  _data: {
    theme: boolean;
    isDesk: boolean;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Text = ({ _data }: ICreateCommentText) => {
  const { theme, setCmtModal, isDesk } = _data;
  const clickIcon = () => setCmtModal((p) => !p);
  const size = isDesk ? '2rem' : '3.5rem';
  return (
    <Cont>
      <Title isDesk={isDesk}>
        <h1>Comments</h1>
        <Svg
          type="comments"
          theme={theme}
          item={{ size }}
          onClick={clickIcon}
        />
      </Title>
      <Txt isDesk={isDesk}>
        <span>Share your Feedbacks!</span>
        <span className="kor">포스트에 대해 의견을 남겨주세요!</span>
      </Txt>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  margin-bottom: 1rem;
`;
const Title = styled(Flex_)`
  gap: 1rem;
  font-size: 1.5rem;
  h1 {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3.1rem')};
  }
`;
const Txt = styled(FlexCol_)`
  gap: 0rem;
  font-size: 1.2rem;
  font-style: italic;
  align-items: flex-start;
  font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.8rem')};
  .kor {
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.7rem')};
  }
  span {
    display: block;
  }
`;
