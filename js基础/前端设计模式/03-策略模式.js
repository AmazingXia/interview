// 🎭 3. 策略模式（Strategy Pattern）
// ✅ 作用：封装一组可替换的算法策略，避免 if else
// 📦 业务场景：表单校验


const validators = {
  isEmail: val => /\S+@\S+\.\S+/.test(val),
  isPhone: val => /^1\d{10}$/.test(val),
  minLength: len => val => val.length >= len,
};

function validate(value, rules) {
  return rules.every(rule => rule(value));
}

// 使用
validate('hello@a.com', [validators.isEmail]); // true


// 计算折扣的算法部分提取出来保存为一个对象，折扣的类型作为 key，这样索引的时候通过对象的键值索引调用具体的算法：

// 减少if else 的使用，使用对象映射来存储不同的折扣计算方法
const DiscountMap = {
    minus100_30: function(price) {
        return price - Math.floor(price / 100) * 30
    },
    minus200_80: function(price) {
        return price - Math.floor(price / 200) * 80
    },
    percent80: function(price) {
        return price * 0.8
    }
}

/* 计算总售价*/
function priceCalculate(discountType, price) {
    return DiscountMap[discountType] && DiscountMap[discountType](price)
}

priceCalculate('minus100_30', 270)
priceCalculate('percent80', 250)