import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Following } from '@prisma/client';
import { Grid } from '../../../../../styles/global';
import { Subscriptions } from './subscriptions';

interface IFollowingBoards {
  theme: boolean;
  array?: Following[];
}
export const FollowingBoards = ({ theme, array }: IFollowingBoards) => {
  //
  const size = array?.length ? array.length : 1;
  return (
    <Cont className="following-boards">
      <h1>
        <span>Following Boards</span>
        <span className="kor">팔로우중인 보드</span>
      </h1>
      <Grid size={size}>
        {array?.map((e) => (
          <Subscriptions
            key={e.id}
            item={{ board_id: e.board_id!, theme: theme }}
          />
        ))}
      </Grid>
    </Cont>
  );
};

const Cont = styled(motion.article)`
  height: 100%;
  padding: 20px;
  width: fit-content;
  h1 {
    font-size: 2rem;
    span {
      display: block;
    }
  }
`;
