export module Config {
    
    export class Atlas {
        static PIPE_SIDES_1 = "deadend.png";
        static PIPE_SIDES_2_STRAIGHT = "straight.png";
        static PIPE_SIDES_2_BENT = "corner.png";
        static PIPE_SIDES_3 = "triple.png";
        static PIPE_SIDES_4 = "quad.png";
        static ROCKET = "rocket.png";
        static NAME = "assets"
    }

    export class TileDimensions {
        static WIDTH:number = 48;
        static HEIGHT:number = 48;
    }

    export class RocketParameters {
        static SCORE_MULTIPLIER = 10;
        static INITIAL_LEVEL = 1;
    }

    export class RocketStationParameters {
        static MAX_DELAY_MILLISECONDS:number = 300;
        static ROCKET_STATION_HEIGHT:number = 9;
        static ROCKET_STATION_WIDTH:number = 5;
        static PIPES_SPAWN_OFFSET:number = 15;
        static PIPES_FALLING_TIME:number = 10;
        static ROCKET_OFFSET:number = 20;
    }
}
