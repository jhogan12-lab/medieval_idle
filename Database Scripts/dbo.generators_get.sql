CREATE OR REPLACE FUNCTION dbo.generators_get()
RETURNS SETOF dbo.generators
AS $$
    SELECT *
    FROM dbo.generators;
$$ LANGUAGE sql;