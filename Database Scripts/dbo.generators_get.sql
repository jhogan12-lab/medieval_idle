CREATE FUNCTION dbo.generators_get()
RETURNS TABLE(id int, title text, description text, base_cost int, gold_per_second int, active boolean)
AS $$
BEGIN
    RETURN QUERY SELECT id, title, description, base_cost, gold_per_second, active FROM dbo.generators;
END;
$$ LANGUAGE plpgsql;
