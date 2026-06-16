interface ButtonProps {
  label: string        
  onClick: () => void    
}

function Button({ label, onClick }: ButtonProps) {   
  return (
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
    >
      {label}             
    </button>
  )
}

export default Button