export interface Role {
    name: string;
    description: string | null;
    roleId: string;
    channelId: string;
}

export interface Category {
    name: string;
    description: string | null;
    roles: Role[];
}

export const categories: Category[] = [
    {
        name: "League Series",
        description: "The PA League is home to many different series, from oval racing to open wheel, find the series that's right for you.",
        roles: [
            {
                name: "SOS-SRS Series",
                description: "SOSSRS serves to provide a more advanced racing series for those who are looking to go to the next level. SOSSRS is a 1 hour race using a variety of sports cars with live stewards, full course yellows, and a comprehensive rule set.",
                roleId: "908757571865808936",
                channelId: ""
            },
            {
                name: "Oval Series",
                description: null,
                roleId: "848375233408925726",
                channelId: "740354820246077510"
            },
            {
                name: "PATCO Series",
                description: null,
                roleId: "936442100021624873",
                channelId: "936439616649699388"
            },
            {
                name: "STRASS Series",
                description: null,
                roleId: "1051706113663451296",
                channelId: "1051688193910652968"
            },
            {
                name: "UPARLTAC Series",
                description: null,
                roleId: "1024526058684436500",
                channelId: "1024527022468366406"
            },
            {
                name: "IDC Series",
                description: null,
                roleId: "1084182351266980062",
                channelId: "1084182784735711364"
            }
        ]
    },
    {
        name: "Other Games",
        description: "Sometimes it's okay to play games other than iRacing, you might even find that there is a channel for the games you play!",
        roles: [
            {
                name: "Trucking Simulators",
                description: null,
                roleId: "848381042494013481",
                channelId: "738913434208567296"
            },
            {
                name: "RPGs",
                description: null,
                roleId: "851533293958070292",
                channelId: "851530218023157810"
            },
            {
                name: "Other (Non-Racing) Games",
                description: null,
                roleId: "864241913091194960",
                channelId: "864238417297408010"
            },
            {
                name: "Other Sims & Racing Games",
                description: null,
                roleId: "848380690554945546",
                channelId: "726136598378315968"
            },
        ]
    },
    {
        name: "Misc. Channels",
        description: "There is no one way to describe these channels, they range from animals to fitness.",
        roles: [
            {
                name: "Animal Pictures",
                description: null,
                roleId: "898761073572851802",
                channelId: "898684733460975618"
            },
            {
                name: "Other Sports",
                description: null,
                roleId: "1014010532006723635",
                channelId: "1014010224841080842"
            },
            {
                name: "DIY",
                description: null,
                roleId: "1018016000848953355",
                channelId: "1018016413161635840",
            },
            {
                name: "IT",
                description: null,
                roleId: "1081293601386004510",
                channelId: "1081295382883094548"
            },
            {
                name: "Fitness",
                description: null,
                roleId: "1081293696995180604",
                channelId: "1081295519516721265"
            }
        ]
    },
    {
        name: "Other Racing Related",
        description: "These channels are still iRacing related, but not ones everyone would want to see.",
        roles: [
            {
                name: "Racing School",
                description: null,
                roleId: "848376144205447198",
                channelId: "738852864444727365"
            },
        ]
    }
]

const other = [
    {
        name: "Euro Series",
        description: null,
        roleId: "848379864166826044",
        channelId: ""
    },
]