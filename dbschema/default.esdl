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

    required rank: int16;
    required ai: bool;
    
    multi games: Game;
  }
  
  # type Game {
  #   required game_id: bigint {
  #     constraint exclusive;
  #   }

  #   required created_at: datetime {
  #     default := (select datetime_current());
  #   }
  #   required updated_at: datetime {
  #     default := (select datetime_current());
  #   }

  #   required start_time: datetime;
  #   required end_time: datetime;

  #   required black: Player;
  #   required white: Player;
  #   required winner: Color;
  # }

  # scalar type Color extending enum<BLACK, WHITE>;
}
