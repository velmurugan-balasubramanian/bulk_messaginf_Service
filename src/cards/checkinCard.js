const checkinCard = (bot_id, event_type, event) => {

    let eventImages = {
        'sports': 'https://img.icons8.com/stickers/452/sport.png',
        'concert': 'https://img.icons8.com/stickers/344/rock-music.png',
        'dinner': 'https://img.icons8.com/stickers/344/food-and-wine.png',
        'lunch': 'https://img.icons8.com/stickers/344/pizza.png'
    }

    let eventType = event_type


    let card = {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.3",
        "body": [
            {
                "type": "Input.Text",
                "id": "event_id",
                "value": event.event_id,
                "isVisible": false,
            },
            {
                "type": "Input.Text",
                "id": "bot_id",
                "value": bot_id,
                "isVisible": false,
            },
            {
                "type": "Input.Text",
                "id": "event_type",
                "value": eventType,
                "isVisible": false,
            },
            {
                "type": "Input.Text",
                "id": "action",
                "value": "checkin",
                "isVisible": false,
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "Image",
                                "url": eventImages[eventType],
                                "size": "small",
                                "style": "person"
                            }
                        ],
                        "width": "auto"
                    },
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "TextBlock",
                                "size": "large",
                                "color": "dark",
                                "weight": "Bolder",
                                "text": `You have been invited to ${event.event_name} event`,
                                "wrap": true
                            }
                        ],
                        "width": "auto"
                    }
                ]
            },
            {
                "type": "TextBlock",
                "size": "Medium",
                "weight": "Bolder",
                "text": `The ${event.event_name} is starting now, check-in to let your team mates know you are in! `,
                "wrap": true
            },
            {
                "type": "Input.ChoiceSet",
                "id": "attendance",
                "value": "yes",
                "choices": [
                    {
                        "title": "I'm already in the venue",
                        "value": "yes"
                    },
                    {
                        "title": "Sorry, Couldn't attend",
                        "value": "no"
                    },
                ]
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Checkin to the Event"
            }
        ]

    }

    return card

}





module.exports = checkinCard;
