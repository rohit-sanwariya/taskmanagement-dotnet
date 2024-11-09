

using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using taskmanagement.Core.Models;

namespace taskmanagement.Services.Contracts;

public interface IBlobService
{
    Task<List<BlobItem>> GetAllBlobs(string containerName);
    
    Task<FileUploadResponse> CreateBlob( IFormFile file,string containerName);
    Task DeleteBlob(string blobname);
 

}
