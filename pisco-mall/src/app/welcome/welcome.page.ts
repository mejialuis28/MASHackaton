import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as faceapi from 'face-api.js';
import { Platform, LoadingController } from '@ionic/angular';
import { WelcomeService} from './welcome.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
    providers : [WelcomeService]
})
export class WelcomePage implements OnInit {
    private currentImage = '';
    private isPlatform = '';
    private photo = '';
    private video: any;
    constructor(private camera: Camera,
                public loadingController: LoadingController,
                public welcomeService: WelcomeService,
                private router: Router,
                public appService: AppService,
                public platform: Platform) {
        platform.ready().then((source) => {
            console.log('platform source ' + source);
            this.isPlatform = source;
        });
    }

    ngOnInit() {
        this.video = document.getElementById('video');
        const videoContainer = document.getElementById('video-container');
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('assets/models'),
        ]).then(() => {
            navigator.getUserMedia({video : {}},
                stream => {
                    // @ts-ignore
                    return video.srcObject = stream;
                },
                err => console.log(err));
            this.video.addEventListener('play', () => {
                // @ts-ignore
                const canvas = faceapi.createCanvasFromMedia(video);
                videoContainer.append(canvas);
                // @ts-ignore
                const displaySize = {width: video.width, height: video.height};
                faceapi.matchDimensions(canvas, displaySize);
                let control = false;
                const interval = setInterval(async () => {
                    // @ts-ignore
                    const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    console.log(detections);
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                    if (detections.some(val => val.expressions.happy && val.expressions.happy >= 0.5)) {
                        if (control) { return; }
                        control = true;
                        clearInterval(interval);
                        this.captureImage();
                    }
                }, 100);
            });
        });


    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.currentImage = imageData;
            this.submitPhoto();
        }, (err) => {
            // Handle error
            console.log('Camera issue:' + err);
        });
    }

    captureImage() {
        // debugger;
        const scale = 0.25;
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth * scale;
        canvas.height = this.video.videoHeight * scale;
        canvas.getContext('2d')
            .drawImage(this.video, 0, 0, canvas.width, canvas.height);

        const img = document.createElement('img');
        img.src = canvas.toDataURL();

        // Get the information from the API

        this.welcomeService.recognizeFace(canvas.toDataURL()).subscribe(result => {
            // this.userId = result.toString();
            this.appService.setUser(result.toString());
            this.router.navigate(['/home']);
            // debugger;
        });

        // const outputdiv = document.getElementById('output');
        // outputdiv.prepend(img);
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    async captureImageFromPc(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const image = await this.toBase64(fileInput.target.files[0]);
            console.log(image);
            this.photo = image.split('data:image/jpeg;base64,')[1];
            this.submitPhoto();
        }
    }


    async submitPhoto() {
        const loading = await this.loadingController.create({
            message: 'Enviando Foto',
        });
        await loading.present();
        this.welcomeService.recognizeFace(this.photo).subscribe(async (val: string) => {
            if (!val) { return; }
            this.appService.setUser(val);
            this.router.navigate(['/home']);
            await loading.dismiss();
        }, err => {});
    }

}
