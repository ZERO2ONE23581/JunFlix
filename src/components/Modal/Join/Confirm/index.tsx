import Link from 'next/link';
import { LinkBtn } from '../../../../../styles/btn';
import { Flex } from '../../../../../styles/default';
import { H200ModalCont, ModalClose } from '../../../../../styles/modal';

export const JoinConfirmModal = ({ toggleCheckModal }: any) => {
  return (
    <>
      <H200ModalCont>
        <h1>회원가입이 성공적으로 완료되었습니다.</h1>
        <h2>로그인 페이지로 이동하시겠습니까?</h2>
        <Flex>
          <Link href="/user/login">
            <a>
              <LinkBtn>YES</LinkBtn>
            </a>
          </Link>
          <Link href="/">
            <a>
              <LinkBtn>NO</LinkBtn>
            </a>
          </Link>
        </Flex>
      </H200ModalCont>
      <ModalClose onClick={toggleCheckModal} />
    </>
  );
};
