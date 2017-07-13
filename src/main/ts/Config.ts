export module Config {
    export class GamePlacement {
        static ATTACH_TO_BODY:string = "";
    }

    export class GameDimensions {
        static WIDTH:number = 375;
        static HEIGHT:number = 667;
    }

    export class Atlas {
        static PIPE_SIDES_1 = "deadend.png";
        static PIPE_SIDES_2_STRAIGHT = "straight.png";
        static PIPE_SIDES_2_BENT = "corner.png";
        static PIPE_SIDES_3 = "triple.png";
        static PIPE_SIDES_4 = "quad.png";
        static NAME = "assets"
    }
}
