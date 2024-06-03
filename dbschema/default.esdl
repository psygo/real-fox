module default {
  type Player {
    required fox_id: int16 {
      constraint exclusive;
    }
    
    required created_at: datetime;
    required updated_at: datetime;

    required nick: str;
    required name: str;
    required country: str;

    required rank: int16;
    required ai: bool;
    
    multi games: Game;
  }
  
  scalar type Color extending enum<BLACK, WHITE>;

  type Game {
    required game_id: bigint {
      constraint exclusive;
    }

    required created_at: datetime;
    required updated_at: datetime;

    required start_time: datetime;
    required end_time: datetime;

    required black: Player;
    required white: Player;
    required winner: Color;
  }
}
