import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Layer_ } from '../../../../../styles/global';
import { useCapLetters } from '../../../../libs/client/useTools';
import { color, redColor } from '../../../../../styles/variants';

interface ITitle {
  _data: {
    theme: boolean;
    isMyAcct?: boolean;
    username?: string;
    onClick: () => void;
    setCreate?: Dispatch<SetStateAction<boolean>>;
  };
}
export const Title = ({ _data }: ITitle) => {
  const theme = _data?.theme!;
  const onClick = _data?.onClick!;
  const isMyAcct = _data?.isMyAcct!;
  const username = _data?.username!;
  const setCreate = _data?.setCreate!;
  return (
    <Cont className="layer">
      <div></div>
      <div>
        {username && (
          <h1>
            <motion.span
              custom={theme}
              onClick={onClick}
              variants={nameVar}
              className="user"
              animate="animate"
              whileHover="hover"
            >
              {useCapLetters(username)}
            </motion.span>
            <span>'s Posts</span>
          </h1>
        )}
        {!username && <h1>All Posts</h1>}
      </div>
      <div>
        {isMyAcct && (
          <Svg type="plus" theme={theme} onClick={() => setCreate((p) => !p)} />
        )}
      </div>
    </Cont>
  );
};

const Cont = styled(Layer_)`
  padding: 2rem 0 3rem;
  //border: 1px solid yellow;
  > div {
    :nth-of-type(3) {
      //border: 1px solid blue;
      padding-right: 3rem;
    }
    :nth-of-type(2) {
      h1 {
        font-weight: 400;
        font-size: 1.8rem;
        text-align: center;
        //border: 1px solid yellow;
        .user {
          cursor: pointer;
        }
      }
    }
  }
`;
const nameVar = {
  animate: (theme: boolean) => ({
    color: color(theme),
  }),
  hover: { color: redColor },
};
