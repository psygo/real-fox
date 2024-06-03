CREATE MIGRATION m1lltnradsmgdtq7rsakglivwt5vvtmjayq6r2ixydpacfipbdgboq
    ONTO m1vfqoppifioga5dnpsblu5uhiw2wf5d3karxdfhtnvy3xv5tjovnq
{
  ALTER TYPE default::Game {
      ALTER PROPERTY created_at {
          SET default := (SELECT
              std::datetime_current()
          );
      };
      ALTER PROPERTY updated_at {
          SET default := (SELECT
              std::datetime_current()
          );
      };
  };
};
