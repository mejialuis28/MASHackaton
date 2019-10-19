using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PiscoMarketApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PiscoMarketApi.Controllers
{
    [Route("api/[controller]")]
    public class RekognitionController : Controller
    {
        private readonly IRekognitionService _rekognitionService;
        public RekognitionController(IRekognitionService rekognition)
        {
            _rekognitionService = rekognition;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            //Get first image string.
            
            return "not recognized";
        }

        // POST api/<controller>
        // Validate New FAce
        [HttpPost]
        public async Task<string> Post([FromBody]dynamic imagesArray)
        {
            //Get first image string.
            if(imagesArray!=null)
            {
                string base64String = imagesArray[0];
                byte[] bytes = Convert.FromBase64String(base64String.Replace("data:image/png;base64,", ""));
                return await _rekognitionService.Compare(bytes);
            }
            return "not recognized";
        }

        // PUT api/<controller>
        // Register New Face
        [HttpPut()]
        public void Put([FromBody]dynamic imagesArray)
        {
            //Get first image string.
            if (imagesArray != null)
            {
                string base64String = imagesArray[0];
            }
        }
    }
}
