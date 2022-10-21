import styled from '@emotion/styled';
import { OpenSelectBoard } from './open_select_board';
import { InputWrap } from '../../../Tools/Input';
import { FlexCol } from '../../../../styles/global';
import { IPostForm, IPostFormErr } from '../../../types/post';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { BlockComment } from './contents_block_cmt';
import { DangerZone } from './contents_delete_post';
import { color } from '../../../../styles/variants';

interface IMainInputsWrap {
  theme: boolean;
  isShrink: boolean;
  selectQuck: boolean;
  openBoardList: () => void;
  clickDelete: () => void;
  id: {
    host_id: number;
    board_id: number;
    chosen_board_id: number;
  };
  useform: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
  };
}
export const PostInputsWrap = ({
  id,
  theme,
  useform,
  isShrink,
  selectQuck,
  clickDelete,
  openBoardList,
}: IMainInputsWrap) => {
  const watch = useform?.watch!;
  const errors = useform?.errors!;
  const register = useform?.register!;
  const main_cnts_vars = {
    animate: ({ theme, isShrink }: any) => ({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
      y: isShrink ? '18rem' : '0rem',
      backgroundColor: color(!theme),
    }),
  };
  return (
    <Cont
      animate="animate"
      className="main_inputs"
      variants={main_cnts_vars}
      custom={{ theme, isShrink }}
    >
      <InputWrap
        id="title"
        type="text"
        theme={theme}
        label="Title"
        watch={watch('title')}
        error={errors.title?.message}
        register={register('title', {
          required: '제목을 입력하세요.',
        })}
      />
      <TextAreaWrap
        theme={theme}
        id="description"
        label="Description"
        data={{
          min: 100,
          max: 1000,
          text: watch('description'),
          error: errors.description?.message,
        }}
        register={register('description')}
        placeholder="이 포스트에 대한 설명을 적어주세요."
      />
      <OpenSelectBoard
        id={id}
        theme={theme}
        open={openBoardList}
        selectQuck={selectQuck}
      />
      <InputWrap
        type="text"
        id="hashtags"
        theme={theme}
        label="Movie Tags"
        watch={watch('hashtags')}
        register={register('hashtags')}
      />
      <InputWrap
        type="text"
        id="pageLink"
        label="Website"
        theme={theme}
        watch={watch('pageLink')}
        register={register('pageLink')}
      />
      <BlockComment register={register} />
      <DangerZone theme={theme} clickDelete={clickDelete} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  padding: 0 20px 20px;
  overflow-y: auto;
  align-items: center;
  .title {
    margin-bottom: 30px;
  }
  .hashtags,
  .pageLink {
    margin-bottom: 15px;
  }
  .block_cmt {
    margin-bottom: 25px;
  }
`;
