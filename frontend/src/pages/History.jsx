import React from 'react'
import WorkoutHistory from '../components/WorkoutHistory'

function History() {
  return (
    <div>
      <WorkoutHistory
            width="max-w-6xl"
            marginTop = "mt-10"
            marginLR= "mx-auto"
            renderHistory ="true"
      />
    </div>
  )
}

export default History
