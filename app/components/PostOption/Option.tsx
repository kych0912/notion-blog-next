'use client';
import React from 'react';

import DeleteModal from '../Modal/Modal';

export default function Option({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleMenu}
        className="rounded-sm p-0 text-sm font-semibold text-destructive hover:bg-destructive/10"
      >
        삭제
      </button>
      {open && <DeleteModal id={id} open={open} handleOpen={() => handleMenu()} />}
    </>
  );
}
