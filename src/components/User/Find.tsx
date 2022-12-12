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
  const join_arr = ['id', '|', 'pw', , '|', `login`];
  const login_arr = ['id', '|', 'pw', '|', `join`];
  const array = isJoin ? join_arr : login_arr;
  const setTxt = (type: string | undefined) => {
    if (type) {
      if (type === '|') return { kor: '', eng: '|' };
      if (type === 'id') return { kor: '아이디 찾기', eng: 'Find ID' };
      if (type === 'pw') return { kor: '비밀번호 찾기', eng: 'Find Password' };
      if (type === 'join') return { kor: '회원가입', eng: 'Register' };
      if (type === 'login') return { kor: '로그인', eng: 'Login' };
    }
  };
  const onClick = (type: string | undefined) => {
    if (type) {
      if (type === 'join') return router.push('/join');
      else if (type === 'login') return router.push('/login');
      else return router.push(`/user/find/${type}`);
    }
  };
  return (
    <Cont>
      {array.map((element) => (
        <Arr key={array.indexOf(element)} isBar={Boolean(element === '|')}>
          <Txt
            custom={theme}
            animate="animate"
            whileHover="hover"
            variants={hoverVars}
          >
            <span onClick={() => onClick(element)} className="kor">
              {setTxt(element)?.kor}
            </span>
            <span onClick={() => onClick(element)} className="eng">
              {setTxt(element)?.eng}
            </span>
          </Txt>
        </Arr>
      ))}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1.2rem;
  margin-top: 1rem;
`;
const Arr = styled(Flex)<{ isBar: boolean }>`
  width: fit-content;
  span {
    cursor: ${(p) => !p.isBar && 'pointer'};
  }
`;
const Txt = styled(FlexCol)`
  width: fit-content;
  justify-content: center;
  .eng {
    font-size: 1.1rem;
  }
  .kor {
    font-size: 1rem;
  }
`;
