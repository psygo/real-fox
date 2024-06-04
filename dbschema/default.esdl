module default {
  type Player {
    required fox_id: int16 {
      constraint exclusive;
    }
    
    created_at: datetime {
      default := (select datetime_current());
    }
    updated_at: datetime {
      default := (select datetime_current());
    }

    required registered_time: str;
    required nick: str;
    required name: str;
    required country: str;
    required gender: str;
    required flair: str;
    
    required wins: number;
    required losses: number;
    required current_streak: str;

    required rank: int16; 
    required ai: bool;
  }
}
