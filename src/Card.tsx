interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {children}
    </div>
  )
}

export default Card