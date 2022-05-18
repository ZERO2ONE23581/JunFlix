import Link from 'next/link';
import { LinkBtn } from '../../../styles/components/btn';
import { Flex } from '../../../styles/components/default';
import {
  JoinConfirmModalCont,
  ModalClose,
} from '../../../styles/components/modal';

export const JoinConfirmModal = ({ toggleCheckModal }: any) => {
  return (
    <>
      <JoinConfirmModalCont>
        <h1>회원가입이 성공적으로 완료되었습니다.</h1>
        <h2>로그인 페이지로 이동하시겠습니까?</h2>
        <Flex>
          <LinkBtn>
            <Link href="/login">
              <a>YES</a>
            </Link>
          </LinkBtn>
          <LinkBtn>
            <Link href="/">
              <a>NO</a>
            </Link>
          </LinkBtn>
        </Flex>
      </JoinConfirmModalCont>
      <ModalClose onClick={toggleCheckModal} />
    </>
  );
};
