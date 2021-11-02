insert into projects (id, name) select * from (
    select 1, 'Project one' union
    select 2, 'Project ' || current_timestamp
) x where not exists(select 1 from projects);