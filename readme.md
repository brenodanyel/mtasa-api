# MTA:SA API

[Read the Swagger Docs](https://app.swaggerhub.com/apis-docs/brenodanyel/mtasa-api/1.0.0-oas3)

## Why I created this API?

As [MTA](https://mtasa.com) doesn't have a proper API to fetch server information, I decided to create it by myself, because its being requested by the community for a long time.

## How does it work?

- <details>
  <summary>GET https://mtasa-api.com/servers</summary>

  - How it works behind the scenes?

    - We make a GET request to https://master.mtasa.com/ase/mta/.
    - We parse the response.
    - We return the parsed data.
  - Note: On our side the result is only updated every 5 minutes, but I have no idea how long it takes to update on MTA side.

  - Expected result:

    ```js
    [
        {
            "ip": string,
            "port": number,
            "playerCount": number,
            "playerSlots": number,
            "name": string,
            "version": string,
            "passworded": boolean,
            "httpPort": number
        },
        ...
    ]
    ```
</details>

- <details>
  <summary>GET https://mtasa-api.com/stats</summary>

  - How it works behind the scenes?

    - We make a GET request to https://master.mtasa.com/ase/mta/.
    - We parse the response.
    - We return the parsed data.
  - Note: the result is only updated once every minute.

  - Expected result:

    ```js
    {
        "playerCount": number,
        "servers": number,
    }
    ```
</details>

- <details>
  <summary>GET https://mtasa-api.com/server/?ip=SERVER_IP&asePort=SERVER_ASE_PORT</summary>

  - How it works behind the scenes?

    - We send a packet to the server using [dgram](https://nodejs.org/api/dgram.html).
    - We parse the response.
    - We return the parsed data.
  - Note: the result is only updated once every minute.

  - Note: the `asePort` value is equal `the connection port (default 22003) + 123` (default 22126)

  - Expected result:

    ```js
    {
        "game": string,
        "port": number,
        "name": string,
        "gameType" string,
        "mapName": string,
        "version": string,
        "passworded": boolean,
        "playerCount": number,
        "playerSlots": number,
        "players": [
            {
                "name": string,
                "ping": number
            },
            ...
        ]
    }
    ```
</details>

## How to run this code on your side?
- <details>
  <summary>Requirements:</summary>

  - [Node.JS](https://nodejs.org/en/)
</details>

- <details>
  <summary>Step-by-step to run on your machine:</summary>

  - Clone the project
  - Rename `.env.example` -> `.env`
  - Open the terminal in root folder
  - Run the following commands:
    1. `npm install`
    2. `npm run dev`
  - Navigate to http://localhost:3000/stats
</details>

## Note:
This is a unofficial API, which means it's not maintained by the MTA Team.

## Special Thanks:
  - The MTA Team for maintaining this great game.
  - [Tederis](https://github.com/tederis) for the [ase2json](https://github.com/tederis/ase2json) repository.
