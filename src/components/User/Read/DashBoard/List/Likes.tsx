import { useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../../../../../types/global';
import { Slider } from '../../../../../Tools/Slider';
import { ReviewList } from '../../../../Review/Read/List';

interface ILikesList {
  data: IData;
  username: string;
}
export const LikesList = ({ username, data }: ILikesList) => {
  const [type, setType] = useState('post');
  return (
    <Cont>
      <BtnWrap>
        <Button
          Type={type}
          type="button"
          likeType="post"
          onClick={() => setType('post')}
        >
          <span className="username">{username}</span>
          <span>님이 좋아하는 포스트</span>
        </Button>

        <Button
          Type={type}
          type="button"
          likeType="review"
          onClick={() => setType('review')}
        >
          <span className="username">{username}</span>
          <span>님이 좋아하는 리뷰</span>
        </Button>
      </BtnWrap>

      {type === 'post' && <Slider sliderType="post" sliderDetail="likes" />}
      {type === 'review' && (
        <ReviewList isMyPage reviews={data?.MyReviewLikes!} isLikesType />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  margin-top: 30px;
`;
const BtnWrap = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  margin: 0 auto 20px;
  align-items: center;
  justify-content: space-around;
`;
const Button = styled.button<{ Type: string; likeType: string }>`
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 550;
  padding-bottom: 5px;
  background-color: inherit;
  border-bottom: ${(p) =>
    p.Type === p.likeType && `3px double ${p.theme.color.logo}`};
  font-size: ${(p) => p.Type === p.likeType && '1.3rem'};
  color: ${(p) =>
    p.Type === p.likeType ? p.theme.color.logo : p.theme.color.font};
`;
