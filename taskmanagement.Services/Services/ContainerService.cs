

using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using taskmanagement.Services.Contracts;

namespace taskmanagement.Services.Services;

public class ContainerService : IContainerService
{
    private readonly BlobServiceClient _blobService;

    public ContainerService(BlobServiceClient blobService)
    {
        _blobService = blobService;
      
    }


    public async Task CreateContainer(string containername)
    {
        BlobContainerClient client = _blobService.GetBlobContainerClient(containername);
        await client.CreateAsync(PublicAccessType.BlobContainer);
    }

    public async Task DeleteContainer(string containername)
    {
        BlobContainerClient client = _blobService.GetBlobContainerClient(containername);
        await client.DeleteAsync();
    }

    public async Task<List<string>> GetAllContainerAndBlobs()
    {
        List<string> containers = new();

        await foreach(var item in _blobService.GetBlobContainersAsync())
        {
            containers.Add(item.Name);
        }

        return containers;
 
    }

    public Task<List<string>> GetAllContainers()
    {
        throw new NotImplementedException();
    }
}
