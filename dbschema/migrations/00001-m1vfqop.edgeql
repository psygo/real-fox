CREATE MIGRATION m1vfqoppifioga5dnpsblu5uhiw2wf5d3karxdfhtnvy3xv5tjovnq
    ONTO initial
{
  CREATE SCALAR TYPE default::Color EXTENDING enum<BLACK, WHITE>;
  CREATE TYPE default::Game {
      CREATE REQUIRED PROPERTY created_at: std::datetime;
      CREATE REQUIRED PROPERTY end_time: std::datetime;
      CREATE REQUIRED PROPERTY game_id: std::bigint {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY start_time: std::datetime;
      CREATE REQUIRED PROPERTY updated_at: std::datetime;
      CREATE REQUIRED PROPERTY winner: default::Color;
  };
  CREATE TYPE default::Player {
      CREATE MULTI LINK games: default::Game;
      CREATE REQUIRED PROPERTY ai: std::bool;
      CREATE REQUIRED PROPERTY country: std::str;
      CREATE REQUIRED PROPERTY created_at: std::datetime;
      CREATE REQUIRED PROPERTY fox_id: std::int16 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY nick: std::str;
      CREATE REQUIRED PROPERTY rank: std::int16;
      CREATE REQUIRED PROPERTY updated_at: std::datetime;
  };
  ALTER TYPE default::Game {
      CREATE REQUIRED LINK black: default::Player;
      CREATE REQUIRED LINK white: default::Player;
  };
};
