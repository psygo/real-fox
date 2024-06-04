import { type PlayerSelect } from "@types"

type PlayerCardProps = {
  player: PlayerSelect
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="rounded-md border-2 border-gray-700 bg-gray-900 p-4 text-gray-100 hover:bg-gray-800">
      <div className="flex flex-wrap items-baseline gap-2">
        <PlayerName name={player.name} />
        <PlayerRank rank={player.rank} />
        <PlayerCountry country={player.country} />
        {/* <PlayerSex gender={player.gender} /> */}
        {/* <PlayerFlair flair={player.flair} /> */}
      </div>
    </div>
  )
}

type PlayerNameProps = {
  name: string
}

function PlayerName({ name }: PlayerNameProps) {
  return <h3 className="text-xl font-bold">{name}</h3>
}

type PlayerRankProps = {
  rank: number
}

function PlayerRank({ rank }: PlayerRankProps) {
  const danRank = ((rank - 2100) / 100).toFixed(0) + "d"

  return (
    <h4 className="text-lg font-semibold text-gray-400">
      {danRank}
    </h4>
  )
}

type PlayerCountryProps = {
  country: string
}

const flags: Record<string, string> = {
  CHINA: "🇨🇳",
  JAPAN: "🇯🇵",
  SOUTH_KOREA: "🇰🇷",
  TAIWAN: "🇹🇼",
  UNITED_STATES: "🇺🇸",
  UNSPECIFIED: "🌐",
  UNKNOWN: "❔",
}

function PlayerCountry({ country }: PlayerCountryProps) {
  const flag = flags[country] ?? flags.UNKNOWN

  return <h4 className="text-xl text-gray-400">{flag}</h4>
}

type PlayerGenderProps = {
  gender: string
}

function PlayerSex({ gender }: PlayerGenderProps) {
  return <p>{gender}</p>
}

type PlayerFlairProps = {
  flair: string
}

function PlayerFlair({ flair }: PlayerFlairProps) {
  return <p>{flair}</p>
}
