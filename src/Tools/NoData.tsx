import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleVar, variants } from '../../styles/variants';

interface INoData {
  _data: {
    theme: boolean;
    no_data: boolean;
  };
}
export const NoData = ({ _data }: INoData) => {
  const theme = _data?.theme!;
  const open = _data?.no_data!;
  return (
    <AnimatePresence>
      {open && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="no-data"
          custom={theme}
          variants={scaleVar}
        >
          <ul>
            <li className="emoji">🤔</li>
            <li>
              <span className="eng">No data. </span>
              <span className="kor">데이터를 찾을수 없습니다.</span>
            </li>
          </ul>
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(motion.article)`
  width: 100%;
  display: flex;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  .emoji {
    font-size: 4rem;
  }
  li {
    margin-bottom: 10px;
    .eng,
    .kor {
      font-style: italic;
      font-size: 1.5rem;
    }
    .eng {
      font-size: 1.6rem;
    }
  }
`;
