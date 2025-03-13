document.addEventListener('scroll', function() {
    let scrollValue = window.scrollY;

    // Quantum-Scrolling Effect (Logarithmic Response)
    let depthFactor = Math.log(scrollValue + 1) * 3;

    document.querySelector('.layer1').style.transform = `translateY(${depthFactor * 0.2}px)`;
    document.querySelector('.layer2').style.transform = `translateY(${depthFactor * 0.15}px)`;
    document.querySelector('.layer3').style.transform = `translateY(${depthFactor * 0.1}px)`;
});

// WebGL Shader Background (Procedural Abstract Art)
const canvas = document.getElementById('webgl-background');
const gl = canvas.getContext('webgl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const vertexShaderCode = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;

const fragmentShaderCode = `
    precision mediump float;
    uniform float time;
    void main() {
        vec2 uv = gl_FragCoord.xy / vec2(800, 600);
        float color = 0.5 + 0.5 * sin(uv.x * 10.0 + time);
        gl_FragColor = vec4(color, uv.y, color, 1.0);
    }
`;

// WebGL Compilation & Rendering Logic
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);
const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.uniform1f(gl.getUniformLocation(program, "time"), 0);
function render(time) {
    gl.uniform1f(gl.getUniformLocation(program, "time"), time * 0.001);
    gl.clear(gl.COLOR_BUFFER_BIT);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
