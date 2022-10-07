import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../../../types/global';
import { FollowBoardModal } from '../../Modal/Follow/Board';
import { IGetFollowingBoard } from '../../../types/board';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Svg } from '../../Svg';

interface IFollowBtn {
  userId: number;
  boardId: number;
}
export const FollowBtn = ({ userId, boardId }: IFollowBtn) => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [FollowBoard] = useMutation<IData>(
    `/api/user/${userId}/follow/board/${boardId}`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${userId}/board/${boardId}`
  );
  const [follow, setFollow] = useState(false);
  const [unFollow, setUnFollow] = useState(false);
  const onClick = () => {
    if (!isLoggedIn) {
      alert(`You need to login (로그인이 필요합니다.)`);
      router.push(`/user/login`);
    }
    setFollow(false);
    setUnFollow(false);
    if (!data) return;
    mutate(
      {
        ...data,
        isFollowing: !data.isFollowing,
        board: {
          ...data.board,
        },
      },
      false
    );
    FollowBoard({});
  };
  const isFollow = Boolean(data?.isFollowing);
  return (
    <>
      <Cont className="follow-board">
        {!isFollow && (
          <Btn
            onClick={onClick}
            custom={true}
            variants={btnVars}
            whileHover="btnHover"
          >
            <Icon variants={iconVars}>
              <Svg type="add" size="2rem" />
            </Icon>
            <Text variants={textVars}>Follow</Text>
          </Btn>
        )}
        {isFollow && (
          <Btn
            onClick={onClick}
            custom={false}
            variants={btnVars}
            whileHover="btnHover"
          >
            <Icon variants={iconVars}>
              <Svg type="check" size="2rem" />
            </Icon>
            <Text variants={textVars}>Following...</Text>
          </Btn>
        )}
      </Cont>

      {follow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isFollow />
      )}
      {unFollow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isUnFollow />
      )}
    </>
  );
};
const Icon = styled(motion.div)`
  font-size: 1.5rem;
`;
const Text = styled(motion.div)`
  opacity: 0;
  top: 5px;
  right: 7px;
  position: absolute;
  font-size: 1.3rem;
`;
export const BtnTrans = {
  transition: {
    delay: 0,
    duration: 0.4,
  },
};
const btnVars = {
  btnHover: (type: boolean) => ({
    paddingBottom: 0,
    paddingLeft: type ? '30px' : '70px',
    backgroundColor: '#E50914',
    ...BtnTrans,
  }),
};
const iconVars = {
  btnHover: {
    opacity: 0,
    ...BtnTrans,
  },
};
const textVars = {
  btnHover: {
    opacity: 1,
    ...BtnTrans,
  },
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Btn = styled(motion.button)`
  border: 1px solid red;
  border: none;
  padding: 0;
  padding: 4px 12px;
  border-end-start-radius: 15px;
  color: ${(p) => p.theme.color.font};
  background-color: grey;
  background-color: ${(p) => p.theme.color.bg};
`;
