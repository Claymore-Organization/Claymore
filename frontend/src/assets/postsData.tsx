const posts = [
    {
        id: 1,
        user: 1,
        status: 'New',
        date_posted: new Date("4/8/2022"),
        title: 'Scooby Doo Figurine',
        content: 'I would love to have an original standalone Scooby Doo figure.',
        messages: [1]
    },
    {
        id: 2,
        user: 1,
        status: 'In Progress',
        date_posted: new Date("5/10/2022"),
        title: 'Custom Power Ranger',
        content: 'I want a cool new design for a power ranger',
        messages: [2, 3, 4, 5, 6]
    },
    {
        id: 3,
        user: 1,
        status: 'Finished',
        date_posted: new Date("4/2/2022"),
        title: 'Zoro from One Piece design',
        content: 'I want a figurine of zoro in a slicing movement with enma.',
        messages: [7, 8]

    },
    {
        id: 4,
        user: 2,
        status: 'Finished',
        date_posted: new Date("4/3/2022"),
        title: 'I want a Melina Figure from Elden Ring',
        content: 'I would love to have a Melina Figure Elden Ring. Can anyone make this?',
        messages: [9]
    },
    {
        id: 5,
        user: 3,
        status: 'New',
        date_posted: new Date("4/9/2022"),
        title: 'Custom Queen Marika Figure (Elden Ring)',
        content: 'I would love to have a custom Queen Marika Figure (Elden Ring) with Blue, Red, and Yellow colors',
        messages: [10]
    },
  ]
  
  export default posts