import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { ITheme } from '../../../styles/theme';
import { FlexCol_ } from '../../../styles/global';
import { useResponsive } from '../../libs/client/useTools';

interface ITitle extends ITheme {
  type: string;
}
export const Title = ({ theme, type }: ITitle) => {
  const setTitle = (type: string) => {
    if (type === 'email' || type === 'token_id') return 'Find ID';
    if (type === 'password' || type === 'token_pw') return 'Find Password';
    if (type === 'new_password') return 'New Password';
  };
  const setSub = (type: string) => {
    if (type === 'email') return { one: 'Step 1', two: 'Verify Email' };
    if (type === 'password') return { one: 'Step 1', two: 'Verify ID' };
    if (type === 'token_id' || type === 'token_pw')
      return { one: 'Step 2', two: 'Verify Token' };
  };
  const { isDesk } = useResponsive();
  const size = isDesk ? '1.7rem' : '3.3rem';
  const isNew = Boolean(type === 'new_password');
  const isID = Boolean(type === 'email' || type === 'token_id') && !isNew;

  return (
    <Cont isDesk={isDesk}>
      <h1>
        <span>{setTitle(type)}</span>
        <Svg type="user" theme={theme} item={{ size }} />
      </h1>
      <h2>
        <span>{setSub(type)?.one}</span>
        <span>{setSub(type)?.two}</span>
      </h2>
      <Txt isDesk={isDesk}>
        {isNew && (
          <>
            <span className="kor">* 새로운 아이디를 입력 해주세요.</span>
            <span className="kor">
              * 확인을 위해 비밀번호를 재입력 해주세요.
            </span>
            <span className="eng">
              * Please type new password on the blank.
            </span>
            <span className="eng">
              * Please re-type the password to confirm.
            </span>
          </>
        )}
        {!isNew && (
          <>
            <span className="kor">
              * 인증을 위해 {isID ? '이메일 주소를' : '아이디를'} 입력해주세요.
            </span>
            <span className="eng">
              * Please type your {isID ? 'email address' : 'ID'} for
              verification.
            </span>
            <span className="kor" style={{ marginTop: '0.5rem' }}>
              * 회원가입시 이메일만 입력하셨다면 아이디는 이메일 주소 앞자리 (@
              앞 문자)로 자동설정 됩니다.
            </span>
            <span className="eng">
              * If you did not make an id when you registered, your ID is set as
              letters before @.
            </span>
          </>
        )}
      </Txt>
    </Cont>
  );
};
const Cont = styled.div<{ isDesk: boolean }>`
  h1,
  h2 {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    svg {
      pointer-events: none;
    }
  }
  h1 {
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
  }
  h2 {
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
  }
`;
const Txt = styled(FlexCol_)`
  gap: 0.2rem;
  opacity: 0.8;
  margin-top: 1rem;
  font-style: italic;
  align-items: flex-start;
  font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
  .kor {
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.2rem')};
  }
  span {
    word-break: all;
  }
`;
