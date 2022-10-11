import { Svg } from '../../Tools/Svg';
import { Btn } from '../../Tools/Button';
import { useState } from 'react';
import styled from '@emotion/styled';
import { InputWrap } from '../../Tools/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { IForm } from '../../types/global';
import useUser from '../../libs/client/useUser';
import { ITypeModal, ModalCont } from './update';
import { modalVar, opacityVar } from '../../../styles/variants';
import { Modal } from '../../../styles/global';

export const DeleteBoard = ({
  post,
  theme,
  ogData,
  loading,
  setLoading,
  closeModal,
}: ITypeModal) => {
  const { loggedInUser } = useUser();
  //
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onSubmit' });

  //input
  const onValid = async ({ userId }: IForm) => {
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
  const [isDel, setIsDel] = useState(false);
  const clickClose = () => {
    closeModal();
    setIsDel(false);
  };
  //
  return (
    <Container
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={modalVar}
      className={'edit-board-modal'}
    >
      <Svg type="close" size="2rem" theme={theme} onClick={clickClose} />
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
          variants={opacityVar}
          className="delete-board-form"
          onSubmit={handleSubmit(onValid)}
        >
          <h2>
            <span>보드를 삭제하려면 아이디를 입력하세요.</span>
            <span className="eng">Type your ID to delete this board.</span>
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
    </Container>
  );
};

const Container = styled(Modal)`
  width: 35vw;
  height: 50vh;
  min-height: 300px;
  justify-content: space-around;
  h1 {
    color: ${(p) => p.theme.color.logo};
    font-size: 2.5rem;
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
            margin-bottom: 5px;
            font-size: 1.4rem;
          }
          :nth-of-type(2) {
            opacity: 0.9;
            font-size: 1.5rem;
            color: ${(p) => p.theme.color.logo};
          }
          display: block;
        }
      }
    }
  }
  .delete-board-form {
    //border: 2px solid yellow;
  }
`;
const Form = styled(motion.form)`
  padding: 0 50px;
  gap: 20px;
  display: flex;
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
