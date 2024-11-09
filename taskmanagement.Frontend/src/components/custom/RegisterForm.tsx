import { ChangeEvent, createRef, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  TUserPayload,
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
import { AxiosError } from "axios";
import { uploadFile } from "@/services/fileService";
 

const RegisterForm = () => {
  const [formData, setFormData] = useState<TUserPayload>({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
    profileImage: "",
    userName: "",
  });
  const [uploading, setUploading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const fileRef = createRef<HTMLInputElement>();
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, mutate } = useMutation<
    TUserRegistrationRespnse,
    Error,
    TUserPayload
  >({
    mutationFn: createUser,
    onSuccess: (data) => {
      localStorage.setItem("authLogin", JSON.stringify(data));
      navigate("/app");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || uploading) return;

    setUploading(true);



    try {
      const response = await uploadFile(event.target.files[0],'profilepicture');

      setFormData(data=>({...data,profileImage:response.data.uri}))
      setUploading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setUploading(false);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-3/5">
        <Card className="w-4/5"  >
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
          </CardHeader>

          <CardContent>
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
        
            <Input type="file" ref={fileRef} onChange={handleUpload}  />
            {error && <span>re upload your profile picture</span>}
            <Input
              className="my-4"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Ener Phone Number"
            />
            <div className="flex">
              <span>Already a user ? </span><Link to="/login">Signin</Link>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create User"}
            </Button>
            {isError && <p className="text-red-500">Error creating user</p>}
            {isSuccess && (
              <p className="text-green-500">User created successfully!</p>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;


