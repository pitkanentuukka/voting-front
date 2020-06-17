import React from 'react'
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
    <h1>this is a voting advisory machine for someone</h1>
    <p>by answering to a few questions, we will find the best candidate for you</p>
    <Link to="/voter">Go to questions</Link>
    </div>
  )

}
export default Home
