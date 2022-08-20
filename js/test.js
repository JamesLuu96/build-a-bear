const obj = [{name: "James", hp: 100}, {name: "Tony", hp: 20}]

const test = obj.filter(x=>x.name === "Tony")

test[0].hp = 40

console.log(obj)