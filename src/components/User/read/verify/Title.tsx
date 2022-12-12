import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { ITheme } from '../../../../../styles/theme';
import { FlexCol } from '../../../../../styles/global';

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
  const isNew = Boolean(type === 'new_password');
  const isID = Boolean(type === 'email' || type === 'token_id') && !isNew;

  return (
    <Cont>
      <h1>
        <span>{setTitle(type)}</span>
        <Svg type="user" theme={theme} item={{ size: '1.7rem' }} />
      </h1>
      <h2>
        <span>{setSub(type)?.one}</span>
        <span>{setSub(type)?.two}</span>
      </h2>
      <Txt>
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
              * If you didn't make an id when you registered, your ID is set as
              letters before '@'.
            </span>
          </>
        )}
      </Txt>
    </Cont>
  );
};
const Cont = styled.div`
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
    font-size: 2rem;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.5rem;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
  }
`;
const Txt = styled(FlexCol)`
  gap: 0.2rem;
  opacity: 0.8;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.2rem;
  align-items: flex-start;
  span {
    word-break: all;
  }
  .kor {
    font-size: 1.1rem;
  }
`;
