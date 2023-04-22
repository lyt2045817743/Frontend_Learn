var Parent = /** @class */ (function () {
    function Parent() {
        this._age = '1';
    }
    Parent.prototype.getAge = function () {
        return this._age;
    };
    return Parent;
}());
var p = new Parent();
console.log(p._age);
