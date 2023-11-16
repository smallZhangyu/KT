# tsconfig.json 配置文件

## tsconfig.json 的配置项

1. `compilerOptions:{}`，编译选项；
2. `files:[]`，配置少量的允许列表；
3. `extends:''`，继承另一个配置文件；
4. `include:[]`，批量指定文件进行编译；
5. `exclude:[]`，指定不进行编译的文件；
6. `references:[]`，用于项目引用，提升性能；

### compilerOptions 编译选项

使用`tsc --init`后默认生产的 tsconfig.json 里只包含 compilerOptions 这个选项，  
这个选项里默认开启下边 6 个配置

1. `target: es2016`，指定编译为那个版本的 js；
2. `module: commonjs`，指定要编译的模块化规范；
3. `strict: true`，所有严格检查的总开关，建议开启；
4. `esModuleInterop: true`，兼容 JS 模块无 default 的导入；
5. `skipLibCheck: true`，跳过所有.d.ts 文件内的类型检查；
6. `forceConsistentCasingInFileNames: true`，引入时强制区分大小写；

## 参考链接

[官方配置项文档](https://www.typescriptlang.org/tsconfig)
