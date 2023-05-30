import React from 'react'

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const {city,description,cost} = data;
    }
  return (
    <div>
      
    </div>
  )
}
