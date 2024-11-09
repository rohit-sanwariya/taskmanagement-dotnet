import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  TLoginPayload,
  TUserRegistrationRespnse,
} from "@/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TLoginPayload>({
    password: "",

    userName: "",
  });

  const { isPending, isSuccess, isError, mutate } = useMutation<
    TUserRegistrationRespnse,
    Error,
    TLoginPayload
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("authLogin", JSON.stringify(data));
      navigate("/app");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Enter User Login</CardTitle>
          </CardHeader>
          <CardContent>
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
            <span>
              <span className="mr-2">New user</span>{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </span>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
            {isError && <p className="text-red-500">Error creating user</p>}
            {isSuccess && <p>User created successfully!</p>}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
