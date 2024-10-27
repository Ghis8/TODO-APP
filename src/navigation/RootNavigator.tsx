import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { HomePage } from "../pages"

function RootNavigator() {
    
  return (
    <Router>
        <Routes>
            <Route path="/" Component={HomePage} />
        </Routes>
    </Router>
  )
}

export default RootNavigator