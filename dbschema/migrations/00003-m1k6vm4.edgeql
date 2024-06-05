CREATE MIGRATION m1k6vm44kzaxan3w5k7y52u5dthezj2ou4hk2luny62ki755eadvwa
    ONTO m13qvlhw4a5rbyzerseceww3uxrrgztfbc4sj5ztqsdvluhq6mgylq
{
  ALTER TYPE default::Player {
      DROP PROPERTY ai;
      DROP PROPERTY country;
      DROP PROPERTY current_streak;
      DROP PROPERTY flair;
      DROP PROPERTY gender;
      DROP PROPERTY losses;
      DROP PROPERTY name;
      DROP PROPERTY nick;
      DROP PROPERTY registered_time;
      DROP PROPERTY window_length;
      DROP PROPERTY wins;
  };
};
