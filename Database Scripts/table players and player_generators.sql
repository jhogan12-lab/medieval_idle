CREATE TABLE dbo.players (
    id SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    EmailAddress VARCHAR(100) UNIQUE,
    PhoneNumber VARCHAR(20),
	Gold BIGINT DEFAULT 0,
    CreatedDateTime TIMESTAMP DEFAULT NOW(),
    LastUpdatedDateTime TIMESTAMP DEFAULT NOW(),
	Active BOOLEAN DEFAULT TRUE
);

CREATE TABLE dbo.player_generators (
	id SERIAL PRIMARY KEY,
	player_id INT NOT NULL REFERENCES dbo.players(id) ON DELETE CASCADE,
	generator_id INT NOT NULL REFERENCES dbo.generators(id),
	owned INT DEFAULT 0,
	UNIQUE(player_id, generator_id)
)
