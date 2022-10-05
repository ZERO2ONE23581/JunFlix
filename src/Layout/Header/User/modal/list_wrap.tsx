import styled from '@emotion/styled';
import { Svg } from '../../../../components/Tools/Svg';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import { ListHover, SpringTrans } from '../../../../../styles/variants';

export const ListWrap = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const onClick = (type: string) => {
    if (type === 'logout') return router.push(`/api/user/logout`);
    if (type === 'dash')
      return router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/dashboard`
      );
    if (type === 'setting')
      return router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/setting`
      );
  };
  return (
    <Cont>
      <List
        whileHover={ListHover}
        transition={SpringTrans}
        onClick={() => onClick('dash')}
      >
        <Svg type="home" size="2em" />
        <span>
          <span>마이페이지</span>
          <span className="small">My Page</span>
        </span>
      </List>

      <List whileHover={ListHover} onClick={() => onClick('setting')}>
        <Svg type="setting" size="2em" />
        <span>
          <span>설정</span>
          <span className="small">Setting</span>
        </span>
      </List>

      <List whileHover={ListHover} onClick={() => onClick('logout')}>
        <Svg type="logout" size="2em" />
        <span>
          <span>로그아웃</span>
          <span className="small">Log Out</span>
        </span>
      </List>
    </Cont>
  );
};
const Cont = styled.ul`
  padding: 5px 0;
  min-width: 10em;
`;

const List = styled(motion.li)`
  cursor: pointer;
  font-size: 1.1em;
  padding: 5px 20px;
  margin-bottom: 5px;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    span {
      display: block;
      text-align: center;
    }
    .small {
      opacity: 0.9;
      font-size: 0.9em;
    }
  }
  svg {
    pointer-events: none;
  }
`;
