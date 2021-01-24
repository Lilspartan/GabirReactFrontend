import Header from './Header'
import MainDash from './DashBody'

const Dashboard = (props) => {
    var user = JSON.parse(sessionStorage.getItem('user'))
    var loggedin = sessionStorage.getItem('isLoggedIn')

    return (
        <>
            <Header title = {`Dashboard | ${user.name}`} />
            <MainDash />
        </>
    )
}

export default Dashboard