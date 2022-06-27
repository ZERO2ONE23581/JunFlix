import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';
import { Info, Modal, ModalClose } from '../../../../../styles/global';
import { IReviewForm } from '../../../../types/review';
import { Btn } from '../../../Style/Button';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { Input } from '../../../Style/Input';
import { Svg } from '../../../Style/Svg/Svg';

interface ICreateGradeProps {
  setError: UseFormSetError<IReviewForm>;
  getValues: UseFormGetValues<IReviewForm>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  loading: boolean | null;
  error?: {
    data?: string;
    score: FieldError | undefined;
  };

  register: UseFormRegister<IReviewForm>;
}
export const SubmitReview = ({
  setSubmit,
  loading,
  error,
  register,
  setError,
  getValues,
}: ICreateGradeProps) => {
  const router = useRouter();
  const [next, setNext] = useState(false);
  const [next2, setNext2] = useState(false);
  const [final, setFinal] = useState(false);

  return (
    <>
      <Cont>
        {!next && (
          <Box className="first">
            <Oneline>
              <label htmlFor="oneline">
                이 영화에 대한 한줄평을 작성해 주세요.
              </label>
              <Input
                id="oneline"
                type="text"
                maxLength={30}
                placeholder="영화 한줄평"
                {...register('oneline')}
              />
              <span>한줄평은 30자 이내 작성할 수 있습니다.</span>
            </Oneline>
            <div className="btn-wrap">
              <Btn
                type="button"
                name="뒤로가기"
                onClick={() => setSubmit(false)}
              />
              <Btn type="button" name="다음" onClick={() => setNext(true)} />
            </div>
          </Box>
        )}

        {next && !next2 && (
          <Box className="second">
            <Score>
              <label htmlFor="score">이 영화에 대한 당신의 별점은?</label>
              <input {...register('score')} type="range" min={0} max={5} />
              <span>숫자를 입력해주세요.</span>
              <span>별점은 0부터 5까지 선택가능합니다.</span>
            </Score>
            <div className="btn-wrap">
              <Btn
                type="button"
                name="뒤로가기"
                onClick={() => setNext(false)}
              />
              <Btn type="button" name="다음" onClick={() => setNext2(true)} />
            </div>
          </Box>
        )}

        {next2 && !final && (
          <Box className="third">
            <Recommend>
              <label htmlFor="recommend">
                이 영화를 추천한다면 체크해주세요.
              </label>
              <input
                {...register('recommend')}
                type="checkbox"
                id="recommend"
                name="recommend"
              />
            </Recommend>
            <div className="btn-wrap">
              <Btn
                type="button"
                name="뒤로가기"
                onClick={() => setNext2(false)}
              />
              <Btn type="button" name="다음" onClick={() => setFinal(true)} />
            </div>
          </Box>
        )}

        {final && (
          <Box className="fourth">
            {!loading ? (
              <>
                <h1>리뷰를 업로드 하겠습니까?</h1>
                <h2>리뷰는 업로드 후 수정이 가능합니다.</h2>
                <Info>
                  <span>Do you wnat to upload your review?</span>
                  <span>You can edit review after submit.</span>
                </Info>
                <div className="btn-wrap">
                  <Btn
                    type="button"
                    name="뒤로가기"
                    onClick={() => setFinal(false)}
                  />
                  <Btn type="submit" name="업로드" />
                </div>
              </>
            ) : (
              <>
                <h1>리뷰 업로드중...</h1>
                <h2>Uploading review...</h2>
                <Svg type="loading" />
              </>
            )}
          </Box>
        )}
        {error?.data && (
          <Box>
            <ErrorMsg error={error.data} />
            <Btn type="button" name="확인" onClick={() => router.reload()} />
          </Box>
        )}
      </Cont>
      <ModalClose />
    </>
  );
};

const Cont = styled.article``;
const Box = styled(Modal)`
  span {
    opacity: 0.8;
    font-size: 1rem;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
  }
`;
const FlexColumn = styled.div`
  padding: 20px;
  min-width: 330px;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    font-size: 1.1rem;
  }
  input {
    border: ${(p) => p.theme.border.bold};
  }
`;
const Oneline = styled(FlexColumn)``;
const Score = styled(FlexColumn)`
  input {
    padding: 10px;
    width: 60px;
    margin: 10px auto;
    text-align: center;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
`;
const Recommend = styled(FlexColumn)`
  flex-direction: row;
  align-items: center;
  input {
    border-radius: 10%;
    width: 30px;
    height: 30px;
    &:checked {
      color: red;
      background-color: red;
    }
  }
`;
