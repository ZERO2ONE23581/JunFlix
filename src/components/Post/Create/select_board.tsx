import { useEffect, useState } from 'react';
import useUser from '../../../libs/client/useUser';
import useSWR from 'swr';
import { IGetBoards } from '../../../types/board';
import styled from '@emotion/styled';
import { color, variants } from '../../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useMutation from '../../../libs/client/useMutation';
import { MessageModal } from '../../../Tools/msg_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { IRes } from '../../../types/global';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Btn } from '../../../Tools/Button';
import { Svg } from '../../../Tools/Svg';
import { PostModal } from '../../../../styles/post';
import { ICreatePostRes } from '../../../types/post';

interface ISelectBoard {
  theme: boolean;
  create_result: {
    isPost: boolean;
    post_id: number;
  };
}
export const SelectBoard = ({ theme, create_result }: ISelectBoard) => {
  const { isPost, post_id } = create_result;
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [saveId, setSaveId] = useState(0);
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const { data: given_data } = useSWR<IGetBoards>(`/api/board/all`);
  const myBoards = given_data?.boards?.filter(
    (e) => e.host_id === loggedInUser?.id
  );
  //if no board exists
  const boardExists = Boolean(myBoards?.length! > 0);
  useEffect(() => {
    if (isPost && !boardExists) return setMessage('create_post');
  }, [isPost, boardExists, setMessage, myBoards]);

  //POST API
  const [post, { data, loading }] = useMutation<IRes>(
    `/api/post/${post_id}/update`
  );
  const skipThis = () => {
    setLoading(true);
    return post({ board_id: null, fetch_type: 'update_post_skip' });
  };
  const onClick = () => {
    if (loading) return;
    if (!boardExists) return setMessage('no board exists.');
    if (!Boolean(isPost && post_id)) return setMessage('post id missed.');
    if (!saveId) return setMessage('Select the board please.');
    setLoading(true);
    return post({ board_id: saveId, fetch_type: 'update_post' });
  };

  //POST result
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) setMessage(data.error);
        if (data.message) setMessage(data.message);
      }, 1000);
    }
  }, [data, setLoading, setMessage]);
  //
  return (
    <AnimatePresence>
      {isPost && (
        <>
          {!Loading && (
            <>
              {Boolean(boardExists && !Loading) && (
                <Modal
                  exit="exit"
                  animate="animate"
                  initial="initial"
                  custom={!theme}
                  variants={variants}
                >
                  <Layer
                    custom={theme}
                    variants={variants}
                    className="layer"
                    animate="animate"
                  >
                    <div>
                      <Svg type="X" theme={theme} onClick={skipThis} />
                    </div>
                    <div>
                      <h1>Select Board</h1>
                    </div>
                    <div>
                      <Btn
                        type="button"
                        onClick={onClick}
                        item={{ theme, name: 'Save' }}
                      />
                    </div>
                  </Layer>

                  <Map className="map">
                    <h1>
                      <span>Select Board to save your post.</span>
                      <span>포스트를 저장할 보드를 선택해주세요.</span>
                    </h1>
                    {myBoards &&
                      myBoards?.map((e) => (
                        <ListWrap
                          key={e.id}
                          animate="animate"
                          whileHover="hover"
                          variants={listVar}
                          onClick={() => setSaveId(e.id)}
                          custom={{
                            theme: !theme,
                            isClicked: Boolean(saveId === e.id),
                          }}
                        >
                          <li className="cover">
                            <img src="/img/home-bg-dn.jpg" alt="" />
                          </li>
                          <li>
                            <h2>{e.title}</h2>
                          </li>
                        </ListWrap>
                      ))}
                  </Map>
                  <Skip>
                    <Btn
                      type="button"
                      onClick={skipThis}
                      item={{ theme: !theme, name: 'Skip' }}
                    />
                  </Skip>
                </Modal>
              )}
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
          <OverlayBg />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(PostModal)`
  font-size: 1.2rem;
  width: 35vw;
  height: fit-content;
  .layer {
    width: 100%;
    padding: 10px;
  }
  .map {
    width: 100%;
    max-height: 80%;
  }
`;

const Layer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  > div {
    ////border: 2px solid blue;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    :nth-of-type(1) {
      justify-content: flex-start;
    }
    :nth-of-type(3) {
      justify-content: flex-end;
      button {
        width: fit-content;
      }
    }
  }
`;
const Map = styled(motion.div)`
  padding: 20px 0;
  overflow: auto;
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: column;
  h1 {
    gap: 5px;
    display: flex;
    font-size: 1.3rem;
    padding-left: 20px;
    flex-direction: column;
    align-items: flex-start;
    span {
      display: block;
      font-style: italic;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
const ListWrap = styled(motion.ul)`
  //border: 5px solid red;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    padding: 10px;
    width: 100%;
    h2 {
      font-weight: 500;
      font-size: 1.5rem;
    }
    //border: 2px solid blue;
  }
  .cover {
    padding: 0;
    width: fit-content;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 5px;
    }
  }
`;
const Skip = styled(motion.div)`
  ////border: 2px solid red;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  button {
    width: 100px;
  }
`;
const listVar = {
  animate: ({ isClicked, theme }: any) => ({
    transition: { duration: 0.6 },
    color: isClicked ? '#ffffff' : color(theme),
    backgroundColor: isClicked ? '#E50914' : color(!theme),
  }),
  hover: ({ isClicked }: any) => ({
    color: '#ffffff',
    backgroundColor: '#E50914',
    transition: { duration: 0.6 },
  }),
};
