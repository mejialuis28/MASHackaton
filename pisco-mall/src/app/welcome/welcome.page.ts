import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import * as faceapi from 'face-api.js';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
    private currentImage = '';
    private isPlatform = '';
    constructor(private camera: Camera,
                public loadingController: LoadingController,
                public platform: Platform) {
        platform.ready().then((source) => {
            console.log('platform source ' + source);
            this.isPlatform = source;
        });
    }

    ngOnInit() {
        // const video = document.getElementById('video');
        // Promise.all([
        //   faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
        //   faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
        //   faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
        //   faceapi.nets.faceExpressionNet.loadFromUri('assets/models'),
        // ]).then(() => {
        //
        //   navigator.getUserMedia({video : {}},
        //       stream => {
        //         // @ts-ignore
        //          return video.srcObject = stream;
        //       },
        //       err => console.log(err));
        //   video.addEventListener('play', () => {
        //     // @ts-ignore
        //     const canvas = faceapi.createCanvasFromMedia(video);
        //     document.body.append(canvas);
        //     // @ts-ignore
        //     const displaySize = {width: video.width, height: video.height};
        //     faceapi.matchDimensions(canvas, displaySize);
        //     setInterval(async () => {
        //       // @ts-ignore
        //       const detections =
        // await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        //       const resizedDetections = faceapi.resizeResults(detections, displaySize);
        //       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        //       faceapi.draw.drawDetections(canvas, resizedDetections);
        //       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        //       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        //     }, 100)
        //   })
        // });

    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.currentImage = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
            console.log('Camera issue:' + err);
        });
    }

    async submitPhoto() {
        const loading = await this.loadingController.create({
            message: 'Enviando Foto',
        });
        await loading.present();
    }

}
