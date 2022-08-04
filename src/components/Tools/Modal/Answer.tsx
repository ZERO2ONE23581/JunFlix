import Link from 'next/link';
import styled from '@emotion/styled';
import { IconBtn } from '../Button/Icon';
import { Dispatch, SetStateAction } from 'react';
import { SmallModal, DimBackground } from '../../../../styles/global';

interface IAnswer {
  max?: {
    title?: number;
    intro?: number;
    content?: number;
  };
  type: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const Answer = ({ type, closeModal, max }: IAnswer) => {
  return (
    <>
      <Cont>
        <IconBtn
          size="2rem"
          type="button"
          svgType="close"
          onClick={() => closeModal(false)}
        />
        {type && Texts(type, max!)}
      </Cont>
      <DimBackground zIndex={99} onClick={() => closeModal(false)} />
    </>
  );
};
const Cont = styled(SmallModal)``;

const Texts = (
  type: string,
  max: { title?: number; intro?: number; content?: number }
) => {
  return (
    <>
      {type === 'edit-review' && (
        <>
          <span>리뷰제목과 영화제목은 30자를 넘을수 없습니다.</span>
          <span>리뷰는 최소 50자 이상이어야 합니다.</span>
          <span>별점은 0부터 5까지 선택가능합니다.</span>
          <span>한줄평은 30자 이내 작성할 수 있습니다.</span>
          <span className="red">
            리뷰제목, 영화제목, 장르선택을 입력해주세요. (필수사항)
          </span>
          <span>
            Maximum length of review title and movie title are no longer than 30
            letters.
          </span>
          <span>
            Minimun length of review should be more or equal to 50 letters.
          </span>
          <span> You can give stars from 0 to 5.</span>
          <span>
            Maximum length of one line review is no longer than 30 letters.
          </span>
          <span className="red">
            Please type review title, movie title and select movie genre.
            (REQUIRED)
          </span>
        </>
      )}
      {type === 'read-review' && (
        <>
          <span>제목을 클릭하면 해당 리뷰로 이동합니다.</span>
          <span>Click the review title to see the review.</span>
        </>
      )}
      {type === 'edit-password' && (
        <>
          <span>현재 비밀번호를 입력하세요?</span>
          <span>새로운 비밀번호를 입력하고 확인란에 재입력하세요.</span>
          <span>Type your current Password.</span>
          <span>Type your new password and retype it on the input beside.</span>
          <span className="red">비밀번호가 기억나지 않습니까?</span>
          <span className="red">You don't remember your current password?</span>
          <span>
            <Link href="/user/find/password">
              <a>&rarr; 비밀번호 찾기</a>
            </Link>
          </span>
        </>
      )}
      {type === 'verify-email' && (
        <>
          <span>인증을 위해 회원님의 이메일을 입력해주세요.</span>
          <span>올바른 이메일 형식을 입력해야 합니다.</span>
          <span>Please type your email to verification.</span>
          <span>Email must be in valid form.</span>
        </>
      )}
      {type === 'verify-token' && (
        <>
          <span>인증을 위하여 6자리 인증번호를 입력해주세요.</span>
          <span>Please type 6 digit number for verification.</span>
        </>
      )}
      {type === 'verify-id' && (
        <>
          <span>인증을 위하여 아이디를 입력해주세요.</span>
          <span>Please type your ID for verification.</span>
        </>
      )}
      {type === 'create-useravatar' && (
        <>
          <span>프로필 사진을 추가하려면 아이콘을 클릭하세요.</span>
          <span>프로필 사진은 추후에 수정 가능합니다.</span>
          <span>Click the icon to add profile picture.</span>
          <span>You can edit picture later.</span>
        </>
      )}
      {type === 'create-userinfo' && (
        <>
          <span>이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</span>
          <span>이름은 추후에 수정 가능합니다.</span>
          <span>
            Username is going to be saved as 'Anonymous' if you don't put any.
          </span>
          <span>You can edit your username after register.</span>
        </>
      )}
      {type === 'create-id' && (
        <>
          <span>
            * 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.
          </span>
          <span>* 아이디는 대소문자를 구분하지 않습니다.</span>
          <span>
            * Id must include Alphabets or 6 - 20 numbers without special
            symbols.
          </span>
          <span>* ID can be either uppercase of lowercase.</span>
        </>
      )}
      {type === 'create-password' && (
        <>
          <span>Please type your new password.</span>
          <span>새로운 비밀번호를 입력해주세요.</span>
        </>
      )}
      {type === 'edit-userinfo' && (
        <>
          <span>이름과 유저이름은 10자를 초과할수 없습니다.</span>
          <span>올바른 이메일 형식을 입력해야 합니다.</span>
          <span>Name and Username can't be more than 10 letters.</span>
          <span>You need a valid email form.</span>
        </>
      )}
      {type === 'edit-id' && (
        <>
          <span>
            아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.
          </span>
          <span> 아이디는 대소문자를 구분하지 않습니다.</span>
          <span>
            Id must include Alphabets or 6 - 20 numbers without special symbols.
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
      {type === 'edit-useravatar' && (
        <>
          <span>
            프로필 사진을 수정하거나 만드려면 아이콘 (프로필 사진)을 누르세요.
          </span>
          <span>
            Click the icon (picture) to edit or create profile picture.
          </span>
        </>
      )}
      {type === 'delete-account' && (
        <>
          <span>계정은 삭제 후 복구가 불가합니다.</span>
          <span>You can't recover this account after delete.</span>
        </>
      )}
      {type === 'home' && (
        <>
          <span>
            인기콘텐츠, 개봉예정작, 현재상영작 등 다양한 영화관련 정보를 얻으실
            수 있습니다.
          </span>
          <span>
            보드는 영화와 관련된 사진이나 정보를 공유할수 있는 공간입니다.
          </span>
          <span>
            상대방의 보드를 팔로우하면 호스트의 포스트를 볼 수 있습니다.
          </span>
          <span>보드를 생성하면 게시물 (포스트)를 만드실수 있습니다.</span>
          <span>
            시청한 영화에 대한 리뷰를 작성하고 다른이의 리뷰를 볼 수 있습니다.
          </span>
          <span>You can get movie information such as</span>
          <span>popular contents, now playing and upcoming movies.</span>
          <span>
            Board is where you can create your post to share movie ideas.
          </span>
          <span>You can see the posts of the board that you follow.</span>
          <span>You can create posts when you have your board.</span>
          <span>You can create movie reivews and read other's reviews.</span>
        </>
      )}
      {type === 'edit-board' && (
        <>
          <span>보드를 수정하려면 세팅아이콘을 클릭하세요.</span>
          <span>보드 배경사진은 풍경아이콘을 클릭하세요.</span>
          <span>보드를 만든 본인만이 보드수정이 가능합니다.</span>
          <span>포스트를 확인하려면 포스트 썸네일 이미지를 클릭하세요.</span>
          <span>Click the setting icon beside to edit your board.</span>
          <span>Click the landscape icon to edit borad background image.</span>
          <span>Only the board owner can edit his board.</span>
          <span>Click the post thumnail image icon to see the post.</span>
        </>
      )}
      {type === 'create-board' && (
        <>
          <span>
            <span>보드제목은</span>
            <span className="red">{max?.title}</span>
            <span> 자 이내여야 합니다.</span>
          </span>
          <span>
            <span>소개글은</span>
            <span className="red">{max?.intro}</span>
            <span> 이내여야 합니다.</span>
          </span>
          <span>보드의 사진을 추가하려면 아이콘을 클릭해주세요.</span>
          <span>
            <span>Board title must be less than or equal to</span>
            <span className="red">{max?.title}</span>
            <span> words.</span>
          </span>
          <span>
            <span>Board intro must be less than or equal to</span>
            <span className="red">{max?.intro}</span>
            <span> words.</span>
          </span>
          <span>Please click the icon beside to add photo on your Board.</span>
        </>
      )}
      {type === 'board' && (
        <>
          <span>새로운 게시물을 생성하려면 보드를 선택해주세요.</span>
          <span>새로운 보드를 생성하려면 '+' 표시 아이콘을 클릭해주세요.</span>
          <span>보드를 팔로우 하려면 '팔로우'버튼을 클릭하세요.</span>
          <span>팔로우된 보드는 'ON AIR'로 표시됩니다.</span>
          <span>보드의 팔로우를 취소하려면 'ON AIR' 버튼을 클릭하세요.</span>
          <span>언팔로우된 보드는 'Follow'로 표시됩니다.</span>
          <span>Please select the board to create new POST.</span>
          <span>Please '+' icon on the side to create new BOARD.</span>
          <span>Click the follow button to 'Follow' board.</span>
          <span>Followed board is displayed as 'ON AIR'</span>
          <span>Click the 'ON AIR' button to unfollow board.</span>
          <span>Unfollowed board is displayed as 'Follow'</span>
        </>
      )}
      {type === 'create-post' && (
        <>
          <span>게시물 제목은 {max?.title}자 이내여야 합니다.</span>
          <span>게시물 내용은 {max?.content}자 이내여야 합니다.</span>
          <span>
            새로운 사진을 업로드 하시길 원하면 왼쪽 사진을 클릭하세요.
          </span>
          <span>
            Maximum length of the post title is less than {max?.title} words.
          </span>
          <span>
            Maximum length of the post content is less than {max?.content}{' '}
            words.
          </span>
          <span>
            Click the picture on your left if you'd like to pick a new one.
          </span>
        </>
      )}
      {type === 'post' && (
        <>
          <span>포스트 내용을 보려면 각 포스트를 클릭하세요.</span>
          <span>새로운 게시물을 생성하려면 보드를 선택해주세요.</span>
          <span>Click the post to see the content.</span>
          <span>Please select the board to create new POST.</span>
        </>
      )}
    </>
  );
};
