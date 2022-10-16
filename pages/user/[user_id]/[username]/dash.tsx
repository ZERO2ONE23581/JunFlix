import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../src/Tools/Svg';
import { IGetUser } from '../../../../src/types/user';
import useUser from '../../../../src/libs/client/useUser';
import { HeadTitle } from '../../../../src/Tools/head_title';
import { MyBtn } from '../../../../src/Tools/Button/my_btn';
import useFollow from '../../../../src/libs/client/useFollow';
import { Host } from '../../../../src/components/user/read/dash/Host';
import { MyContents } from '../../../../src/components/user/read/dash/my_contents';
import { BtnWrap } from '../../../../styles/global';
import { AddBtnModal } from '../../../../src/components/user/read/dash/add_btn_modal';
import { CreatePost } from '../../../../src/components/post/create/create_post';
import { AnimatePresence } from 'framer-motion';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  //
  const [category, setCategory] = useState('created');
  const onClick = (type: string) => setCategory(type);
  //
  const { isFollowing } = useFollow(Number(user_id), 'user');
  const isMyPage = Boolean(loggedInUser?.id === data?.user?.id);
  const isBlur = Boolean(!isMyPage && !isFollowing);
  //
  const [addModal, setAddModal] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const add_item = {
    theme,
    isMyPage,
    modal: addModal,
    setCreatePost,
    setModal: setAddModal,
  };
  //
  return (
    <>
      <HeadTitle title={`${data?.user?.username}'s Page`} />
      <Page>
        <>
          <Host host={data?.user!} theme={theme} />
          <Buttons className="btn-wrap">
            <MyBtn
              type="button"
              onClick={() => onClick('created')}
              item={{ theme, name: 'Created', category }}
            />
            <MyBtn
              type="button"
              onClick={() => onClick('saved')}
              item={{ theme, name: 'Saved', category }}
            />
            <MyBtn
              type="button"
              onClick={() => onClick('likes')}
              item={{ theme, name: 'Likes', category }}
            />
          </Buttons>
          <Add className="add">
            <Svg
              type="add"
              theme={theme}
              onClick={() => setAddModal((p) => !p)}
            />
            <AddBtnModal item={{ ...add_item }} />
          </Add>
          <MyContents theme={theme} isBlur={isBlur} category={category} />
        </>
        <CreatePost
          theme={theme}
          modal={createPost}
          closeModal={() => setCreatePost(false)}
        />
      </Page>
    </>
  );
};
export default DashBoard;

const Page = styled.section`
  .host,
  .btn-wrap,
  .my-contents {
    padding: 20px;
  }
  height: 100vh;
  padding-top: 30px;
  gap: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .host {
    width: 100vw;
  }
  .following-boards {
    width: 100vw;
  }
  .lock {
    top: 65%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, 0%);
  }
`;
const Buttons = styled(BtnWrap)`
  position: relative;
  gap: 20px;
  margin: 0 auto;
  width: fit-content;
  button {
    width: 100px;
    padding-bottom: 10px;
  }
`;
const Add = styled.div`
  width: 50%;
  display: flex;
  position: relative;
  justify-content: flex-end;
  .add {
    z-index: 2;
  }
`;
