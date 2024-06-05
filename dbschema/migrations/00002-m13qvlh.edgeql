CREATE MIGRATION m13qvlhw4a5rbyzerseceww3uxrrgztfbc4sj5ztqsdvluhq6mgylq
    ONTO m14t32lzngbuop2o42ern66aqg3twila67xcxn2z7n4yh3hfnarzwq
{
  ALTER TYPE default::Player {
      ALTER PROPERTY fox_id {
          SET TYPE std::int64 USING (<std::int64>.fox_id);
      };
  };
};
