using Microsoft.AspNetCore;
using Microsoft.Extensions.Configuration;
using PiscoMarketApi.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Moq;
using Microsoft.Extensions.Options;
using PiscoMarketApi.Models;

namespace PiscoMarketApiTests
{
    public class RekognitionTests
    {        
        [Fact]
        public void CompareShouldReturnExternalImageId()
        {
            var configuration = new Mock<IConfiguration>();

            var configurationSection = new Mock<IConfigurationSection>();
           
            var mockAwsConfiguration = new Mock<IOptions<AwsConfiguration>>();
            mockAwsConfiguration.Setup(a => a.Value).Returns(new AwsConfiguration() { awsAccessKey = "VoVypAUN/NsenNmO6PLy73S9uyJ0BRU4R/1DdkNP8cWGNAQMaKVINuF6BqF6qhXx", awsAccessSecret = "1mMfRRkNOBBYMFw1jtcq05o2/p97KIVgUfDJ4m/jvkuEs5WJC8XL2G1J6PiSyFHZ6g+xicmAxTLA3AmCL2NoPg==" });

            RekognitionService service = new RekognitionService(mockAwsConfiguration.Object);
            
            string path = @"TestImage/karla.jpg";
            byte[] bytes = System.IO.File.ReadAllBytes(path);

            string id = service.Compare(bytes).Result;
            Assert.Equal("1", id);
        }
    }
}
