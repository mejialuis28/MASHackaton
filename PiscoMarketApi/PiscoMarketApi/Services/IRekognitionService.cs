using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiscoMarketApi.Services
{
    public interface IRekognitionService
    {

        Task<string> Compare(byte[] imageBytes);

    }
}
