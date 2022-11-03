import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Circle, Flex } from '../../../../../styles/global';
import { hoverBgVars } from '../../../../../styles/variants';

interface INewBtn {
  theme: boolean;
  clickNew: () => void;
}
export const NewBtn = ({ theme, clickNew }: INewBtn) => {
  return (
    <Cont className="create-new-btn">
      <Circle
        custom={!theme}
        onClick={clickNew}
        variants={hoverBgVars}
        animate="animate"
        className="circle"
        whileHover="hover"
      >
        <Svg type="plus" theme={!theme} />
      </Circle>
      <h3>
        <span>New Board</span>
        <span className="kor">새로운 보드</span>
      </h3>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1.6rem;
  width: 100%;
  margin: 0 auto;
  padding-left: 2rem;
  margin-bottom: 3rem;
  justify-content: flex-start;
  h3 {
    font-size: 1.3rem;
    font-style: italic;
    span {
      margin-right: 5px;
    }
    .kor {
      font-size: 1.2rem;
    }
  }
  .circle {
    width: 2.5rem;
    height: 2.5rem;
    svg {
      pointer-events: none;
    }
  }
`;
