using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System;
using taskmanagement.Core.Models;
using taskmanagement.Services.Contracts;

namespace taskmanagement.Services.Services;

public class BlobService : IBlobService
{
    private readonly BlobServiceClient _blobService;

    public BlobService(BlobServiceClient blobService)
    {
        _blobService = blobService;

    }
    public async Task<FileUploadResponse> CreateBlob(  IFormFile file, string containerName)
    {
        string fileName = Path.GetFileNameWithoutExtension(file.FileName) + "_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
        BlobContainerClient blobContainerClient = _blobService.GetBlobContainerClient(containerName);
        BlobClient client = blobContainerClient.GetBlobClient(fileName);
        FileUploadResponse response = new() { FileName = fileName,Uri = null};
        var httpHeaders = new BlobHttpHeaders()
        {
            ContentType = file.ContentType,
        };
        try
        {
            var result = await client.UploadAsync(file.OpenReadStream(), httpHeaders);
            response.Uri = client.Uri.ToString();
            return response;
        }
        catch(Exception ex)  
        {
            Console.WriteLine(ex.Message);
            return response;
        }
       
    }

    public Task DeleteBlob(string blobname)
    {
        throw new NotImplementedException();
    }

    public  async Task<List<BlobItem>> GetAllBlobs(string containerName)
    {
        var client = _blobService.GetBlobContainerClient(containerName);
        var blobList = new List<BlobItem>();
         await foreach(var item in client.GetBlobsAsync())
        {
            blobList.Add(item);
        }
        return blobList;
    }
}
