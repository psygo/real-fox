CREATE MIGRATION m1hvry7liauttrmuvjp3ic5jndc33e2x5irn4crubydlr6vghedq2q
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
      CREATE REQUIRED PROPERTY fox_id: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY nick: std::str;
      CREATE REQUIRED PROPERTY rank: std::int16;
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      CREATE REQUIRED PROPERTY windowed_losses: std::int16;
      CREATE REQUIRED PROPERTY windowed_wins: std::int16;
  };
};
