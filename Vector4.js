export default class Vector4 
{
    constructor(x = 0, y = 0, z = 0, w = 1) 
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    clone() 
    {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    length2() 
    {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() 
    {
        return Math.sqrt(this.length2());
    }

    normalize() 
    {
        var len2 = this.length2();
        if(len2 > 0){
            var invLen = 1/Math.sqrt(len2);
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
        }
        return this;
    }

    dotProduct(otherVector) 
    {
        return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
    }

    product(otherVector) 
    {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
        this.z *= otherVector.z;
        return this;
    }

    multiply(scalarValue) 
    {
        this.x *= scalarValue;
        this.y *= scalarValue;
        this.z *= scalarValue;
        return this;
    }

    add(otherVector) 
    {
        this.x += otherVector.x;
        this.y += otherVector.y;
        this.z += otherVector.z;
        return this;
    }

    subtract(otherVector) 
    {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        this.z -= otherVector.z;
        return this;
    }

    revert() 
    {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
}