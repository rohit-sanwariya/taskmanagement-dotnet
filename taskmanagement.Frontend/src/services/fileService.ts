import apiClient from "@/lib/apiclient";
import { AxiosResponse } from "axios";
interface FileUploadResponse {
uri: string;
  fileName?: string; // Optional property
}
export async function uploadFile(file:File,containerName:string) {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('ContainerName', containerName);
    return await apiClient.post<FileUploadResponse, AxiosResponse<FileUploadResponse>, FormData>
    ('/FileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }