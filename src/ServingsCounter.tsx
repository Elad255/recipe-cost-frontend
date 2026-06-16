import { useState } from 'react'
import Card from './Card'
import Button from './Button'

function ServingsCounter() {
  const [servings, setServings] = useState(1)

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Servings</h2>
      <p className="text-5xl font-bold text-orange-500 mb-4">{servings}</p>
      <div className="flex gap-2">
        <Button
          label="−"
          onClick={() => setServings(servings > 1 ? servings - 1 : 1)}
        />
        <Button
          label="+"
          onClick={() => setServings(servings + 1)}
        />
      </div>
    </Card>
  )
}

export default ServingsCounter