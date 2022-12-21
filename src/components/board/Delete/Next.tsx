import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IForm } from '../../../types/global';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction } from 'react';
import { Form } from '../../../../styles/global';
import { IBoardType } from '../../../types/board';
import { useUser } from '../../../libs/client/useUser';
import { opacityVar } from '../../../../styles/variants';

interface IDeleteBoardNext {
  _data: {
    isDel: boolean;
    theme: boolean;
    loading: boolean;
    POST: ({}) => void;
    board: IBoardType;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const Next = ({ _data }: IDeleteBoardNext) => {
  const { user_id } = useUser();
  const { theme, isDel: open, POST, loading, setLoading, board } = _data;
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onSubmit' });
  const onValid = async ({ userId }: IForm) => {
    const isMatch = Boolean(board.host.userId === userId);
    if (!isMatch) return setError('userId', { message: 'invalid_host' });
    setLoading(true);
    if (loading) return;
    return POST({ userId, user_id });
  };
  return (
    <>
      {open && (
        <Cont
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
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  width: fit-content;
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
