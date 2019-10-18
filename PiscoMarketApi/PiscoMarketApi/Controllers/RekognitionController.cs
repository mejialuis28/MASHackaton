using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PiscoMarketApi.Controllers
{
    [Route("api/[controller]")]
    public class RekognitionController : Controller
    {
        // POST api/<controller>
        // Validate New FAce
        [HttpPost]
        public string Post([FromBody]dynamic imagesArray)
        {
            //Get first image string.
            if(imagesArray!=null)
            {
                string base64String = imagesArray[0];
                //Return ID
                return "1";
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
