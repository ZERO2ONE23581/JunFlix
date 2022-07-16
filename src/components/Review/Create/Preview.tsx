import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';

type CreatePreviewReturn = [
  string,
  boolean,
  boolean,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<boolean>>,
  Dispatch<SetStateAction<boolean>>
];
export const CreatePreivew = (
  watch: UseFormWatch<any>,
  loading: boolean
): CreatePreviewReturn => {
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [openAvatar, setOpenAvatar] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar, watch]);
  return [
    preview,
    Loading!,
    openAvatar,
    setPreview,
    setOpenAvatar,
    setAvatarLoading,
  ];
};
