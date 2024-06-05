import Image from "next/image"

import { type PlayerSelect } from "@types"

type PlayerCardProps = {
  player: PlayerSelect
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="rounded-md border-2 border-gray-700 bg-gray-900 p-4 text-gray-100 hover:bg-gray-800">
      <div className="flex gap-4">
        <PlayerAvatar />

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <PlayerName name={player.name} />
            <PlayerRank rank={player.rank} />
            <PlayerCountry country={player.country} />
            <PlayerIsAI isAi={player.ai} />
          </div>

          <PlayerCurrentStreak
            wins={player.windowed_wins}
            losses={player.windowed_losses}
          />
        </div>
      </div>
    </div>
  )
}

type PlayerIsAIProps = {
  isAi: boolean
}

function PlayerIsAI({ isAi }: PlayerIsAIProps) {
  return isAi ? <p className="text-gray-400">AI</p> : null
}

type PlayerAvatarProps = {
  url?: string
}

function PlayerAvatar({
  url = "/fox_avatars/avatar_01.png",
}: PlayerAvatarProps) {
  return (
    <Image
      className="rounded-md"
      src={url}
      alt="Avatar"
      width={60}
      height={60}
    />
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
  const danRank = ((rank - 2000) / 100).toFixed(0) + "d"

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
  THAILAND: "🇹🇭",
  UNITED_STATES: "🇺🇸",
  UNSPECIFIED: "🌐",
  UNKNOWN: "❔",
}

function PlayerCountry({ country }: PlayerCountryProps) {
  const flag = flags[country] ?? flags.UNKNOWN

  return <h4 className="text-xl text-gray-400">{flag}</h4>
}

type PlayerCurrentStreakProps = {
  wins: number
  losses: number
}

function PlayerCurrentStreak({
  wins,
  losses,
}: PlayerCurrentStreakProps) {
  return (
    <div>
      <p className="font-semibold">
        <span className="text-green-400">{wins} W</span>{" "}
        <span className="text-gray-500">:</span>{" "}
        <span className="text-red-400">{losses} L</span>
      </p>
    </div>
  )
}
