import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export function Footer() {
  return (
    <footer className="flex justify-center bg-gray-900 p-3">
      <a
        className="h-6 w-6"
        href="https://github.com/psygo/real-fox"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="h-[22px] w-[22px]"
          color="gray"
          icon={faGithub}
        />
      </a>
    </footer>
  )
}
