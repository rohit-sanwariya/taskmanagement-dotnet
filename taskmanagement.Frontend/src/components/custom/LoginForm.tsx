import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  TLoginPayload,
  TUserRegistrationRespnse,
} from "@/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TLoginPayload>({    password: "",

    userName: "",
  });

  const {  isPending, isSuccess, isError, mutate } = useMutation<
    TUserRegistrationRespnse,
    Error,
    TLoginPayload
  >({ mutationFn: loginUser, onSuccess: (data) => {
    localStorage.setItem("authLogin", JSON.stringify(data));
    navigate("/app");
  },});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };
 
  return (
    <Card>
      <CardTitle>Enter User Login</CardTitle>
      <CardDescription>
        <form onSubmit={handleSubmit}>
          <Input
            className="my-4"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <Input
            className="my-4"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Logging in..."}
            </Button>
            {isError && <p>Error creating user</p>}
            {isSuccess && <p>User created successfully!</p>}
          </div>
        </form>
      </CardDescription>
    </Card>
  );
};

export default LoginForm;