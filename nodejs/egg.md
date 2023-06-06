# Egg

## egg 脚手架创建的类型

1. simple - Simple egg app boilerplate
2. microservice - Microservice app boilerplate based on egg
3. sequelize - egg app with sequelize
4. ts - Simple egg && typescript app boilerplate
5. empty - Empty egg app boilerplate
6. plugin - egg plugin boilerplate
7. framework - egg framework boilerplate

## 写法

1. `const { id } = ctx.query;`用于获取`http://localhost:7001?id=xxx`的参数 id=xxx；
2. `const { id } = ctx.params;`用于获取`http://localhost:7001/user/xxx`的参数 id=xxx；
