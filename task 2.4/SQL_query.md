# SQL query

## create DB
```
CREATE DATABASE mssql_lab;
```
## Create table 
```
CREATE TABLE player (
	player_name VARCHAR(50),
	jersey_number TINYINT,
	team_name VARCHAR(50),
	age TINYINT,
	ring_number TINYINT
);
```
## insert DB
```
INSERT INTO player (player_name, jersey_number, team_name, age, ring_number) VALUES
('Stephen Curry', 30, 'Golden State Warriors', 36, 4),
('LeBron James', 6, 'Los Angeles Lakers', 39, 4),
('Kevin Durant', 35, 'Phoenix Suns', 35, 2),
('Giannis Antetokounmpo', 34, 'Milwaukee Bucks', 30, 1),
('Jayson Tatum', 0, 'Boston Celtics', 26, 0),
('Nikola Jokic', 15, 'Denver Nuggets', 29, 1),
('Jimmy Butler', 22, 'Miami Heat', 34, 0),
('Klay Thompson', 11, 'Golden State Warriors', 34, 4),
('Draymond Green', 23, 'Golden State Warriors', 34, 4),
('Anthony Davis', 3, 'Los Angeles Lakers', 31, 1),
('Luka Doncic', 77, 'Dallas Mavericks', 25, 0),
('Kyrie Irving', 11, 'Dallas Mavericks', 32, 1),
('Joel Embiid', 21, 'Philadelphia 76ers', 30, 0),
('Devin Booker', 1, 'Phoenix Suns', 27, 0),
('Zion Williamson', 1, 'New Orleans Pelicans', 24, 0);
```

## Các hàm procedure
### Safe
```
procedure SearchPlayer @name nvarchar(50)
as
begin 
	select * from player where player_name like	'%' + @name + '%'
end
```
### Unsafe
```
procedure SearchPlayerVul @name nvarchar(50)
as
begin 
	declare @query nvarchar(max)
	set @query = 'select * from player where player_name like ''%'+@name+'%'' and player_name!='
	exec (@query)
end
```
