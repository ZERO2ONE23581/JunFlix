interface IAnswerLists {
  type: string;
}
export const AnswerTexts = ({ type }: IAnswerLists) => {
  return (
    <>
      {type === 'update-user-avatar' && (
        <>
          <li>
            프로필 사진을 수정하거나 만드려면 아이콘 (프로필 사진)을 누르세요.
          </li>
          <li>Click the icon (picture) to edit or create profile picture.</li>
        </>
      )}
      {type === 'update-user-userInfo' && (
        <>
          <li>올바른 이메일 형식을 입력해야 합니다.</li>
          <li>이름과 유저이름은 10자를 초과할수 없습니다.</li>
          <li>You need a valid email form.</li>
          <li>Name and Username can't be more than 10 letters.</li>
        </>
      )}
      {type === 'update-user-password' && (
        <>
          <li>현재 비밀번호를 입력하세요.</li>
          <li>새로운 비밀번호를 입력하고 확인란에 재입력하세요.</li>
          <li>
            비밀번호가 기억나지 않는다면 하단 '비밀번호 찾기' 링크를 클릭하세요.
          </li>
          <li>Type your current Password.</li>
          <li>Type your new password and retype it on the blank beside.</li>
          <li>Click 'find pw' link if you can't remember your password.</li>
        </>
      )}
      {type === 'update-user-userId' && (
        <>
          <li>아이디는 대소문자를 구분하지 않습니다.</li>
          <li>
            아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.
          </li>
          <li> ID can be either uppercase of lowercase.</li>
          <li>
            Id must include Alphabets or 6 - 20 numbers without special symbols.
          </li>
        </>
      )}
      {type === 'update-user-delete' && (
        <>
          <li>계정은 삭제 후 복구가 불가합니다.</li>
          <li>You can't recover this account after delete.</li>
        </>
      )}
      <>
        {type === 'verify-email' && (
          <>
            <li>올바른 이메일 형식을 입력해야 합니다.</li>
            <li>인증을 위해 회원님의 이메일을 입력해주세요.</li>
            <li>Email must be in a valid form.</li>
            <li>Please type your email for verification.</li>
          </>
        )}
        {(type === 'verify-token-userId' ||
          type === 'verify-token-password') && (
          <>
            <li>인증을 위하여 6자리 토큰번호를 입력해주세요.</li>
            <li>토큰번호는 이메일을 통하여 확인할 수 있습니다.</li>
            <li>Type 6 digit number for verification.</li>
            <li>The token number is sent to you email.</li>
          </>
        )}
        {type === 'verify-userId' && (
          <>
            <li>인증을 위하여 아이디를 입력해주세요.</li>
            <li>아이디 인증 후 이메일로 토큰을 받을 수 있습니다.</li>
            <li>
              아이디가 기억나지 않는다면 박스 하단 '아이디 찾기'를 클릭하세요.
            </li>
            <li>Please type your ID for verification.</li>
            <li>You can receive token after verifying your id.</li>
            <li>Click the link 'Find ID' below if you forgot your id.</li>
          </>
        )}
        {type === 'create-password' && (
          <>
            <li>새로운 비밀번호를 입력해주세요.</li>
            <li>비밀번호는 최소 8자리, 최대 16자리 길이여야 합니다.</li>
            <li>
              비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야
              합니다.
            </li>
            <li>Type new password.</li>
            <li>
              Length of the new password must be between min 8 and max 16.
            </li>
            <li>Your password must include 1 or more special letters.</li>
          </>
        )}
      </>
      <>
        {type === 'create-user-avatar' && (
          <>
            <li>프로필 사진은 추후에 수정 가능합니다.</li>
            <li>프로필 사진을 추가하려면 아이콘을 클릭하세요.</li>
            <li>You can edit picture later.</li>
            <li>Click the icon to add profile picture.</li>
          </>
        )}
        {type === 'create-user-userInfo' && (
          <>
            <li>유저의 이름은 20자를 초과 할 수 없습니다.</li>
            <li>이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</li>
            <li>
              유저의 이름은 옵션사항 입니다. 이름은 추후에 수정 가능합니다.
            </li>
            <li>비밀번호는 최소 8자리, 최대 16자리 길이여야 합니다.</li>
            <li>
              비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야
              합니다.
            </li>
            <li>Lenght of username can't exeed more than 20 letters.</li>
            <li>
              Username is going to be saved as 'Anonymous' if you don't put any.
            </li>
            <li>
              Username is optional. You can edit your it after registration.
            </li>
            <li>Length of your password must be between min 8 and max 16.</li>
            <li>Your password must include 1 or more special letters.</li>
          </>
        )}
        {type === 'create-user-userId' && (
          <>
            <li>아이디는 대소문자를 구분하지 않습니다.</li>
            <li>
              아이디는 기호를 제외한 영문자 또는
              <span className="logo">6 - 20</span>자리 숫자를 포함해야합니다.
            </li>
            <li>ID can be either uppercase of lowercase.</li>
            <li>
              ID must include Alphabets or <span className="logo">6 - 20</span>
              numbers without special symbols.
            </li>
          </>
        )}
      </>
    </>
  );
};
