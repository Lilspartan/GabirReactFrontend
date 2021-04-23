import { useState } from 'react'
import Header from '../../Header'

const StandingsBody = () => {

    const [session, setSession] = useState(0)
    const [standings, setStandings] = useState([
    {
        "name": "Gabe Krahulik",
        "carIndex": 0,
        "carNumber": "64",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Aussie Greg Hill",
        "carIndex": 1,
        "carNumber": "1",
        "position": [
            {
                "position": 28,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Dean Marsh",
        "carIndex": 2,
        "carNumber": "2",
        "position": [
            {
                "position": 19,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "David Tucker",
        "carIndex": 3,
        "carNumber": "3",
        "position": [
            {
                "position": 25,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Lauren Russo",
        "carIndex": 4,
        "carNumber": "4",
        "position": [
            {
                "position": 1,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "John Hughes",
        "carIndex": 5,
        "carNumber": "5",
        "position": [
            {
                "position": 17,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "John Henry",
        "carIndex": 6,
        "carNumber": "6",
        "position": [
            {
                "position": 16,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Steve Reis",
        "carIndex": 7,
        "carNumber": "7",
        "position": [
            {
                "position": 24,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Chris Weidner",
        "carIndex": 8,
        "carNumber": "8",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "John West",
        "carIndex": 9,
        "carNumber": "9",
        "position": [
            {
                "position": 12,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Alex Saunders",
        "carIndex": 10,
        "carNumber": "10",
        "position": [
            {
                "position": 7,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Jennifer Young",
        "carIndex": 11,
        "carNumber": "11",
        "position": [
            {
                "position": 26,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Nigel Pattinson",
        "carIndex": 12,
        "carNumber": "12",
        "position": [
            {
                "position": 27,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Greg West",
        "carIndex": 13,
        "carNumber": "36",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Drew Adamson",
        "carIndex": 14,
        "carNumber": "14",
        "position": [
            {
                "position": 14,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Christopher Bell",
        "carIndex": 15,
        "carNumber": "15",
        "position": [
            {
                "position": 9,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Brian Rainville",
        "carIndex": 16,
        "carNumber": "16",
        "position": [
            {
                "position": 4,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Jimmy Van Veen",
        "carIndex": 17,
        "carNumber": "17",
        "position": [
            {
                "position": 11,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "David LoVecchio",
        "carIndex": 18,
        "carNumber": "18",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Otto Szebeni",
        "carIndex": 19,
        "carNumber": "19",
        "position": [
            {
                "position": 5,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Kevin Combs",
        "carIndex": 20,
        "carNumber": "20",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Alex Horn",
        "carIndex": 21,
        "carNumber": "21",
        "position": [
            {
                "position": 29,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Jason Bryfogle",
        "carIndex": 22,
        "carNumber": "22",
        "position": [
            {
                "position": 3,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Dale Earnhardt Jr.",
        "carIndex": 23,
        "carNumber": "23",
        "position": [
            {
                "position": 30,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Cisco Scaramuzza",
        "carIndex": 24,
        "carNumber": "85",
        "position": [
            {
                "position": 13,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Grant Reeve",
        "carIndex": 25,
        "carNumber": "25",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Steve Myers",
        "carIndex": 26,
        "carNumber": "26",
        "position": [
            {
                "position": 2,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Dave Gosselin",
        "carIndex": 27,
        "carNumber": "27",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Sam Roush",
        "carIndex": 28,
        "carNumber": "28",
        "position": [
            {
                "position": 10,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Jaime Baker",
        "carIndex": 29,
        "carNumber": "29",
        "position": [
            {
                "position": 6,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Alex Gustafson",
        "carIndex": 30,
        "carNumber": "30",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Nim Cross",
        "carIndex": 31,
        "carNumber": "31",
        "position": [
            {
                "position": 8,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Jay Scullin",
        "carIndex": 32,
        "carNumber": "32",
        "position": [
            {
                "position": 31,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "TJ Majors",
        "carIndex": 33,
        "carNumber": "33",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Peter Inglis",
        "carIndex": 34,
        "carNumber": "34",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Lisa Hudson",
        "carIndex": 35,
        "carNumber": "35",
        "position": [
            {
                "position": 22,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Nick Leep",
        "carIndex": 36,
        "carNumber": "13",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Greg Hill",
        "carIndex": 37,
        "carNumber": "37",
        "position": [
            {
                "position": 23,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Dano Garrison",
        "carIndex": 38,
        "carNumber": "38",
        "position": [
            {
                "position": 20,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Dave Kaemmer",
        "carIndex": 39,
        "carNumber": "39",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Thomas Leyva",
        "carIndex": 40,
        "carNumber": "40",
        "position": [
            {
                "position": 15,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Nathan Wright",
        "carIndex": 41,
        "carNumber": "41",
        "position": [
            {
                "position": 21,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Scottie Nash",
        "carIndex": 42,
        "carNumber": "42",
        "position": [
            {
                "position": 18,
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    },
    {
        "name": "Pace Car",
        "carIndex": 43,
        "carNumber": "0",
        "position": [
            {
                "position": "N/A",
                "sessionName": "PRACTICE"
            },
            {
                "position": "N/A",
                "sessionName": "QUALIFY"
            },
            {
                "position": "N/A",
                "sessionName": "RACE"
            }
        ]
    }
    ])

    return (
        <>
            <Header title = "Gabir Motors | Standings" />
            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
                <table>
                    <tbody className = "uk-table uk-table-hover uk-table-divider uk-table-responsive uk-table-middle uk-table-small">
                        {standings.filter((d) => d.position[session].position !== 'N/A').sort((a, b) => {return a.position[session].position - b.position[session].position}).map(driver => (
                            <>
                                <tr>
                                    <td>
                                        {driver.position[session].position}
                                    </td>
                                    <td>
                                        {driver.name}
                                    </td>
                                </tr>
                            </>
                        ))} 
                        {standings.filter((d) => d.position[session].position === 'N/A').map(driver => (
                            <>
                                <tr>
                                    <td>
                                        {driver.position[session].position}
                                    </td>
                                    <td>
                                        {driver.name}
                                    </td>
                                </tr>
                            </>
                        ))} 
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StandingsBody;