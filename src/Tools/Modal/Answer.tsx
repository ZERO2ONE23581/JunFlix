import Link from 'next/link';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Overlay } from '../../../styles/global';
import { Svg } from '../Svg';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { answerVar } from '../../../styles/variants';
interface IText {
  type: string;
  boardMax?: {
    title: number;
    intro: number;
  };
}
interface IAnswer extends ITheme {
  type: string;
  answer: boolean;
  boardMax?: {
    title: number;
    intro: number;
  };
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const Answer = ({
  answer,
  theme,
  type,
  closeModal,
  boardMax,
}: IAnswer) => {
  const Texts = ({ type, boardMax }: IText) => {
    return (
      <>
        {type === 'update-review' && (
          <>
            <li>리뷰제목과 영화제목은 30자를 넘을수 없습니다.</li>
            <li>리뷰는 최소 50자 이상이어야 합니다.</li>
            <li>별점은 0부터 5까지 선택가능합니다.</li>
            <li>한줄평은 30자 이내 작성할 수 있습니다.</li>
            <li>리뷰제목, 영화제목, 장르선택을 입력해주세요. (필수사항)</li>
            <li>
              Max length of review title and movie title are no longer than 30
              letters.
            </li>
            <li>Min length of review should be more or equal to 50 letters.</li>
            <li> You can give stars from 0 to 5.</li>
            <li>Max length of one line review is no longer than 30 letters.</li>
            <li>
              Please type review title, movie title and select movie genre.
              (REQUIRED)
            </li>
          </>
        )}
        {type === 'read-review' && (
          <>
            <li>제목을 클릭하면 해당 리뷰로 이동합니다.</li>
            <li>Click the review title to see the review.</li>
          </>
        )}
        {type === 'find-id-step1' && (
          <>
            <li>올바른 이메일 형식을 입력해야 합니다.</li>
            <li>인증을 위해 회원님의 이메일을 입력해주세요.</li>
            <li>You need to type email in valid form.</li>
            <li>Please type your email to verification.</li>
          </>
        )}
        {(type === 'find-id-step2' || type === 'find-pw-step2') && (
          <>
            <li>토큰번호는 이메일을 통하여 확인할 수 있습니다.</li>
            <li>인증을 위하여 6자리 토큰번호를 입력해주세요.</li>
            <li>The token number is sent to you email.</li>
            <li>Type 6 digit number for verification.</li>
          </>
        )}
        {type === 'find-pw-step1' && (
          <>
            <li>인증을 위하여 아이디를 입력해주세요.</li>
            <li>아이디 인증 후 이메일로 토큰을 받을 수 있습니다.</li>
            <li>
              아이디가 기억나지 않는다면 박스하단 '아이디 찾기'를 클릭하세요.
            </li>
            <li>Please type your ID for verification.</li>
            <li>You can receive token after verifying your id.</li>
            <li>Click the link 'Find ID' below if you forgot your id.</li>
          </>
        )}
        {type === 'join-step3' && (
          <>
            <li>프로필 사진을 추가하려면 아이콘을 클릭하세요.</li>
            <li>프로필 사진은 추후에 수정 가능합니다.</li>
            <li>Click the icon to add profile picture.</li>
            <li>You can edit picture later.</li>
          </>
        )}
        {type === 'join-step2' && (
          <>
            <li>이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</li>
            <li>
              유저의 이름은 옵션사항 입니다. 이름은 추후에 수정 가능합니다.
            </li>
            <li>
              Username is going to be saved as 'Anonymous' if you don't put any.
            </li>
            <li>
              Username is optional. You can edit your it after registration.
            </li>
          </>
        )}
        {type === 'join-step1' && (
          <>
            <li>아이디는 대소문자를 구분하지 않습니다.</li>
            <li>
              아이디는 기호를 제외한 영문자 또는{' '}
              <span className="logo">6 - 20</span>자리 숫자를 포함해야합니다.
            </li>
            <li>ID can be either uppercase of lowercase.</li>
            <li>
              ID must include Alphabets or <span className="logo">6 - 20</span>
              numbers without special symbols.
            </li>
          </>
        )}
        {type === 'find-pw-step3' && (
          <>
            <li>새로운 비밀번호를 입력해주세요.</li>
            <li>비밀번호는 최소 8자리, 최대 16자리 길이여야 합니다.</li>
            <li>
              비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야
              합니다..
            </li>
            <li>Please type your new password.</li>
            <li>Length of your password should be between min 8 and max 16.</li>
            <li>Your password must include 1 or more special letters.</li>
          </>
        )}
        {type === 'edit-user4' && (
          <>
            <li>
              프로필 사진을 수정하거나 만드려면 아이콘 (프로필 사진)을 누르세요.
            </li>
            <li>Click the icon (picture) to edit or create profile picture.</li>
          </>
        )}
        {type === 'edit-user3' && (
          <>
            <li>올바른 이메일 형식을 입력해야 합니다.</li>
            <li>이름과 유저이름은 10자를 초과할수 없습니다.</li>
            <li>You need a valid email form.</li>
            <li>Name and Username can't be more than 10 letters.</li>
          </>
        )}
        {type === 'edit-user2' && (
          <>
            <li>현재 비밀번호를 입력하세요.</li>
            <li>새로운 비밀번호를 입력하고 확인란에 재입력하세요.</li>
            <li>
              비밀번호가 기억나지 않는다면 하단 '비밀번호 찾기' 링크를
              클릭하세요.
            </li>
            <li>Type your current Password.</li>
            <li>Type your new password and retype it on the blank beside.</li>
            <li>Click 'find pw' link if you can't remember your password.</li>
          </>
        )}
        {type === 'edit-user1' && (
          <>
            <li>아이디는 대소문자를 구분하지 않습니다.</li>
            <li>
              아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.
            </li>
            <li> ID can be either uppercase of lowercase.</li>
            <li>
              Id must include Alphabets or 6 - 20 numbers without special
              symbols.
            </li>
          </>
        )}
        {type === 'edit-user5' && (
          <>
            <li>계정은 삭제 후 복구가 불가합니다.</li>
            <li>You can't recover this account after delete.</li>
          </>
        )}
        {type === 'home' && (
          <>
            <li>
              인기콘텐츠, 개봉예정작, 현재상영작 등 다양한 영화관련 정보를
              얻으실 수 있습니다.
            </li>
            <li>
              보드는 영화와 관련된 사진이나 정보를 공유할수 있는 공간입니다.
            </li>
            <li>
              상대방의 보드를 팔로우하면 호스트의 포스트를 볼 수 있습니다.
            </li>
            <li>보드를 생성하면 게시물 (포스트)를 만드실수 있습니다.</li>
            <li>
              시청한 영화에 대한 리뷰를 작성하고 다른이의 리뷰를 볼 수 있습니다.
            </li>
            <li>You can get movie information such as</li>
            <li>popular contents, now playing and upcoming movies.</li>
            <li>
              Board is where you can create your post to share movie ideas.
            </li>
            <li>You can see the posts of the board that you follow.</li>
            <li>You can create posts when you have your board.</li>
            <li>You can create movie reivews and read other's reviews.</li>
          </>
        )}
        {type === 'edit-board' && (
          <>
            <li>보드를 수정하려면 세팅아이콘을 클릭하세요.</li>
            <li>보드 배경사진은 풍경아이콘을 클릭하세요.</li>
            <li>보드를 만든 본인만이 보드수정이 가능합니다.</li>
            <li>포스트를 확인하려면 포스트 썸네일 이미지를 클릭하세요.</li>
            <li>Click the setting icon beside to edit your board.</li>
            <li>Click the landscape icon to edit borad background image.</li>
            <li>Only the board owner can edit his board.</li>
            <li>Click the post thumnail image icon to see the post.</li>
          </>
        )}
        {type === 'create-board' && (
          <>
            <li>
              소개글은 <span className="logo">{boardMax?.intro}</span>이내여야
              합니다.
            </li>
            <li>
              보드제목은 <span className="logo">{boardMax?.title}</span>자
              이내여야 합니다.
            </li>
            <li>보드의 사진을 추가하려면 아이콘을 클릭해주세요.</li>
            <li>
              Board title must be less than or equal to
              <span className="logo">{boardMax?.title}</span> words.
            </li>
            <li>
              Board intro must be less than or equal to
              <span className="logo">{boardMax?.intro}</span>
              words.
            </li>
            <li>Please click the icon beside to add photo on your Board.</li>
          </>
        )}
        {type === 'board' && (
          <>
            <li>새로운 게시물을 생성하려면 보드를 선택해주세요.</li>
            <li>새로운 보드를 생성하려면 '+' 표시 아이콘을 클릭해주세요.</li>
            <li>보드를 팔로우 하려면 '팔로우'버튼을 클릭하세요.</li>
            <li>팔로우된 보드는 'ON AIR'로 표시됩니다.</li>
            <li>보드의 팔로우를 취소하려면 'ON AIR' 버튼을 클릭하세요.</li>
            <li>언팔로우된 보드는 'Follow'로 표시됩니다.</li>
            <li>Please select the board to create new POST.</li>
            <li>Please '+' icon on the side to create new BOARD.</li>
            <li>Click the follow button to 'Follow' board.</li>
            <li>Followed board is displayed as 'ON AIR'</li>
            <li>Click the 'ON AIR' button to unfollow board.</li>
            <li>Unfollowed board is displayed as 'Follow'</li>
          </>
        )}
        {type === 'create-post' && (
          <>
            <li>게시물 제목은 {'max?.title'}자 이내여야 합니다.</li>
            <li>게시물 내용은 {'max?.content'}자 이내여야 합니다.</li>
            <li>새로운 사진을 업로드 하시길 원하면 왼쪽 사진을 클릭하세요.</li>
            <li>
              Max length of the post title is less than {'max?.title'} words.
            </li>
            <li>
              Max length of the post content is less than {'max?.content'}{' '}
              words.
            </li>
            <li>
              Click the picture on your left if you'd like to pick a new one.
            </li>
          </>
        )}
        {type === 'post' && (
          <>
            <li>포스트 내용을 보려면 각 포스트를 클릭하세요.</li>
            <li>포스트를 보려면 포스트의 보드를 팔로우해야 합니다.</li>
            <li>새로운 게시물을 생성하려면 보드를 선택해주세요.</li>
            <li>Click the post to see the content.</li>
            <li>To see a post you need to follow the board of the post.</li>
            <li>Please select the board to create new POST.</li>
          </>
        )}
      </>
    );
  };
  return (
    <AnimatePresence>
      {answer && (
        <>
          <Cont
            custom={theme}
            exit="exit"
            initial="initial"
            animate="animate"
            variants={answerVar}
          >
            <Svg
              size="2rem"
              type="close"
              theme={theme!}
              onClick={() => closeModal(false)}
            />
            {type && <ul>{Texts({ type, boardMax })}</ul>}
          </Cont>
          <Overlay
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => closeModal(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  font-size: 1.4rem;
  min-width: 300px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    li {
      text-align: center;
      line-height: 30px;
      font-style: italic;
    }
  }
  .logo {
    margin: 0 8px;
    color: ${(p) => p.theme.color.logo};
  }
`;
