import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  TUserPayload,
  TUserRegistrationRespnse,
} from "@/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState<TUserPayload>({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });
  const navigate = useNavigate();
  const {   isPending, isSuccess, isError, mutate } = useMutation<
    TUserRegistrationRespnse,
    Error,
    TUserPayload
  >({ mutationFn: createUser, onSuccess: (data) => {
    localStorage.setItem("authLogin", JSON.stringify(data));
    navigate("/app");
  }, });

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
      <CardTitle>Register Account</CardTitle>
      <CardDescription>
        <form onSubmit={handleSubmit}>
          <Input
          className="my-4"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="User Name"
          />
          <Input
          className="my-4"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
          className="my-4"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
          <Input
          className="my-4"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <Input
          className="my-4"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="Profile Image URL"
          />
          <Input
          className="my-4"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Ener Phone Number"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create User"}
            </Button>
            {isError && <p>Error creating user</p>}
            {isSuccess && <p>User created successfully!</p>}
          </div>
        </form>
      </CardDescription>
    </Card>
  );
};

export default RegisterForm;
