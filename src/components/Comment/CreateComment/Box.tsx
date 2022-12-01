import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Avatar } from '../../../Tools/Avatar';
import { CreateModal } from '../Modal/Create';
import { color } from '../../../../styles/variants';
import { Flex, FlexCol } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';

interface ICreateCmtBox {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    setPost: Dispatch<SetStateAction<string>>;
  };
}
export const CreateBox = ({ _data }: ICreateCmtBox) => {
  const [create, setCreate] = useState(false);
  const { theme, setPost, post_id, host_id } = _data;
  const openCreate = () => setCreate(true);
  return (
    <Cont>
      <Box>
        <Avatar _data={{ size: '3.5rem', isRound: true, theme, host_id }} />
        <FakeInput
          animate="animate"
          whileHover="hover"
          custom={{ theme }}
          onClick={openCreate}
          variants={fakeInputVar}
        >
          <span>Leave comments on this post...</span>
        </FakeInput>
        <Svg
          type="reply"
          theme={theme}
          onClick={openCreate}
          item={{ size: '1.8rem' }}
        />
      </Box>
      <CreateModal
        theme={theme}
        setPost={setPost}
        _data={{ post_id, modal: create, closeModal: () => setCreate(false) }}
      />
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  //border: 2px solid yellow;
`;
const Box = styled(Flex)`
  gap: 1rem;
  width: 100%;
  justify-content: flex-start;
  justify-content: space-between;
`;
const FakeInput = styled(Flex)`
  max-width: 70%;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  outline: 1px solid ${(p) => p.theme.color.font};
  span {
    width: 100%;
  }
  ::placeholder {
    color: inherit;
  }
  :hover {
    ::placeholder {
      color: inherit;
      color: ${(p) => p.theme.color.font};
    }
  }
`;
const fakeInputVar = {
  hover: () => ({
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.5 },
    outline: `3px solid #E50914`,
  }),
  animate: ({ theme }: any) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
    outline: `1px solid ${color(theme)}`,
  }),
};
