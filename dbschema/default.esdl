module default {
  type Player {
    # DB Metadata
    required fox_id: int64 {
      constraint exclusive;
    }
    created_at: datetime {
      default := (select datetime_current());
    }
    updated_at: datetime {
      default := (select datetime_current());
    }

    # Fox Metadata
    # required registered_time: str;
    required nick: str;
    required name: str;
    required country: str;
    # required gender: str;
    # required flair: str;
    required ai: bool;
    # required wins: int16;
    # required losses: int16;
    # required current_streak: str;

    # Calculated
    required rank: int16; 
    required windowed_wins: int16;
    required windowed_losses: int16;
  }
}
