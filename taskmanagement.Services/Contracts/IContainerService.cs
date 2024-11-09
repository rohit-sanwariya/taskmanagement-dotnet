 

namespace taskmanagement.Services.Contracts;

public interface IContainerService
{
    Task<List<string>> GetAllContainerAndBlobs();
    Task<List<string>> GetAllContainers();
    Task CreateContainer(string containername);
    Task DeleteContainer(string containername);
 

}
