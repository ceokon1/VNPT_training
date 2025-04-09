# Các hàm procedure
### Safe
procedure SearchPlayer @name nvarchar(50)
as
begin 
	select * from player where player_name like	'%' + @name + '%'
end
### Unsafe
procedure SearchPlayerVul @name nvarchar(50)
as
begin 
	declare @query nvarchar(max)
	set @query = 'select * from player where player_name like ''%'+@name+'%'' and player_name!='
	exec (@query)
end
