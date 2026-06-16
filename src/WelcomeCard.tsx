interface WelcomeCardProps {
  name: string
}

function WelcomeCard({ name }: WelcomeCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">
        Welcome back, {name}!
      </h2>
      <p className="text-gray-500">Your Recipe Cost Dashboard is loading soon.</p>
    </div>
  )
}

export default WelcomeCard