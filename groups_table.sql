IF
object_id('groups', 'U') is null
CREATE TABLE groups
(
    [
    id]
    int
    not
    null
    identity, [
    group_id]
    nvarchar
(
    55
) not null UNIQUE, [description] nvarchar(1000), [keywords] nvarchar(255), PRIMARY KEY ([id])
    );