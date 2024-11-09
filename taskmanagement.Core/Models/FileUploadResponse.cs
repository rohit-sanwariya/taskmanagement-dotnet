using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace taskmanagement.Core.Models;

public class FileUploadResponse
{
    public required string  Uri { get; set; }

    public required string  FileName { get; set; }
}
