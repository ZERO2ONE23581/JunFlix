import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../../../Tools/Button';
import { FlexCol } from '../../../../../../styles/global';

interface IVerifyResult {
  _data: {
    theme: boolean;
    userId: string;
  };
}
export const Wrap = ({ _data }: IVerifyResult) => {
  const router = useRouter();
  const { theme, userId } = _data;
  const isPassword = Boolean(userId && userId === 'isPassword');
  return (
    <Cont>
      {!isPassword && (
        <>
          <span className="kor">
            <span>회원님의 아이디는</span>
            <span className="red">{`"${userId}"`}</span>
            <span>입니다.</span>
          </span>
          <span className="eng">
            <span>Your ID:</span>
            <span className="red">{`"${userId}"`}</span>
          </span>
        </>
      )}
      {isPassword && (
        <>
          <span className="kor">새로운 비밀번호를 생성하였습니다.</span>
          <span className="eng">New password is created successfully.</span>
        </>
      )}
      <Btn
        type="button"
        item={{ theme, name: 'OK' }}
        onClick={() => router.replace('/login')}
      />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  > span {
    width: 100%;
    display: block;
    padding: 10px;
    text-align: center;
  }
`;
