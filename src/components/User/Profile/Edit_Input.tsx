import { ErrMsg, InputWrap, OkMsg } from '../../../../styles/globalStyle';
import { Btn } from '../../Btn';
import { Input, Select } from '../../Input';

let dataOkMsg = '프로필이 성공적으로 업데이트 되었습니다.';
export const EditInputUserId = ({
  errMsg,
  register,
  onClick,
  loading,
  Type,
  dataErrMsg,
}: any) => {
  //
  return (
    <>
      {Type === 'userId' && !dataErrMsg && <OkMsg>{dataOkMsg}</OkMsg>}
      {Type === 'userId' && dataErrMsg && <ErrMsg>{dataErrMsg}</ErrMsg>}
      <Input
        label="ID"
        type="text"
        name="userId"
        errMsg={errMsg}
        register={register}
        placeholder="새로운 아이디를 입력해주세요."
      />
      <Btn onClick={onClick} type="submit" loading={loading} btnName="SAVE" />
    </>
  );
};

export const EditInputPassword = ({
  Type,
  dataErrMsg,
  errMsg,
  errMsg1,
  errMsg2,
  register,
  register1,
  register2,
  onClick,
  loading,
}: any) => {
  //
  return (
    <>
      {Type === 'password' && !dataErrMsg && <OkMsg>{dataOkMsg}</OkMsg>}
      {Type === 'password' && dataErrMsg && <ErrMsg>{dataErrMsg}</ErrMsg>}
      <Input
        label="Old Password"
        type="password"
        name="oldPassword"
        errMsg={errMsg}
        placeholder="현재 비밀번호를 입력해주세요."
        register={register}
      />
      <Input
        label="Password"
        type="password"
        name="newPassword"
        errMsg={errMsg1}
        placeholder="새로운 비밀번호를 입력해주세요."
        register={register1}
      />
      <Input
        label="Password Confirm"
        type="password"
        name="newPasswordConfirm"
        errMsg={errMsg2}
        placeholder="새로운 비밀번호를 재입력해주세요."
        register={register2}
      />
      <Btn onClick={onClick} type="submit" loading={loading} btnName="SAVE" />
    </>
  );
};

export const EditInputUserInfo = ({
  Type,
  dataErrMsg,
  errMsg,
  errMsg1,
  errMsg2,
  errMsg3,
  errMsg4,
  errMsg5,
  register,
  register1,
  register2,
  register3,
  register4,
  register5,
  onClick,
  loading,
}: any) => {
  const noUsernameMsg = `유저이름 미입력시 'Anonymous'로 저장됩니다. `;
  //
  return (
    <>
      {Type === 'userInfo' && !dataErrMsg && <OkMsg>{dataOkMsg}</OkMsg>}
      {Type === 'userInfo_noUsername' && !dataErrMsg && (
        <OkMsg>{noUsernameMsg}</OkMsg>
      )}
      {Type === 'userInfo' && dataErrMsg && <ErrMsg>{dataErrMsg}</ErrMsg>}
      <>
        <InputWrap>
          <Input
            label="Username"
            type="text"
            name="username"
            errMsg={errMsg}
            placeholder="새로운 닉네임을 입력해주세요."
            register={register}
          />
          <Input
            label="Name"
            type="text"
            name="name"
            errMsg={errMsg1}
            placeholder="이름을 입력해주세요."
            register={register1}
          />
        </InputWrap>
        <InputWrap>
          <Input
            label="Birth"
            type="date"
            name="birth"
            errMsg={errMsg2}
            placeholder="생년월일을 입력해주세요."
            register={register2}
          />
          <Select
            options={['남', '녀']}
            label="Gender"
            name="gender"
            errMsg={errMsg3}
            placeholder="성별을 선택해주세요."
            register={register3}
          />
        </InputWrap>
        <Input
          label="Location"
          type="text"
          name="location"
          errMsg={errMsg4}
          placeholder="거주지역을 입력해주세요."
          register={register4}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          errMsg={errMsg5}
          placeholder="새로운 이메일을 입력해주세요."
          register={register5}
        />
      </>
      <Btn onClick={onClick} type="submit" loading={loading} btnName={'SAVE'} />
    </>
  );
};
