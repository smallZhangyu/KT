# MySQL

## 常用 SQL 命令

1. 查看数据库列表：`show databases;`
2. 新建 schema：`create schema name;`
3. 激活使用某个 schema: `use myblog;`
4. 新建 table:

   ```sql
   CREATE TABLE `myblog`.`users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(20) NOT NULL,
   `password` VARCHAR(20) NOT NULL,
   `realname` VARCHAR(10) NOT NULL,
   PRIMARY KEY (`id`));
   ```

5. 查看 table: `show tables;`
6. 修改 table 列

   ```sql
   ALTER TABLE `myblog`.`blogs`
   CHANGE COLUMN `createtime` `createtime` BIGINT(20) NOT NULL DEFAULT 0 ;
   ```

7. 查看记录:

   ```sql
   select * from blog;
   select id, username from blog where username='zhangsan' and(or) pwd='123';
   select id, username from blog where username<>'zhangsan';
   select id, username from blog where username like '%san%' order by id desc(asc);
   ```

8. 新增一行记录:`insert into users (username, pwd, realname) values ('lisi', '123', '李四');`
9. 删除一行记录: `delete users where id=3;`
10. 编辑一行记录: `update users set realname='李四2' where id=3;`(SET SQL_SAFE_UPDATES=0)
