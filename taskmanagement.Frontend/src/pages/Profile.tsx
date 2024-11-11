import FileUpload from "@/components/custom/FileUpload";
import { getLoggedInUserDetail } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { data } = useQuery({
    queryKey: ["userDetail"],
    queryFn: getLoggedInUserDetail,
  });
  return (
    <div>
      {data?.email}
      <img src={data?.profileImage} />
      <FileUpload
        containerName="profilepicture"
        onUploadComplete={(uri) => {}}
      />
    </div>
  );
};

export default Profile;
