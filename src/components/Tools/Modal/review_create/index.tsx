import { Upload } from './Upload';
import styled from '@emotion/styled';
import { ScoreModal } from './Score';
import { Recommend } from './Recommend';
import { OneLineModal } from './OneLine';
import { IUseform } from '../../../../types/global';
import { LoadingModal } from '../LoadingModal';
import { IconBtn } from '../../Button/IconBtn';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, DimBackground } from '../../../../../styles/global';

interface ISave extends IUseform {
  isEdit?: boolean;
  loading: boolean | null;
  setSave: Dispatch<SetStateAction<boolean>>;
}
export const SaveModal = ({
  isEdit,
  watch,
  setSave,
  loading,
  setError,
  register,
  setValue,
  clearErrors,
}: ISave) => {
  const [score, setScore] = useState(false);
  const [upload, setUpload] = useState(false);
  const [recommend, setRecommend] = useState(false);
  return (
    <>
      {!loading && (
        <>
          <Cont>
            <IconBtn
              size="1.8rem"
              type="button"
              svgType="close"
              onClick={() => setSave(false)}
            />
            {!score && (
              <OneLineModal
                isEdit={isEdit}
                watch={watch}
                setSave={setSave}
                setScore={setScore}
                setValue={setValue}
                register={register}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
            {score && !recommend && (
              <ScoreModal
                isEdit={isEdit}
                watch={watch}
                register={register}
                setScore={setScore}
                setRecommend={setRecommend}
              />
            )}
            {recommend && !upload && (
              <Recommend
                register={register}
                setUpload={setUpload}
                setRecommend={setRecommend}
              />
            )}
            {upload && <Upload isEdit={isEdit} setUpload={setUpload} />}
          </Cont>
          <DimBackground zIndex={1} onClick={() => setSave(false)} />
        </>
      )}

      {loading && (
        <LoadingModal
          zIndex={103}
          text={{
            kor: ` 리뷰 ${isEdit ? '업데이트' : '생성'}중...`,
            eng: ` ${isEdit ? 'Updating' : 'Creating'} Review...`,
          }}
        />
      )}
    </>
  );
};
const Cont = styled(Modal)`
  padding: 40px;
  display: block;
  border: ${(p) => p.theme.border.thick};
  font-size: 1.2rem;
  h2,
  h1 {
    display: flex;
    flex-direction: column;
    span {
      font-style: italic;
    }
  }
  h2 {
    span {
      opacity: 0.8;
      font-size: 1rem;
      .num {
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
  .close {
    top: 5px;
    right: 7px;
    position: absolute;
  }
`;
