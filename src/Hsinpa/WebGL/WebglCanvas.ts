
import REGL, {Regl} from 'regl';
import { Clamp } from '../UtilityMethod';
const reglPromise = import('regl');

abstract class WebglCanvas {
    protected _canvasDom : HTMLCanvasElement;
    protected _context : CanvasRenderingContext2D;
    protected _webglDom : HTMLCanvasElement;
    protected _reglContext : Regl;

    protected screenHeight : number;
    protected screenWidth : number;

    public IsProgramValid : boolean = false;

    public get aspect_ratio() : number {
        return window.innerHeight / window.innerWidth;
    }

    constructor( webglQuery : string) {
        this._webglDom = document.querySelector(webglQuery);

        this.RegisterDomEvent();    
        this.SetCanvasSize();
    }

    protected RegisterDomEvent() {
        window.addEventListener('resize', () => {
            this.SetCanvasSize();
        });
    }

    protected async CreatREGLCanvas(webglDom : HTMLCanvasElement) {
        let regl = await reglPromise;

        return regl.default(webglDom);
    }

    protected SetCanvasSize() {
        this.SetCanvasToSceenSize(this._webglDom);

        this.screenHeight = window.innerHeight - 4;
        this.screenWidth = window.innerWidth ;

        console.log("Browser Aspect ratio " + (window.innerHeight / window.innerWidth));
    }

    public SetCanvasToSceenSize(canvas : HTMLCanvasElement) {
        let canvas_height = Clamp( (window.innerHeight -4) * 1.5, window.innerHeight, 2048);
        let canvas_width = Clamp( (window.innerWidth * 1.5), window.innerWidth, 2048);
        console.log(`canvas_height ${canvas_height}, canvas_width ${canvas_width}`);
        canvas.width = canvas_width;
        canvas.height = canvas_height;
    }
}

export default WebglCanvas;