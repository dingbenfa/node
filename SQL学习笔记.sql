-- 新增
-- insert into flower_db.users(username, password) values ("benfa", "666666"); 

-- 更新
-- update flower_db.users set password="888888", status="1" where id="6";
-- 批量更新
-- update flower_db.users set password="000000" where id>0;

-- 删除
-- delete from flower_db.users where username="tony";

-- or或
-- update flower_db.users set password="000000" where id="1" or id="2" or id="6";

-- and并
-- update flower_db.users set password="888888" where id="6" and username="benfa";

-- =、 <>（!=）、<、>、>=、<=、BETWEEN（在某个范围内）、LIKE（搜索某种模式）

-- 查询 --排序 (asc\desc)
-- select * from flower_db.users order by status desc;
-- select * from flower_db.users order by status desc, username desc;

-- 查询
select * from flower_db.users;

-- 使用 count(*) 函数统计表中status为false的总条数
-- select count(*) as total from flower_db.users where status=false;

-- 使用 as 关键字给列设置别名
-- select count(*) as allNum from flower_db.users where status=false;
-- select username as name, password as pwd from flower_db.users;


