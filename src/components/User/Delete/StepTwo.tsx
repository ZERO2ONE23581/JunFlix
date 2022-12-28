import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../Tools/Button';
import { ErrTxt } from '../../../Tools/ErrTxt';
import { Dispatch, SetStateAction } from 'react';
import { InputWrap } from '../../../Tools/Input';
import { BtnWrap } from '../../../../styles/global';
import { opacityVar } from '../../../../styles/variants';
import { IUserForm, IUserType } from '../../../types/user';

interface IStepTwo {
  _data: {
    theme: boolean;
    User: IUserType;
    delAcct: boolean;
    setDelAcct: Dispatch<SetStateAction<boolean>>;
  };
  _useform: {
    error: string;
    watch: UseFormWatch<IUserForm>;
    register: UseFormRegister<IUserForm>;
    clearErrors: UseFormClearErrors<IUserForm>;
  };
}
export const StepTwo = ({ _data, _useform }: IStepTwo) => {
  const { theme, delAcct, setDelAcct } = _data;
  const { error, watch, register, clearErrors } = _useform;
  return (
    <>
      {delAcct && (
        <IsConfirm
          exit="exit"
          animate="animate"
          initial="initial"
          variants={opacityVar}
        >
          <InputWrap
            _data={{
              theme,
              clearErrors,
              id: 'password',
              type: 'password',
              label: 'Password',
              text: watch('password')!,
              register: register!('password', { required: 'need_password' }),
            }}
          />
          <ErrTxt error={error} theme={theme} />
          <BtnWrap className="btn_wrap">
            <Btn
              type="button"
              onClick={() => setDelAcct(false)}
              item={{ theme, name: 'Cancel' }}
            />
            <Btn type="submit" item={{ theme, name: 'Delete' }} />
          </BtnWrap>
        </IsConfirm>
      )}
    </>
  );
};
const IsConfirm = styled(motion.article)`
  .btn_wrap {
    gap: 1.2rem;
    margin-top: 1rem;
    button {
      margin: 0;
      padding: 1rem 2rem;
      width: fit-content;
      //border-radius: 40px;
    }
  }
  .err_msg {
    //gap: 1rem;
    //margin-top: 1rem;
  }
`;
