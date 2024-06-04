import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../../atom/atom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import z from "zod";

const signinSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password Atleast Contain 3 letters"),
});

export default function Signin() {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [password, setPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const data = signinSchema.safeParse(formData);
    if (!data.success) {
      return toast(data.error.errors[0].message);
    }
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/login",
      formData,
      { withCredentials: true }
    );
    if (res.data.success) {
      console.log(res.data);
      setUser(res.data.data);
      onClose();
      setFormData({
        email: "",
        password: "",
      });
    }
    setAuth(res.data.success);
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Log In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Lets Scroll !
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <IoMail className="text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  // label="Email"
                  placeholder="Enter your email"
                  // variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  onChange={(e) => onchange("email", e.target.value)}
                  value={formData.email}
                />
                <Input
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setPassword(!password)}
                    >
                      {password ? (
                        <FaLockOpen className="text-default-400 pointer-events-none flex-shrink-0 cursor-pointer" />
                      ) : (
                        <FaLock className="text-default-400 pointer-events-none flex-shrink-0 cursor-pointer" />
                      )}
                    </button>
                  }
                  // label="Password"
                  placeholder="Enter your password"
                  type={password ? "text" : "password"}
                  // variant="bordered"
                  className="border-white/20"
                  onChange={(e) => onchange("password", e.target.value)}
                  value={formData.password}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={login}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
