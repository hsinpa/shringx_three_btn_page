precision mediump float;
  
uniform sampler2D webcamTex;
uniform sampler2D videoTex;
uniform float video_aspect_ratio;
uniform float webcam_aspect_ratio;

varying vec2 v_uv;

bool isGreen(vec4 color){
    return (color.b < 0.8 * color.g) && ( color.r < 0.8 * color.g );
}

void main () {
    vec2 uv = v_uv;
    float remaining = (video_aspect_ratio - 1.0) * 0.5;

    float webcam_asp = 1.0 - (webcam_aspect_ratio - 1.0);

    float webcam_asp_x = (webcam_aspect_ratio >= 1.0) ? 1.0 : webcam_aspect_ratio;
    float webcam_asp_y = (webcam_aspect_ratio >= 1.0) ? (1.0 - (webcam_aspect_ratio - 1.0)) : 1.0;

    vec4 webcam_color = texture2D(webcamTex, vec2(uv.x * webcam_asp_x, 1.0 - uv.y * webcam_asp_y ));

    vec2 video_uv = vec2( (uv.x * video_aspect_ratio) - remaining , (1.0 - uv.y));
    float revert_scale = 1.25;
    float offset = (revert_scale - 1.0) * 0.5;

    video_uv *= revert_scale;
    video_uv -= vec2(offset,offset);
    vec4 video_color = texture2D(videoTex, video_uv);

    //vec4 mixColor = mix(finalColor, noiseColor, alpha);
    
    if (video_color.g >= 0.5) {

        if (isGreen(video_color)) {
            video_color = webcam_color;
        }
    }

    gl_FragColor = video_color;
}