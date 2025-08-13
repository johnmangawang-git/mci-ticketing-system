export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <h1 className="text-4xl font-bold text-center">
        🚀 Project Management & Ticketing System
      </h1>
      <p className="text-lg text-center text-gray-600">
        Server is running successfully on port 4000!
      </p>
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <img
          src="/logo.svg"
          alt="Z.ai Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}