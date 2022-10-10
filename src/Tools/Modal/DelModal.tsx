import styled from '@emotion/styled';
import { InputWrap } from '../Input';
import { IData } from '../../types/global';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../styles/theme';
import useMutation from '../../libs/client/useMutation';
import { Overlay } from '../../../styles/global';
import { IBoardType } from '../../types/board';
import { modalVar, opacityVar, overlayVar } from '../../../styles/variants';
import { Btn } from '../Button';
import { ErrModal } from '../errorModal';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingModal } from './Loading';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';
import { IUserForm } from '../../types/user';
import { Modal_Box } from './Modal';
import { Svg } from '../Svg';

interface IModalBox extends ITheme {
  type: string;
  modal: boolean;
  ogData: IBoardType;
  onClick: () => void;
}
export const DelModalBox = ({
  type,
  modal,
  theme,
  ogData,
  onClick,
}: IModalBox) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  //
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  //post api
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type && ogData) {
      if (type === 'del-board') setApi(`/api/board/${ogData.id}/delete`);
    }
  }, [setApi, type, ogData]);
  //
  const [isDel, setIsDel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [post, { data, loading }] = useMutation<IData>(api && api);
  console.log(data);
  const onValid = async ({ userId }: IUserForm) => {
    const isMatch = Boolean(ogData.user.userId !== userId);
    if (!isMatch) {
      setError('userId', {
        message: '보드의 호스트가 아닙니다. (invalid board host.)',
      });
    }
    setLoading(true);
    if (loading) return;
    return post({ userId, user_id: loggedInUser?.id });
  };
  //
  const [dataErr, setDataErr] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setDataErr(data.error);
        if (data.ok) {
          setDataErr('삭제완료 (Delete Completed)');
          setTimeout(() => {
            return router.replace(`/`);
          }, 2000);
        }
      }, 1000);
    }
  }, [data, setLoading, setTimeout, router, setDataErr]);
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <>
              <Cont
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={modalVar}
                className={'edit-board-modal'}
              >
                <Svg
                  type="close"
                  size="2rem"
                  theme={theme}
                  onClick={() => {
                    setIsDel(false);
                    onClick();
                  }}
                />
                <h1>Delete this Board</h1>
                {!isDel && (
                  <motion.div
                    className="step1"
                    exit="exit"
                    initial="initial"
                    animate="animate"
                    variants={opacityVar}
                  >
                    <h2>
                      <span className="kor">
                        <span>이 보드를 정말로 삭제하겠습니까?</span>
                        <span>보드는 삭제후 복구가 불가합니다.</span>
                      </span>
                      <span className="eng">
                        <span>Are you sure for this?</span>
                        <span>Board can't be recovered after deletion.</span>
                      </span>
                    </h2>
                    <Btn
                      theme={theme}
                      type="button"
                      name="Delete"
                      onClick={() => setIsDel(true)}
                    />
                  </motion.div>
                )}
                {isDel && (
                  <Form
                    exit="exit"
                    initial="initial"
                    animate="animate"
                    className="del-board-form"
                    variants={opacityVar}
                    onSubmit={handleSubmit(onValid)}
                  >
                    <h2>
                      <span>보드를 삭제하려면 아이디를 입력하세요.</span>
                      <span className="eng">
                        Type your ID to delete this board.
                      </span>
                    </h2>
                    <InputWrap
                      id="userId"
                      type="text"
                      label="USER ID"
                      theme={theme}
                      error={errors.userId?.message}
                      watch={Boolean(watch('userId'))}
                      register={register('userId', {
                        required: '아이디를 입력해주세요.',
                      })}
                    />
                    <Btn type="submit" name="Delete" theme={theme} />
                  </Form>
                )}
              </Cont>
              <Overlay
                exit="exit"
                initial="initial"
                animate="animate"
                onClick={onClick}
                variants={overlayVar}
              />
              {dataErr && (
                <ErrModal
                  theme={theme}
                  error={dataErr}
                  setDataErr={setDataErr}
                />
              )}
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal_Box)`
  width: 35vw;
  height: 50vh;
  min-height: 50vh;
  .del-board-form {
    gap: 20px;
    justify-content: center;
    button {
      margin: 0;
    }
  }
  h1 {
    color: red;
  }
  .step1 {
    button {
      width: 100%;
      padding: 10px 20px;
      font-size: 1.4rem;
    }
    h2 {
      text-align: center;
      font-style: italic;
      .kor,
      .eng {
        display: block;
        margin-bottom: 20px;
        > span {
          :first-of-type {
            font-size: 1.5rem;
            margin-bottom: 5px;
          }
          :nth-of-type(2) {
            color: red;
            opacity: 0.9;
            font-size: 1.4rem;
          }
          display: block;
        }
      }
    }
  }
`;
const Form = styled(motion.form)`
  padding: 0 50px;
  h2 {
    width: 100%;
    font-size: 1.3rem;
    .eng {
      font-size: 1.5rem;
    }
    span {
      display: block;
      text-align: center;
      margin-bottom: 10px;
    }
  }
`;
