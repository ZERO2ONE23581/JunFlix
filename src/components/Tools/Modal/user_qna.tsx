import styled from '@emotion/styled';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../../styles/global';

interface IAnswer {
  type?: string;
  setAnswer: Dispatch<SetStateAction<boolean>>;
}
export const Answer = ({ type, setAnswer }: IAnswer) => {
  return (
    <>
      <Cont>
        {type === 'delete-acct' && (
          <>
            <span>계정은 삭제 후 복구가 불가합니다.</span>
            <span>You can't recover this account after delete.</span>
          </>
        )}
        {type === 'edit-picture' && (
          <>
            <span>
              프로필 사진을 수정하거나 만드려면 아이콘 (프로필 사진)을 누르세요.
            </span>
            <span>
              Click the icon (picture) to edit or create profile picture.
            </span>
          </>
        )}
        {type === 'edit-userInfo' && (
          <>
            <span>이름과 유저이름은 10자를 초과할수 없습니다.</span>
            <span>올바른 이메일 형식을 입력해야 합니다.</span>
            <span>Name and Username can't be more than 10 letters.</span>
            <span>You need a valid email form.</span>
          </>
        )}
        {type === 'edit-password' && (
          <>
            <span>현재 비밀번호를 입력하세요?</span>
            <span>새로운 비밀번호를 입력하고 확인란에 재입력하세요.</span>
            <span>Type your current Password.</span>
            <span>
              Type your new password and retype it on the input beside.
            </span>
            <span className="red">비밀번호가 기억나지 않습니까?</span>
            <span className="red">
              You don't remember your current password?
            </span>
            <span>
              <Link href="/user/find/password">
                <a>&rarr; 비밀번호 찾기</a>
              </Link>
            </span>
          </>
        )}
        {type === 'edit-userId' && (
          <>
            <span>
              아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.
            </span>
            <span> 아이디는 대소문자를 구분하지 않습니다.</span>
            <span>
              Id must include Alphabets or 6 - 20 numbers without special
              symbols.
            </span>
            <span> ID can be either uppercase of lowercase.</span>
            <span className="red">아이디가 기억나지 않습니까?</span>
            <span className="red">You don't remember your id?</span>
            <span>
              <Link href="/user/find/user_id">
                <a>&rarr; 아이디 찾기</a>
              </Link>
            </span>
          </>
        )}
        {type === 'newPassword' && (
          <>
            <span>* Please type your new password.</span>
            <span>* 새로운 비밀번호를 입력해주세요.</span>
          </>
        )}
        {type === 'verifyId' && (
          <>
            <span>* Please type your ID for verification.</span>
            <span>* 인증을 위하여 아이디를 입력해주세요.</span>
          </>
        )}
        {type === 'verifyToken' && (
          <>
            <span>* 인증을 위하여 6자리 인증번호를 입력해주세요.</span>
            <span>* Please type 6 digit number for verification.</span>
          </>
        )}
        {type === 'verifyEmail' && (
          <>
            <span>* 인증을 위해 회원님의 이메일을 입력해주세요.</span>
            <span>* 올바른 이메일 형식을 입력해야 합니다.</span>
            <span>* Please type your email to verification.</span>
            <span>* Email must be in valid form.</span>
          </>
        )}
        {type === 'createId' && (
          <>
            <span>
              * 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를
              포함해야합니다.
            </span>
            <span>* 아이디는 대소문자를 구분하지 않습니다.</span>
            <span>
              * Id must include Alphabets or 6 - 20 numbers without special
              symbols.
            </span>
            <span>* ID can be either uppercase of lowercase.</span>
          </>
        )}
        {type === 'userInfo' && (
          <>
            <span>* 이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</span>
            <span>* 이름은 추후에 수정 가능합니다.</span>
            <span>
              * Username is going to be saved as 'Anonymous' if you don't put
              any.
            </span>
            <span>* You can edit your username after register.</span>
          </>
        )}
        {type === 'avatar' && (
          <>
            <span>* 프로필 사진을 추가하려면 아이콘을 클릭하세요.</span>
            <span>* 프로필 사진은 추후에 수정 가능합니다.</span>
            <span>* Click the icon to add profile picture.</span>
            <span>* You can edit picture later.</span>
          </>
        )}
      </Cont>
      <DimBackground zIndex={1} onClick={() => setAnswer(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  .red {
    color: ${(p) => p.theme.color.logo};
  }
  a {
    :hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
