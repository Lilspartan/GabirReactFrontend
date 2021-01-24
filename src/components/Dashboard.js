import Header from './Header'
import MainDash from './DashBody'

const Dashboard = ({ onLogout }) => {
    var user = JSON.parse(sessionStorage.getItem('user'))
    var loggedin = sessionStorage.getItem('isLoggedIn')

    return (
        <>
            <Header title = {`Dashboard | ${user.name}`} onLogout = {onLogout} />
            <MainDash />
        </>
    )
}

export default Dashboard