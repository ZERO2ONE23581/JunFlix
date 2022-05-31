import Link from 'next/link';
import { LinkBtn } from '../../../../../styles/btn';
import { Flex } from '../../../../../styles/default';
import { H200ModalCont, ModalClose } from '../../../../../styles/modal';
import { Btn } from '../../../Button';

export const FindConfirmModal = ({ userId }: any) => {
  return (
    <>
      {userId ? (
        <H200ModalCont>
          <h1>
            회원님의 아이디는 " <span>{userId}</span> " 입니다.
          </h1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <Flex>
            <LinkBtn>
              <Link href="/user/login">
                <a>YES</a>
              </Link>
            </LinkBtn>
            <Btn
              type="yesOrno"
              onClick={() => location.reload()}
              btnName="NO"
            />
          </Flex>
        </H200ModalCont>
      ) : (
        <H200ModalCont>
          <h1>비밀번호가 성공적으로 업데이트 되었습니다.</h1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <Flex>
            <LinkBtn>
              <Link href="/user/login">
                <a>YES</a>
              </Link>
            </LinkBtn>
            <Btn
              type="yesOrno"
              onClick={() => location.reload()}
              btnName="NO"
            />
          </Flex>
        </H200ModalCont>
      )}
      <ModalClose />
    </>
  );
};
