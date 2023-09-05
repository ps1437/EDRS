
interface ErrorProps{
    msg: string| undefined
}

export default function ErrorText({msg}:ErrorProps) {
  return (
    <span className="text-sm text-red-500">{msg}</span>
  )
}
