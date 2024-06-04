module default {
  type Player {
    required fox_id: int16 {
      constraint exclusive;
    }
    
    required created_at: datetime {
      default := (select datetime_current());
    }
    required updated_at: datetime {
      default := (select datetime_current());
    }

    required nick: str;
    required name: str;
    required country: str;

    required rank: int16 {
      default := 2900;
    }
    required ai: bool;
  }
}
