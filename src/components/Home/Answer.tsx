import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../styles/global';

interface IAnswer {
  setAnswer: Dispatch<SetStateAction<boolean>>;
}
export const Answer = ({ setAnswer }: IAnswer) => {
  return (
    <>
      <Cont>
        <span>
          * 인기콘텐츠, 개봉예정작, 현재상영작 등 다양한 영화관련 정보를 얻으실
          수 있습니다.
        </span>
        <span>
          * 보드는 영화와 관련된 사진이나 정보를 공유할수 있는 공간입니다.
        </span>
        <span>
          * 상대방의 보드를 팔로우하면 호스트의 포스트를 볼 수 있습니다.
        </span>
        <span>* 보드를 생성하면 게시물 (포스트)를 만드실수 있습니다.</span>
        <span>
          * 시청한 영화에 대한 리뷰를 작성하고 다른이의 리뷰를 볼 수 있습니다.
        </span>
        <span>* You can get movie information such as</span>
        <span>popular contents, now playing and upcoming movies.</span>
        <span>
          * Board is where you can create your post to share movie ideas.
        </span>
        <span>* You can see the posts of the board that you follow.</span>
        <span>* You can create posts when you have your board.</span>
        <span>* You can create movie reivews and read other's reviews.</span>
      </Cont>
      <DimBackground zIndex={1} onClick={() => setAnswer(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
