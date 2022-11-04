import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FlexCol } from '../../../../styles/global';
import { HeadTitle } from '../../../../src/Tools/head_title';
import { useGetUser } from '../../../../src/libs/client/useUser';
import { CreatePost } from '../../../../src/components/Post/Create';
import { Host } from '../../../../src/components/User/Read/MyPage/Host';
import { BtnsWrap } from '../../../../src/components/User/Read/MyPage/BtnsWrap';
import { MyCreated } from '../../../../src/components/User/Read/MyPage/MyCreated';

const MyPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [type, setType] = useState('created');
  const { user, isMyAcct } = useGetUser(Number(user_id));
  const [create, setCreate] = useState({
    post: false,
    board: false,
    review: false,
  });
  //
  return (
    <>
      <HeadTitle title={`${user?.username}'s Page`} />
      <Page>
        <Host host={user!} theme={theme} isMyAcct={isMyAcct} />
        <Contents>
          <BtnsWrap _data={{ theme, type, setType, setCreate, isMyAcct }} />
          <MyCreated theme={theme} type={type} />
        </Contents>
        <CreatePost
          theme={theme}
          open={create.post}
          closeModal={() => setCreate((p) => ({ ...p, post: false }))}
        />
      </Page>
    </>
  );
};
export default MyPage;

const Contents = styled(FlexCol)`
  padding: 0 20rem;
  //border: 10px solid hotpink;
  .my-created {
    //border: 10px solid hotpink;
    .my-created-box {
      width: fit-content;
      //border: 5px solid yellow;
    }
  }
`;
const Page = styled.section`
  gap: 40px;
  height: 100%;
  min-height: 100vh;
  padding-top: 30px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;
{
  /* <Layer>
        <Blur className="block" isBlur={isBlur}></Blur>
        {isBlur && <Svg type="lock" theme={theme} item={{ size: '2rem' }} />}
      </Layer> */
}
// .lock {
//   top: 65%;
//   left: 50%;
//   z-index: 1;
//   position: absolute;
//   transform: translate(-50%, 0%);
// }
