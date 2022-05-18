import styled from '@emotion/styled';
import Link from 'next/link';
import { LinkBtn } from '../../../styles/components/btn';
import { ModalCont } from '../../../styles/components/modal';
import { Btn } from '../Btn';

export const ConfirmModal = ({ userId }: any) => {
  //
  return (
    <>
      {userId ? (
        <ModalCont>
          <H1>
            회원님의 아이디는 " <span>{userId}</span> " 입니다.
          </H1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <Flex>
            <LinkBtn>
              <Link href="/login">
                <a>YES</a>
              </Link>
            </LinkBtn>
            <Btn type="button" onClick={() => location.reload()} btnName="NO" />
          </Flex>
        </ModalCont>
      ) : (
        <ModalCont>
          <H1>비밀번호가 성공적으로 업데이트 되었습니다.</H1>
          <h2>로그인 페이지로 이동하시겠습니까?</h2>
          <Flex>
            <LinkBtn>
              <Link href="/login">
                <a>YES</a>
              </Link>
            </LinkBtn>
            <Btn type="button" onClick={() => location.reload()} btnName="NO" />
          </Flex>
        </ModalCont>
      )}
    </>
  );
};
const H1 = styled.h1`
  span {
    font-weight: 500;
    font-style: italic;
  }
`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  width: 200px;
`;
