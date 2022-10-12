import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../Tools/Button';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { useRouter } from 'next/router';

interface IBoardBox extends ITheme {
  board_Id: number;
}
export const BoardFollow = ({ theme, board_Id }: IBoardBox) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { board_id } = router.query;
  //
  const [post, { data, loading }] = useMutation(`/api/following/create/board`);
  const handleClick = () => {
    if (loggedInUser) post({ board_Id });
    else alert('must login');
  };
  //
  return (
    <Cont className="follow">
      <Flex className="flex">
        <span>followed by</span>
        <span>{0}</span>
        <span>users</span>
      </Flex>
      <Btn
        theme={theme}
        type="button"
        onClick={handleClick}
        name={loading ? 'loading' : 'Follow'}
      />
    </Cont>
  );
};
const Cont = styled(motion.div)`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .flex {
    gap: 5px;
    font-size: 1.1rem;
    width: fit-content;
  }
  button {
    font-size: 1.1rem;
    width: fit-content;
    padding: 5px 10px;
  }
`;
