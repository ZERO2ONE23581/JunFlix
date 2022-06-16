import Link from 'next/link';
import { H200ModalCont, ModalClose } from '../../../../styles/modal';
import { Btn } from '../../Style/Button';

export const FindConfirmModal = ({ userId }: any) => {
  return (
    <>
      {userId ? (
        <H200ModalCont>
          <h1>
            회원님의 아이디는 " <span>{userId}</span> " 입니다.
          </h1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <div>
            <Link href="/user/login">
              <a>YES</a>
            </Link>
            <Btn type="button" onClick={() => location.reload()} name="NO" />
          </div>
        </H200ModalCont>
      ) : (
        <H200ModalCont>
          <h1>비밀번호가 성공적으로 업데이트 되었습니다.</h1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <div>
            <Link href="/user/login">
              <a>YES</a>
            </Link>
            <Btn name="NO" type="button" onClick={() => location.reload()} />
          </div>
        </H200ModalCont>
      )}
      <ModalClose />
    </>
  );
};
