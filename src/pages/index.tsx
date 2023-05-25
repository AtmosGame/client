import { AuthButton } from 'src/components/elements/AuthButton'

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-ffull flex-col">
        <h1 className="text-white">Atmos</h1>
        <AuthButton />
      </div>
    </>
  )
}
