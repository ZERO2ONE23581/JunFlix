import {
  useSetPost,
  useFetchPost,
  UsePostReset,
  usePostResult,
} from '../../../libs/client/usePosts';
import { UploadModal } from './Upload/UploadModal';
import { UpdateModal } from './UpdateModal';
import { useForm } from 'react-hook-form';
import { SelectModal } from './SelectBoard/SelectModal';
import { IRes } from '../../../types/global';
import { MsgModal } from '../../../Tools/Modal/Message';
import useMutation from '../../../libs/client/useMutation';
import { IPostForm, IPostType } from '../../../types/post';
import { Dispatch, SetStateAction, useState } from 'react';
import { LoadingModal } from '../../../Tools/Modal/Loading';

interface IUpdate {
  _data: {
    modal: string;
    theme: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const UpdatePost = ({ _data }: IUpdate) => {
  const { theme, post, modal, setModal } = _data;
  const [update, { data, loading: loading_u }] = useMutation<IRes>(
    `/api/post/${post?.id}/update`
  );
  const [remove, { data: del_data, loading: loading_d }] = useMutation<IRes>(
    `/api/post/${post?.id}/delete`
  );
  const [msg, setMsg] = useState('');
  const [hide, setHide] = useState(false);
  const [preview, setPreview] = useState('');
  const [Loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [new_boardId, setNewBoardId] = useState(0);
  const [quickSave, setQuickSave] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const layoutId = post?.id! + 'update' + '';
  const isUpdate = Boolean(modal === 'update');
  const resetPreview = () => UsePostReset({ post, setPreview, reset });
  const {
    reset,
    watch,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });

  useSetPost({ post, setValue });
  const { onValid } = useFetchPost({
    POST: { update, remove },
    Loading: { loading_u, loading_d },
    _data: { hide, isDelete, new_boardId, setError, setLoading },
  });
  const __result = { setMsg, setModal, setLoading };
  usePostResult({ ...__result, type: 'updated', data });
  usePostResult({ ...__result, type: 'deleted', data: del_data });
  const _useform = { reset, watch, errors, register, setValue, clearErrors };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <UploadModal
          _useform={_useform}
          _data={{ theme, resetPreview }}
          _set={{ setModal, setPreview }}
          _string={{ modal, preview, layoutId }}
        />
        <UpdateModal
          _useform={_useform}
          resetPreview={resetPreview}
          _set={{ setModal, setNewBoardId }}
          _boolean={{ hide, theme, isUpdate, quickSave }}
          _id={{ board_id: post?.board_id!, new_boardId }}
          _string={{ layoutId, preview, original: post?.post_image! }}
          _set_B={{ setHide, setIsDelete, setQuickSave, setSelectModal }}
        />
        <SelectModal
          _data={{ host_id: post?.host_id!, layoutId }}
          _boolean={{ theme, isUpdate, selectModal }}
          _set={{ setQuickSave, setNewBoardId, setSelectModal }}
        />
      </form>
      {Loading && <LoadingModal layoutId={layoutId + 'submit'} theme={theme} />}
      <MsgModal _data={{ msg, theme, layoutId: layoutId + 'submit' }} />
    </>
  );
};
