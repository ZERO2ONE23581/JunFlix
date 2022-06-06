import { useState } from 'react';

export const ToggleBtn = ({ id, open, setOpen, saveId, setSaveId }: any) => {
  const replyClick = (id: number) => {
    setSaveId(id);
    setOpen((p: boolean) => !p);
  };
  return (
    <>
      <button
        disabled={saveId !== 0 && saveId !== id}
        onClick={() => replyClick(id)}
      >
        {open && saveId === id ? 'Back' : 'Reply'}
      </button>
    </>
  );
};
