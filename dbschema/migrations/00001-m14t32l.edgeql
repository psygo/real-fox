CREATE MIGRATION m14t32lzngbuop2o42ern66aqg3twila67xcxn2z7n4yh3hfnarzwq
    ONTO initial
{
  CREATE TYPE default::Player {
      CREATE REQUIRED PROPERTY ai: std::bool;
      CREATE REQUIRED PROPERTY country: std::str;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE REQUIRED PROPERTY current_streak: std::str;
      CREATE REQUIRED PROPERTY flair: std::str;
      CREATE REQUIRED PROPERTY fox_id: std::bigint {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY gender: std::str;
      CREATE REQUIRED PROPERTY losses: std::int16;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY nick: std::str;
      CREATE REQUIRED PROPERTY rank: std::int16;
      CREATE REQUIRED PROPERTY registered_time: std::str;
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE REQUIRED PROPERTY window_length: std::int16;
      CREATE REQUIRED PROPERTY windowed_losses: std::int16;
      CREATE REQUIRED PROPERTY windowed_wins: std::int16;
      CREATE REQUIRED PROPERTY wins: std::int16;
  };
};
