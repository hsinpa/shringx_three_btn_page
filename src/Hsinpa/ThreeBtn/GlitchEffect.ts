import WebGLCanvas from '../WebGL/WebglCanvas'
import REGL, {Regl} from 'regl';
import WebglUtility, {GetVideoTex, GetWebcamTex} from '../WebGL/WebglUtility';
import {CreateREGLCommandObj } from './GlitchREGL';
import {GetImagePromise} from '../UtilityMethod';
import { Files } from './ThreeBtnStatic';

class GlitchEffect extends WebGLCanvas {
    //#region Parameters
    reglCanvas : Regl;

    webglUtility : WebglUtility;
    reglDrawCommand : REGL.DrawCommand;
    reglFrame : REGL.Cancellable;

    width = 1024;
    height = 750;

    imagePosX = 0.5;
    imagePosY = 0.5;

    _audioDom: HTMLAudioElement;

    _videoDom: HTMLVideoElement;
    _webcamDom: HTMLVideoElement;
    _videoTexture: REGL.Texture2D;
    _webcamTexture: REGL.Texture2D;

    _videoRestartFlag: boolean;


    constructor(webgl_dom: string, vertexFilePath : string, fragmentFilePath : string) {
        super(webgl_dom);
        this.webglUtility = new WebglUtility();

        this.InitProcess(vertexFilePath, fragmentFilePath);
    }

    async InitProcess(vertexFilePath : string, fragmentFilePath : string) {
        await this.SetupWebglPipeline(vertexFilePath, fragmentFilePath);

        this.DrawREGLCavnas(this.reglCanvas, this.reglDrawCommand);
    }

    async SetupWebglPipeline(vertexFilePath : string, fragmentFilePath : string) {
        this.reglCanvas  = await this.CreatREGLCanvas (this._webglDom);
        
        let glslSetting = await this.webglUtility.PrepareREGLShader(vertexFilePath, fragmentFilePath);

        //Audio
        this._audioDom = new Audio(Files.Audio);
        this._audioDom.loop = true;

        //Texture
        this._webcamDom = await GetWebcamTex(this.screenWidth, this.screenHeight);

        this._videoDom = await GetVideoTex(Files.Video);
        this._audioDom.play();
        this._videoRestartFlag = false;

        this._videoDom.addEventListener("ended", (event) => {
            console.log(event);

            this._videoDom.currentTime = 0;
            this._videoDom.play();
            this._videoRestartFlag = true;
          });

        this._videoDom.addEventListener("play", (event) => {
            console.log("play");

            if (this._videoRestartFlag) {
                this._audioDom.currentTime = 0;
                this._videoRestartFlag = false;
            } else {
                this._audioDom.currentTime = this._videoDom.currentTime;
            }

            this._audioDom.play();
        });

        this._videoDom.addEventListener("pause", (event) => {
            console.log("pause");
            this._audioDom.pause();
        });

        this._videoTexture = this.reglCanvas.texture(this._videoDom);
        
        this._webcamTexture = this.reglCanvas.texture(this._webcamDom);

        this.reglDrawCommand  = await CreateREGLCommandObj(this.reglCanvas, glslSetting.vertex_shader, glslSetting.fragment_shader,
                                                        this.aspect_ratio, this._webcamTexture, this._videoTexture);
    }

    DrawREGLCavnas(regl : Regl, drawCommand : REGL.DrawCommand) {
        let self = this;

        this.reglFrame = regl.frame(function (context) {  
            //Frame Loop
            regl.clear({
                color: [0, 0, 0, 1],
                depth: 1
            });

            self._videoTexture.subimage(self._videoDom);
            self._webcamTexture.subimage(self._webcamDom);

            drawCommand({});
        });
    }

    SetCanvasSize() {
        super.SetCanvasSize();
    }
}

export default GlitchEffect;