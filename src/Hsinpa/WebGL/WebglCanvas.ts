
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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight -4;
    }
}

export default WebglCanvas;