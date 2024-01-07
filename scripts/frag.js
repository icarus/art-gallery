const frag = function (paintings) {

  const ifLoop =
    paintings.map((painting, index) => {
      return `
        if (index == ${index}) {
          return texture2D(textures[${index}], uv);
        }
      `
  }).join('else')

  return `
    #ifdef GL_ES
    precision highp float;
    #endif

    #define MAX ${paintings.length}

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 mouse;
    uniform vec3 spectrum;

    uniform float timeline;

    uniform sampler2D image1;
    uniform sampler2D image2;
    uniform sampler2D image3;
    uniform sampler2D image4;
    uniform sampler2D textures[MAX];

    uniform float startIndex;
    uniform float endIndex;

    varying vec3 v_normal;
    varying vec2 v_texcoord;

    ${includes}

    vec4 sampleColor(int index, vec2 uv) {
        ${ifLoop}

        return texture2D(textures[0], uv);
    }

    void main(void) {
        vec2 uv = v_texcoord;
        uv -= 0.5;
        uv *= 1.0;

        float wave = fbm(10. * uv + 0.35 * u_time);
        float strength = smoothstep(0.0, 1.5, timeline) - smoothstep(1.5, 3.0, timeline);
        float distortion = mix(1., 1.0 + strength, wave);

        uv *= distortion;
        uv += 0.5;

        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
            discard;
        }

        vec4 startTexture = sampleColor(int(startIndex), uv);
        vec4 endTexture = sampleColor(int(endIndex), uv);

        float changeTimeline = smoothstep(0.5, 3.0, timeline);
        float mixer = 1.0 - step(changeTimeline, wave);

        vec4 color = mix(startTexture, endTexture, mixer);

        gl_FragColor = color;
    }
  `
};
