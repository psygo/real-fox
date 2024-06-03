"use server"

import e from "@schema"

import { edgeDbClient } from "@db"

export async function postGames() {
  try {
    const query = e.params(
      {
        games: e.array(
          e.tuple({
            game_id: e.bigint,
            start_time: e.datetime,
            end_time: e.datetime,
            winner: e.Color,
            black: e.tuple({
              fox_id: e.int16,
              created_at: e.datetime,
              updated_at: e.datetime,
              nick: e.str,
              name: e.str,
              country: e.str,
              rank: e.int16,
              ai: e.bool,
            }),
            white: e.tuple({
              fox_id: e.int16,
              created_at: e.datetime,
              updated_at: e.datetime,
              nick: e.str,
              name: e.str,
              country: e.str,
              rank: e.int16,
              ai: e.bool,
            }),
          }),
        ),
      },

      (params) => {
        return e.for(
          e.array_unpack(params.games),
          (game) => {
            return e
              .insert(e.Game, {
                game_id: game.game_id,
                start_time: game.start_time,
                end_time: game.end_time,
                winner: game.winner,
                black: e
                  .insert(e.Player, {
                    fox_id: game.black.fox_id,
                    created_at: game.black.created_at,
                    updated_at: game.black.updated_at,
                    nick: game.black.nick,
                    name: game.black.name,
                    country: game.black.country,
                    rank: game.black.rank,
                    ai: game.black.ai,
                  })
                  .unlessConflict((player) => ({
                    on: player.fox_id,
                    else: player,
                  })),
                white: e
                  .insert(e.Player, {
                    fox_id: game.white.fox_id,
                    created_at: game.black.created_at,
                    updated_at: game.black.updated_at,
                    nick: game.white.nick,
                    name: game.white.name,
                    country: game.white.country,
                    rank: game.white.rank,
                    ai: game.white.ai,
                  })
                  .unlessConflict((player) => ({
                    on: player.fox_id,
                    else: player,
                  })),
              })
              .unlessConflict((game) => ({
                on: game.game_id,
                else: game,
              }))
          },
        )
      },
    )

    const result = await query.run(edgeDbClient, {
      games: [
        {
          game_id: 1717434007010001080n,
          black: {
            fox_id: 33167901,
            nick: "migurudia",
            name: "migurudia",
            rank: 3000,
            country: "JAPAN",
            ai: false,
            updated_at: new Date(),
            created_at: new Date(),
          },
          white: {
            fox_id: 27738848,
            nick: "财迷恐龙",
            name: "miserdino",
            rank: 3000,
            country: "UNITED_STATES",
            ai: false,
            updated_at: new Date(),
            created_at: new Date(),
          },
          start_time: new Date(),
          end_time: new Date(),
          winner: "BLACK",
        },
      ],
    })
  } catch (e) {
    console.error(e)
  }
}
