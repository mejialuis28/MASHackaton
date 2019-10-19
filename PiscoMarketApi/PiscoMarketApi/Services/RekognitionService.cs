using Amazon;
using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PiscoMarketApi.Models;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace PiscoMarketApi.Services
{
    public class RekognitionService : IRekognitionService
    {
        private AwsConfiguration configuration;

        public RekognitionService(IOptions<AwsConfiguration> awsOptions)
        {
            configuration = awsOptions.Value;
        }

        public async Task<string> Compare(byte[] imageBytes)
        {
            try
            {
                String collectionId = "PiscoMarketFaces";
                              
                var rekognitionClient = new AmazonRekognitionClient(configuration.awsAccessKey, configuration.awsAccessSecret, Amazon.RegionEndpoint.USEast2);

                var image = new Image()
                {
                    Bytes = new MemoryStream(imageBytes)
                };

                var searchFacesByImageRequest = new SearchFacesByImageRequest()
                {
                    CollectionId = collectionId,
                    Image = image,
                    FaceMatchThreshold = 70F,
                    MaxFaces = 1
                };
                
                SearchFacesByImageResponse searchFacesByImageResponse =
                    await rekognitionClient.SearchFacesByImageAsync(searchFacesByImageRequest);

                if (searchFacesByImageResponse.FaceMatches.Any())
                {
                    var faceMatch = searchFacesByImageResponse.FaceMatches.First();
                    return faceMatch.Face.ExternalImageId;
                }

                return null;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
    }
}
