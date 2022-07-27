import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { AnswerModal, DimBackground } from '../../../../../styles/global';

interface IResult {
  isUserID?: boolean;
  isPassword?: boolean;
  foundUserID?: string;
}
export const Result = ({ isUserID, isPassword, foundUserID }: IResult) => {
  const router = useRouter();
  const clickYes = () => {
    router.replace('/user/login');
  };
  const clickNo = () => {
    router.reload();
  };
  return (
    <>
      <Cont>
        {isUserID && foundUserID && (
          <>
            <h1>회원님의 아이디는 "{foundUserID}" 입니다.</h1>
            <h2>로그인 페이지로 이동하시겠습니까?</h2>
          </>
        )}
        {isPassword && (
          <>
            <h1>비밀번호가 성공적으로 업데이트 되었습니다.</h1>
            <h2>로그인 페이지로 이동하시겠습니까?</h2>
          </>
        )}
        <div className="btn-wrap">
          <Btn type="button" name="YES" onClick={clickYes} />
          <Btn type="button" name="NO" onClick={clickNo} />
        </div>
      </Cont>
      <DimBackground zIndex={111} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
