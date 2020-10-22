import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import { useHistory } from "react-router-dom";

type HeaderProps = {};

const ModalPost: React.FC<HeaderProps> = observer(() => {
  const { auth } = useMst();
  let history = useHistory();
  const logout = () => {
    auth.logout();
    history.push("/");
  };

  return <div></div>;
});

export default ModalPost;
