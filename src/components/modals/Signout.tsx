/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { authAtom } from "../../atom/atom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Signout() {
  const [auth, setAuth] = useRecoilState(authAtom);
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const signout = async () => {
    // removeCookie("token");
    cookies.remove("token", { path: "/" });
    setAuth(false);
    toast("Sign Out Successfully");
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Sign Out
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Signout</ModalHeader>
              <ModalBody>Signout Succesfully</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={signout}>
                  Sign out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
