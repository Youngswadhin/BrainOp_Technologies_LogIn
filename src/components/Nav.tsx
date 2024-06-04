/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import Signin from "./modals/Signin";
import Signup from "./modals/Signup";
import { authAtom, userAtom } from "../atom/atom";
import Signout from "./modals/Signout";
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const Nav = () => {
  const [auth, _] = useRecoilState(authAtom);
  const [user, __] = useRecoilState(userAtom);

  return (
    <nav className="w-full sticky top-0 py-5 flex items-center justify-center text-white z-[1000]">
      <div className="wrap w-[100%] md:w-[80vw] flex items-center justify-between rounded-2xl bg-black/10 backdrop-blur-md py-3.5 px-4">
        <div className="logo font-thin text-xl md:text-3xl tracking-wider">
          MelodyVerse
        </div>
        <div className="menu flex gap-4 text-white/50 items-center">
          {!auth ? (
            <>
              <Signup />
              <Signin />
            </>
          ) : (
            <>
              <Signout />
              <Popover placement="bottom" showArrow>
                <PopoverTrigger>
                  <Avatar
                    isBordered
                    isFocusable
                    src={user.profilePicture}
                    name={user.name}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col py-2 px-2">
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
