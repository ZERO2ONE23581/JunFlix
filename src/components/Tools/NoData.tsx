import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '../../libs/client/useUser';

interface INoData {
  type: string;
}
export const NoData = ({ type }: INoData) => {
  console.log(type);
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [text, setText] = useState('');
  useEffect(() => {
    if (type === 'post') setText('Post');
    if (type === 'board') setText('Board');
    if (type === 'review') setText('Review');
  }, [type, setText]);
  const onClick = () => {
    if (type === 'board') router.push(`/user/${loggedInUser?.id}/board/create`);
    if (type === 'post') {
      alert(
        `포스트를 생성할 보드를 선택하세요. (Select Board where you make your posts.)`
      );
      router.push(`/user/${loggedInUser?.id}/${loggedInUser?.username}/boards`);
    }
    if (type === 'review')
      router.push(`/user/${loggedInUser?.id}/review/create`);
  };
  return (
    <Cont>
      {text !== '' && (
        <>
          <h1>{text} doesn't exists.</h1>
          <h1>{text} 가 존재하지 않습니다. </h1>
        </>
      )}
      {type === 'likes-post' && (
        <>
          <h1>No likes on any POST yet.</h1>
          <h1>좋아요를 누른 POST가 아직 없습니다.</h1>
        </>
      )}
      {type === 'likes-review' && (
        <>
          <h1>No likes on any REVIEW yet.</h1>
          <h1>좋아요를 누른 REVIEW가 아직 없습니다.</h1>
        </>
      )}
      {text != '' && (
        <h2 onClick={onClick}>
          {text} 생성하러 가기 (Create {text}) &rarr;
        </h2>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  padding: 20px;
  margin-top: 100px;
  text-align: center;
  h1,
  h2 {
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 10px;
  }
  h1 {
    color: ${(p) => p.theme.color.logo};
  }
  h2 {
    margin-top: 15px;
    font-size: 1.2rem;
    :hover {
      cursor: pointer;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
