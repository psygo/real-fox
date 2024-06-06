export default function About() {
  return (
    <article className="prose dark:prose-invert">
      <h1>Real Fox</h1>

      <section>
        <h2>Why?</h2>

        <p>
          It&apos;s clear that having a dan system capped by
          9d clogs many different strengths up, such that we
          cannot differentiate between the world&apos;s top
          pros and really strong amateurs.
        </p>
        <p>
          As such, the obvious solution would be to use a
          more fine-grained ranking system, with more
          levels, such as Elo or Glicko. Especially due to
          videogames, the field of ranking systems has grown
          immensely in the last 20 years, it&apos;s a pity
          we&apos;re still stuck with such a medieval one.
          For a starter, check out{" "}
          <a href="https://youtu.be/-pglxege-gU">
            this lecture
          </a>
          , by Activision&apos;s Josh Menke at the 2016 GDC.
        </p>
        <p>
          A workaround would be to allow for dans higher
          than 9d, which is what this website is about. In
          fact,{" "}
          <a href="https://home.yikeweiqi.com/">Yike</a> has
          already been doing this, although it is a much
          less popular server than{" "}
          <a href="https://www.foxwq.com/">Fox Weiqi</a>.
        </p>
        <p>
          Currently,{" "}
          <a href="https://github.com/psygo/real-fox/blob/main/src/app/api/top_games/update_players_ranks.ts">
            the algorithm
          </a>{" "}
          for ranking players up beyond 9d only allows for
          ranked games if the gap between the players is of
          maximum 1d. This makes it so it is not possible
          for players to rank up indefinitely. However, in
          the future, there are plans to allow for ranking
          down if the player loses to a weaker opponent,
          even if the rank difference is bigger than 1d.
        </p>

        <section>
          <h2>This Project is Open-Source</h2>

          <p>
            This project is open to contributions. If you
            have suggestions, feel free to mention them in
            its Github repo:{" "}
            <a href="https://github.com/psygo/real-fox">
              @psygo/real-fox
            </a>
            .
          </p>

          <p>
            Huge thanks to{" "}
            <a href="https://github.com/ale64bit">
              @ale64bit
            </a>
            . None of this would have been possible without
            his work on his{" "}
            <a href="https://github.com/openfoxwq">
              Open Fox API
            </a>
            .
          </p>
        </section>
      </section>
    </article>
  )
}
