IF object_id('groups', 'U') is null
	CREATE TABLE groups (
		[id] int not null identity,
		[group_id] nvarchar(255) not null,
		[description] nvarchar(max),
		[keywords] nvarchar(max),
		PRIMARY KEY( [id] )
	);