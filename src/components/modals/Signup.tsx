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
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../../atom/atom";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import z from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid Email"),
  name: z.string().min(3, "Name Atleast Contain 3 letters"),
  password: z.string().min(8, "Password Atleast Contain 3 letters"),
  validatepassword: z.string().min(8, "Password Atleast Contain 3 letters"),
  username: z.string({ message: "UserName Required" }),
  profilePicture: z.string({ message: "Profile Picture Link Is Required" }),
  accept: z.boolean({ coerce: true, message: "Privacy Policy Should Checked" }),
});

export default function Signup() {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [password, setPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    validatepassword: "",
    username: "",
    profilePicture: "",
    accept: false,
  });

  const signup = async () => {
    const data = signupSchema.safeParse(formData);
    if (!data.success) {
      return toast(data.error.errors[0].message);
    }
    if (formData.password != formData.validatepassword) {
      return toast("Validate Password Not Match");
    }
    if (!formData.accept) {
      return toast("Privacy Policy Should Checked");
    }
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/signup",
      formData,
      { withCredentials: true }
    );
    if (res.data.success) {
      setUser(res.data.data);
      setAuth(true);
      return onClose();
    }
    redirect("/");
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Let's Scroll Together !
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter Your Email"
                  required
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
                  placeholder="Enter your password"
                  type={password ? "text" : "password"}
                  className="border-white/20"
                  onChange={(e) => onchange("password", e.target.value)}
                  value={formData.password}
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
                  errorMessage={
                    formData.password != formData.validatepassword ? (
                      <span className="text-red-400">
                        Password Doesn't Match
                      </span>
                    ) : (
                      ""
                    )
                  }
                  placeholder="Re Enter Your Password"
                  type={password ? "text" : "password"}
                  className="border-white/20"
                  onChange={(e) => onchange("validatepassword", e.target.value)}
                  value={formData.validatepassword}
                />
                <Input
                  required
                  placeholder="Your User Name"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.username}
                  onChange={(e) => onchange("username", e.target.value)}
                />
                <Input
                  required
                  placeholder="Your Name"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.name}
                  onChange={(e) => onchange("name", e.target.value)}
                />
                <Input
                  required
                  placeholder="Your Profile Image"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.profilePicture}
                  onChange={(e) => onchange("profilePicture", e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between text-white">
                  <Checkbox
                    checked={formData.accept}
                    onChange={(e) => {
                      onchange("accept", e);
                    }}
                    required
                    classNames={{
                      label: "text-xs text-white",
                    }}
                  >
                    Accept Privacy Policy
                  </Checkbox>
                  <Link color="primary" href="#" size="sm" className="text-xs">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={signup}>
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
