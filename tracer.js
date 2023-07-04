import { vec4, mat4, vec3 } from "/gl-matrix/esm/index.js";
import { clone, sub, transformMat4 } from "./gl-matrix/esm/vec4.js";
import { invert } from "./gl-matrix/esm/mat4.js";
import { length } from "./gl-matrix/esm/vec3.js";
import scene from "./scene.js";
import sphere from "./sphere.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fov = Math.PI/4;
const znear = 1;
const zfar = 1000;
const x = canvas.getAttribute("width");
const y = canvas.getAttribute("height");

class ray 
{
    constructor(position, invProj)
    {
        var near;
        near = clone(position);
        var far;
        far = clone(near);
        far[2] = 1;
        vec4.transformMat4(near, near, invProj);
        vec4.transformMat4(far, far, invProj);
        near[0] /= near[3];
        near[1] /= near[3];
        near[2] /= near[3];
        near[3] /= near[3];
        far[0] /= far[3];
        far[1] /= far[3];
        far[2] /= far[3];
        far[3] /= far[3];
        this.start = near;
        var direction = vec4.create();
        sub(direction, far, near);
        direction[3] = 1;
        this.direction = vec4.create();
        this.normalize(this.direction, direction);
        this.start[0] += 1;
        this.start[1] += 1;
        this.start[2] = znear;
        this.start[0] *= x;
        this.start[1] *= y;
    }

    normalize(out, vector)
    {
        var a = vector[0];
        var b = vector[1];
        var c = vector[2];
        var len = a * a + b * b + c * c;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = a * len;
        out[1] = b * len;
        out[2] = c * len;
        out[3] = vector[3];
    }
}

export default class tracer
{
    constructor()
    {
        
        this.scene = new scene();
        this.scene.addObject(new sphere(vec4.create(600, 600, -400, 1), vec3.create(255, 0, 0), 50));
        this.rays = [];
        var proj = mat4.create();
        var halftan = Math.tan(fov/2);
        proj[0] = 1 / ((canvas.getAttribute("width")/canvas.getAttribute("height")) * halftan);
        proj[5] = 1 / halftan;
        proj[15] = 0;
        proj[11] = -1;
        proj[10] = -(zfar + znear)/(zfar - znear);
        proj[14] = -(2 * zfar * znear)/(zfar - znear);
        var invProj = mat4.create();
        invert(invProj, proj);
        this.colours = new Uint8ClampedArray(x * y * 4);
        for (var j = 0; j < x; j++)
        {
            for (var i = 0; i < y; i++)
            {
                var pos = vec4.create();
                pos[0] = (2 * i / x) - 1;
                pos[1] = (2 * j / y) - 1;
                pos[2] = -1;
                pos[3] = 1;
                this.rays.push(new ray(pos, invProj));
            }
        }
    }

    trace()
    {
        var intsec;
        var e = 0;
        var r = 0;
        var object;
        for (var j = 0; j < x; j++)
        {
            for (var i = 0; i < y; i++)
            {
                intsec = 10^8;
                this.scene.objects.forEach(obj => {
                    var testIntsec = obj.intersect(this.rays[r]);
                    if (testIntsec < intsec)
                    {
                        intsec = testIntsec;
                        object = obj;
                    }
                });
                if (intsec[0] != -1)
                {
                    this.colours[e] = object.calcColour(length(intsec), this.rays[r])[0];
                    e++;
                    this.colours[e] = object.calcColour(length(intsec), this.rays[r])[1];
                    e++;
                    this.colours[e] = object.calcColour(length(intsec), this.rays[r])[2];
                    e++;
                    this.colours[e] = object.calcColour(length(intsec), this.rays[r])[3];
                    e++;
                }
                else
                {
                    this.colours[e] = 0;
                    e++;
                    this.colours[e] = 0;
                    e++;
                    this.colours[e] = 0;
                    e++;
                    this.colours[e] = 0;
                    e++;
                }
                r++;
            }
        }
        var imageData = new ImageData(this.colours, x, y);
        var bitmap = createImageBitmap(imageData);
        bitmap.then((img) => {
            ctx.drawImage(img, 0, 0);
        });
    }
}

var raytracer = new tracer();
console.log(raytracer);
raytracer.trace();