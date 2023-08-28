import { vec3 } from "/gl-matrix/esm/index.js";
import { add, clone, dot, length, multiply, scale, sub } from "./gl-matrix/esm/vec3.js";
import { vec4 } from "/gl-matrix/esm/index.js";

export default class sphere 
{
    constructor(position, colour, radius)
    {
        this.position = position;
        this.colour = colour;
        this.radius = radius;
    }

    intersect(ray)
    {
        var center = vec3.create(this.position[0], this.position[1], this.position[2]);
        var test = vec3.create();
        var origin = vec3.create(ray.start[0], ray.start[1], ray.start[2]);
        var direction = vec3.create(ray.direction[0], ray.direction[1], ray.direction[2]);
        var dist = 0;
        test = add(vec3.create(), origin, scale(vec3.create(), direction, (Math.max(0, dot(sub(vec3.create(), center, origin), direction)))));
        dist = vec3.distance(test, center);
        if (dist > this.radius)
        {
            return vec3.create(-1, -1, -1);
        }
        var x = this.radius^2 + dist^2;
        var intsec = vec3.create();
        intsec = add(vec3.create(), origin, scale(vec3.create(), direction, ((Math.max(0, dot(sub(vec3.create(), center, origin), direction))) - x)));
        return intsec;
    }

    calcColour(intsec, ray, scene)
    {
        var normal;
        var lightVec;
        var angle;
        var colour;
        var half;
        return vec4.create(255, 255, 255, 255);
    }
}