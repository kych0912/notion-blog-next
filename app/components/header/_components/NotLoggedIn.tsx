import React from 'react';

import LoginModal from '../../LoginModal';
import { HoverButton } from '../../Button/button.styles';
import { Dialog, DialogTrigger } from '../../shared/dialog';

export default function NotLoggedIn() {
  const [open, setOpen] = React.useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HoverButton onClick={handleMenu} className="header-login">
          로그인
        </HoverButton>
      </DialogTrigger>
      <LoginModal open={open} setOpen={setOpen} />
    </Dialog>
  );
}
