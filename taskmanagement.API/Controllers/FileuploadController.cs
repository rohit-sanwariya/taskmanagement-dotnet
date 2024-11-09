using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using taskmanagement.Services.Contracts;
using taskmanagement.API.Models; 
using taskmanagement.Core.Models;

namespace taskmanagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileuploadController : ControllerBase
    {
        private readonly IBlobService blobService;

        public FileuploadController(IBlobService blobService)
        {
            this.blobService = blobService;
        }

        [HttpPost]
        public async Task<FileUploadResponse> UploadFileAsync([FromForm] FileUploadModel model) {
            return await blobService.CreateBlob(model.File, model.ContainerName);
        }

    }
}
