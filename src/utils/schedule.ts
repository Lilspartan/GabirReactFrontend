// endTime of null means no set end time

export interface Series {
    name:          string;
    organizer:     string;
    description:   string | null;
    roleId:        string | null;
    channelId:     string | null;
    id:            number;
    time:          string;
}

export const series: Series[] = [
    {
        name: "Oval Series",
        organizer: "Draxond (Chris O)",
        description: null,
        roleId: "848375233408925726",
        channelId: "740354820246077510",
        id: 2,
        time: "Mondays at 8:00 PM PST",
    },
    {
        name: "Sort of Serious Sports Racing Series (SOSSRS)",
        organizer: "Peter G. (Professor)",
        description: "SOSSRS serves to provide a more advanced racing series for those who are looking to go to the next level. SOSSRS is a 1 hour race using a variety of sports cars with live stewards, full course yellows, and a comprehensive rule set.",
        roleId: "908757571865808936",
        channelId: "908179725753667584",
        id: 4,
        time: "Tuesdays at 7:00 PM PST"
    },
    {
        name: "The Super Truck Racing Association (STRASS)",
        organizer: "WarDingo (David L Garvin)",
        description: "The purpose of this league is to take Off-Road trucks onto road courses with no damage and no track limits. We will carve out new layouts that the track designers never thought possible. For the most part I view this as a casual league, but I do plan to count points.",
        roleId: "1051706113663451296",
        channelId: "",
        id: 6,
        time: "Alternates with IDC, Wednesdays, time TBD"
    },
    {
        name: "The International Dirt Conference (IDC)",
        organizer: "MrBananadile(Christopher Garvin)",
        description: null,
        roleId: "",
        channelId: "",
        id: 7,
        time: "Alternates with STRASS, Wednesdays, time TBD"
    },
    {
        name: "The Gabir Motors Cup",
        organizer: "The PA League Chiefs",
        description: "The Gabir Motors Cup is the one that started it all, it's the main event happening every Thursday night.",
        roleId: null,
        channelId: null,
        id: 1,
        time: "Thursdays at 7:00PM PST",
    },
    {
        name: "Penny Arcade Touring Car Organization (PATCO)",
        organizer: "Chris Decker",
        description: null,
        roleId: "936442100021624873",
        channelId: "936439616649699388",
        id: 3,
        time: "Fridays at 7:15 PM PST",
    },
    {
        name: "Unofficial Penny Arcade Racing League Time Attack Challenge (UPARLTAC)",
        organizer: "Peter G. (Professor)",
        description: "UPARLTAC is a time attack competition that uses the existing iracing time attack features but allows for a variety of cars and an internal league scoring system to keep track of the fastest participants.",
        roleId: "1024526058684436500",
        channelId: "1024527022468366406",
        id: 5,
        time: "",
    }
]