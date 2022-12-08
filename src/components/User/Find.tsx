import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ITheme } from '../../../styles/theme';
import { hoverVars } from '../../../styles/variants';
import { Flex, FlexCol } from '../../../styles/global';

interface IFindUser extends ITheme {
  type?: string;
}
export const FindUser = ({ theme, type }: IFindUser) => {
  const router = useRouter();
  const isJoin = Boolean(type === 'join');
  const join_arr = ['id', 'pw', `login`];
  const login_arr = ['id', 'pw', `join`];
  const array = isJoin ? join_arr : login_arr;
  const setTxt = (type: string) => {
    if (type) {
      if (type === 'id') return { kor: '아이디 찾기', eng: 'Find ID' };
      if (type === 'pw') return { kor: '비밀번호 찾기', eng: 'Find Password' };
      if (type === 'join') return { kor: '회원가입', eng: 'Register' };
      if (type === 'login') return { kor: '로그인', eng: 'Login' };
    }
  };
  const onClick = (type: string) => {
    if (type) {
      if (type === 'join') return router.push('/join');
      else if (type === 'login') return router.push('/login');
      else return router.push(`/user/find/${type}`);
    }
  };
  const isBar = (type: string) => Boolean(type === 'join' || type === 'login');
  return (
    <Cont>
      {array.map((element) => (
        <>
          <Txt
            custom={theme}
            animate="animate"
            whileHover="hover"
            variants={hoverVars}
            key={array.indexOf(element)}
          >
            <span onClick={() => onClick(element)} className="kor">
              {setTxt(element)?.kor}
            </span>
            <span onClick={() => onClick(element)} className="eng">
              {setTxt(element)?.eng}
            </span>
          </Txt>
          {!isBar(element) && <span className="bar">|</span>}
        </>
      ))}
    </Cont>
  );
};

const Cont = styled(Flex)`
  gap: 1.2rem;
  margin-top: 1rem;
  justify-content: space-around;
`;
const Txt = styled(FlexCol)`
  cursor: pointer;
  width: fit-content;
  justify-content: center;
  .eng {
    font-size: 1.1rem;
  }
  .kor {
    font-size: 1rem;
  }
`;
