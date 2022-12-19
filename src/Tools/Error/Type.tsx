import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IMsgType {
  msg?: string;
  error?: string;
}
export const MessageType = ({ msg, error }: IMsgType) => {
  const router = useRouter();
  const [txt, setTxt] = useState({ eng: '', kor: '' });

  const reload = () => {
    setTimeout(() => {
      return router.reload();
    }, 2000);
  };
  useEffect(() => {
    if (msg || error) {
      if (msg === 'logged') {
        setTxt({ eng: 'Logged In.', kor: '로그인 되었습니다.' });
        router.push('/');
      }
      if (msg === 'email_not_exists') {
        setTxt({
          eng: "This email doesn't exists.",
          kor: '존재하지 않는 이메일 입니다.',
        });
        return reload();
      }
      if (msg === 'need_txt')
        return setTxt({
          eng: 'Please fill the blanks.',
          kor: '빈칸을 채워 주세요.',
        });
      if (msg === 'need_userInfo')
        return setTxt({
          eng: '회원님 정보 중 최소 1개를 선택해주세요.',
          kor: 'Please select at least one of your information  below.',
        });
      if (error === 'invalid_pw_og') {
        setTxt({
          kor: '기존의 비밀번호를 확인해 주세요.',
          eng: 'Please check original password.',
        });
        return reload();
      }
      if (msg === 'create_user_done')
        return setTxt({ eng: 'Welcome!', kor: ' 가입을 축하합니다!' });
      if (msg === 'updated') {
        setTxt({ eng: 'Updated.', kor: '업데이트 되었습니다.' });
        return reload();
      }

      if (msg === 'email_exists') {
        return setTxt({
          eng: 'Email already exists.',
          kor: '이미 존재하는 이메일 입니다.',
        });
      }
      if (msg === 'blur_board') {
        setTxt({
          kor: '블러를 지우려면 해당 보드를 팔로우(저장) 해야합니다.',
          eng: 'You need to follow(save) the BOARD to unblur the content.',
        });
        return reload();
      }
      if (msg === 'blur_user') {
        setTxt({
          kor: '블러를 지우려면 해당 유저를 팔로우 해야합니다.',
          eng: 'You need to follow the USER to unblur the content.',
        });
        return reload();
      }
      if (msg === 'created') {
        setTxt({ eng: 'Saved.', kor: '저장되었습니다.' });
        return reload();
      }
      if (msg === 'need_login') {
        setTxt({ eng: 'You must Login.', kor: '로그인이 필요합니다.' });
        return reload();
      }
      if (msg === 'deleted') {
        setTxt({ eng: 'Deleted.', kor: '삭제완료' });
        return reload();
      }
    }

    if (error === 'email_exists') {
      setTxt({
        kor: '이미 존재하는 이메일 입니다.',
        eng: 'This email already exists.',
      });
      return reload();
    }
    if (error === 'need_post_select')
      return setTxt({
        kor: '보드에 정리할 최소 1개 이상의 포스트를 선택해주세요.',
        eng: 'Please select at least one post to organize to your boards.',
      });
    if (error === 'invalid_host')
      return setTxt({
        kor: '호스트가 일치하지 않습니다. 입력값을 다시 확인해주세요.',
        eng: 'Host of this content does not match. Please check your inputs again.',
      });
    if (error === 'need_txt')
      return setTxt({
        kor: '빈칸을 입력해 주세요.',
        eng: 'Please fill in the blanks.',
      });
    if (msg === 'invalid_token') {
      setTxt({
        kor: '토큰번호가 일치하지 않습니다.',
        eng: "Token number doesn't match.",
      });
      return reload();
    }
    if (error === 'max_token') {
      return setTxt({
        kor: '토큰은 6자리 숫자입니다.',
        eng: 'Token must be 6 digits.',
      });
    }
    if (error === 'need_token')
      return setTxt({
        kor: '6자리 토큰을 입력해 주세요.',
        eng: 'Please type 6 digits token.',
      });
    if (error === 'need_userId')
      return setTxt({
        kor: '아이디를 입력해 주세요.',
        eng: 'Please type your ID.',
      });
    if (error === 'max_name')
      return setTxt({
        eng: 'Name must be less than 20 words.',
        kor: '이름은 20자를 초과할 수 없습니다.',
      });
    if (error === 'max_username')
      return setTxt({
        eng: 'Username must be less than 20 words.',
        kor: '유저이름은 20자를 초과할 수 없습니다.',
      });
    if (error === 'pw_unmatch')
      return setTxt({
        eng: 'Each passwords are not matched.',
        kor: '각 비밀번호가 서로 일치하지 않습니다.',
      });
    if (error === 'need_avatar')
      return setTxt({
        eng: 'Please select new avatar.',
        kor: '새로운 아바타를 선택해주세요.',
      });
    if (error === 'need_email')
      return setTxt({
        eng: 'Please type your email.',
        kor: '이메일을 입력해주세요.',
      });
    if (error === 'need_new_password')
      return setTxt({
        eng: 'Please type new password.',
        kor: '새로운 비밀번호를 입력해주세요.',
      });
    if (error === 'invalid_email')
      return setTxt({
        eng: 'Please type valid email form.',
        kor: '올바른 이메일 형식을 입력해주세요.',
      });
    if (error === 'need_password')
      return setTxt({
        eng: 'Please type your password.',
        kor: '비빌번호를 입력해주세요.',
      });
    if (error === 'need_password_confirm')
      return setTxt({
        eng: 'Please type your password confirm.',
        kor: '확인 비빌번호를 입력해주세요.',
      });
    if (error === 'invalid_password_confirm')
      return setTxt({
        eng: `Password doesn't match. Please re-type your passwords.`,
        kor: `비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해 주세요.`,
      });
    if (error === 'min_password')
      return setTxt({
        eng: 'Password must be more than 8 letters.',
        kor: '비밀번호는 최소 8자리 이상이어야 합니다.',
      });
    if (error === 'max_password')
      return setTxt({
        eng: 'Password must be less than 16 letters.',
        kor: '비밀번호는 16자리 초과할 수 없습니다.',
      });
    if (error === 'invalid_password')
      return setTxt({
        eng: 'Password must include at least 1 letter, number, special charactor.',
        kor: '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
      });
    if (error === 'need_title')
      return setTxt({
        kor: '빈칸에 제목을 적어 주세요.',
        eng: 'Please type the title on the blank.',
      });
    if (error === 'max_board_title')
      return setTxt({
        kor: '보드 제목의 최대 글자수는 30자 입니다.',
        eng: 'Maximum board title must be 30 or less letters.',
      });
    if (error === 'max_board_desc')
      return setTxt({
        kor: '보드의 최대 글자수는 700자 입니다.',
        eng: 'Maximum letters of board must be 700 or less.',
      });
    if (error === 'max_post_title')
      return setTxt({
        kor: '포스트 제목의 최대 글자수는 50자 입니다.',
        eng: 'Maximum post title must be 50 or less letters.',
      });
    if (error === 'max_post_desc')
      return setTxt({
        kor: '포스트의 최대 글자수는 1000자 입니다.',
        eng: 'Maximum letters of post must be 1000 or less.',
      });
    if (error === 'need_userInfo')
      return setTxt({
        eng: 'You need type at least one for the update.',
        kor: '수정을 위해 최소 한개의 유저정보를 입력해주세요.',
      });
    if (error === 'need_email')
      return setTxt({
        eng: 'Please type your email.',
        kor: '이메일을 입력해주세요.',
      });
    if (error === 'need_comment')
      return setTxt({
        eng: 'Please type your Comment.',
        kor: '댓글을 입력해주세요.',
      });
    if (error === 'overmax_comment')
      return setTxt({
        eng: `Comment can not exeed more than 700 letters.`,
        kor: '댓글은 700자를 초과할 수 없습니다.',
      });
    if (error === 'invalid_email')
      return setTxt({
        eng: 'Please type valid email form.',
        kor: '올바른 이메일 형식을 입력해주세요.',
      });
    //
    if (error === 'need_password')
      return setTxt({
        eng: 'Please type your password.',
        kor: '비빌번호를 입력해주세요.',
      });
    if (error === 'need_password_confirm')
      return setTxt({
        eng: 'Please type your password confirm.',
        kor: '확인 비빌번호를 입력해주세요.',
      });
    if (error === 'invalid_pw')
      return setTxt({
        kor: `비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해 주세요.`,
        eng: `Password doesn't match. Please re-type your passwords.`,
      });
    if (msg === 'invalid_pw') {
      setTxt({
        kor: `비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해 주세요.`,
        eng: `Password doesn't match. Please re-type your passwords.`,
      });
      return reload();
    }
    if (error === 'min_password')
      return setTxt({
        eng: 'Password must be more than 8 letters.',
        kor: '비밀번호는 최소 8자리 이상이어야 합니다.',
      });
    if (error === 'min_password')
      return setTxt({
        eng: 'Password must be less than 16 letters.',
        kor: '비밀번호는 16자리 초과할 수 없습니다.',
      });
    if (error === 'invalid_password')
      return setTxt({
        eng: 'Password must include at least 1 letter, number, special charactor.',
        kor: '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
      });
  }, [error, setTxt, msg]);
  return { txt };
};
