


// TypeScript 中的装饰器可以被附加到类声明、方法、访问符、属性和参数上，
// 装饰器的类型有参数装饰器、方法装饰器、访问器或参数装饰器、参数装饰器。

// TypeScript 中的装饰器使用 @expression 这种形式，expression 求值后为一个函数，它在运行时被调用，被装饰的声明信息会被做为参数传入。



function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

for (let key in new Greeter('Jim')) {
    console.log(key);
}
// 输出： greeting
