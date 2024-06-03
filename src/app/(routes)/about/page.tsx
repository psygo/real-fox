export default function About() {
  return (
    <article className="prose dark:prose-invert">
      <h2>Why?</h2>

      <p>
        It&apos;s clear that having a dan system capped by
        9d clogs many different strengths up, such that we
        cannot differentiate between the world&apos;s top
        pros and really strong amateurs.
      </p>
      <p>
        As such, the obvious solution would be to use a more
        fine-grained ranking system, with more levels, such
        as Elo or Glicko.
      </p>
      <p>
        A workaround would be to allow for dans higher than
        9, which is what this website is about.
      </p>

      <h2>This Project is Open-Source</h2>

      <p>
        This project is open to contributions. If you have
        suggestions, feel free to mention them in its Github
        repo:{" "}
        <a href="https://github.com/psygo/real-fox">
          @psygo/real-fox
        </a>
        .
      </p>
    </article>
  )
}
