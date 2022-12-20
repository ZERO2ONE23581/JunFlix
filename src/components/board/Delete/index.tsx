import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { IForm } from '../../../types/global';
import { InputWrap } from '../../../Tools/Input';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { BoardModal, ITypeModal } from '../Update';
import { useUser } from '../../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityVar, variants } from '../../../../styles/variants';

export const DeleteBoard = ({ _data }: ITypeModal) => {
  const { user_id } = useUser();
  const {
    open,
    post,
    theme,
    loading,
    layoutId,
    original,
    setLoading,
    closeModal,
  } = _data;

  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onSubmit' });

  const onValid = async ({ userId }: IForm) => {
    const isMatch = Boolean(original.host.userId === userId);
    if (!isMatch) return setError('userId', { message: 'invalid_host' });
    setLoading(true);
    if (loading) return;
    return post({ userId, user_id });
  };
  //
  const [isDel, setIsDel] = useState(false);
  const clickClose = () => {
    closeModal();
    setIsDel(false);
  };
  //
  return (
    <AnimatePresence>
      {open && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            layoutId={layoutId}
            variants={variants}
            className={'edit-board-modal'}
          >
            <Svg
              type="close"
              theme={theme}
              onClick={clickClose}
              item={{ size: '2rem' }}
            />
            <h1>Delete the Board</h1>
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
                    <span>Are you sure to delete this board?</span>
                    <span>Board can't be recovered after deletion.</span>
                  </span>
                </h2>
                <Btn
                  type="button"
                  item={{ theme, name: 'Delete' }}
                  onClick={() => setIsDel(true)}
                />
              </motion.div>
            )}
            {isDel && (
              <Form
                exit="exit"
                initial="initial"
                animate="animate"
                variants={opacityVar}
                className="delete-board-form"
                onSubmit={handleSubmit(onValid)}
              >
                <h2>
                  <span>보드를 삭제하려면 아이디를 입력하세요.</span>
                  <span className="eng">
                    Type your ID to delete this board.
                  </span>
                </h2>
                <InputWrap
                  _data={{
                    theme,
                    id: 'userId',
                    label: 'ID',
                    type: 'text',
                    clearErrors,
                    text: watch('userId'),
                    error: errors.userId?.message!,
                    register: register('userId', { required: 'need_txt' }),
                  }}
                />
                <Btn type="submit" item={{ theme, name: 'Delete' }} />
              </Form>
            )}
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(BoardModal)`
  font-size: 1.4rem;
  margin-top: 15rem;
  height: fit-content;
  justify-content: space-around;
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(p) => p.theme.color.logo};
  }
  .step1 {
    button {
      width: 100%;
      padding: 10px 20px;
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
            margin-bottom: 10px;
          }
          :nth-of-type(2) {
            opacity: 0.9;
            color: ${(p) => p.theme.color.logo};
          }
          display: block;
        }
      }
    }
  }
`;
const Form = styled(motion.form)`
  gap: 20px;
  margin-top: 0;
  display: flex;
  padding: 0 50px;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
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
  button {
    padding: 10px 20px;
  }
`;