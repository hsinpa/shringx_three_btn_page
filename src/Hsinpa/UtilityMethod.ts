import {IntVector2} from './UniversalType';

export function Lerp(x : number, y : number, t : number) {
    return x + (t * (y - x));
}

export function RandomRange(min : number, max : number) {
    return ~~(Math.random() * (max - min + 1)) + min
};

export function Normalize2D(vector : IntVector2) : IntVector2 {
    let vi = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    let normalized : IntVector2 ={
        x : vector.x / vi,
        y : vector.y / vi
    }

    return normalized;
}

export function VectorNumAdd(vector : IntVector2, scale : number) {
    return {
        x : vector.x + scale,
        y : vector.y + scale
    };
}

export function VectorNumScale(vector : IntVector2, scale : number) {
    return {
        x :vector.x * scale,
        y : vector.y * scale
    };
}

export function VectorDistance(a : IntVector2, b : IntVector2) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

export function VectorAdd(a : IntVector2, b : IntVector2) {
    return {
        x : a.x + b.x,
        y : a.y + b.y
    }
}

export function Clamp(value : number, min : number, max : number) {
    return Math.min(Math.max(value, min), max);
  };
  

export function GetImagePromise(imagePath : string) {
    return new Promise<HTMLImageElement>( resolve => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.src = imagePath;
        im.onload = () => resolve(Object.assign(im));

        return im;
    });
}

export function GetRelativeURL(url : string) {
    return (url.replace(/^(?:\/\/|[^/]+)*\//, ''));
}