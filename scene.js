export default class scene 
{
    constructor()
    {
        this.objects = [];
    }

    addObject(object)
    {
        this.objects.push(object);
    }

    getObjects()
    {
        return this.objects;
    }

    clear()
    {
        this.objects = [];
    }
}