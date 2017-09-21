

@injectable()
export class GameLoopService {
    private previousTime:number;
    
    public constructor() {
        this.addContextListener(UpdateFrameEvent.Name, this.onUpdateFrame.bind(this), UpdateFrameEvent)
        this.previousTime = 0;
    }
    
    public render(time:number) {
        let frameDuration = time - this.previousTime;
        this.update(frameDuration);
        this.previousTime = time;
    }
    
    protected update(frameDuration:number) {
        for(let animatable of this.animatables) {
            animatable.animate(frameDuration);
        }
    }
    
    public onUpdateFrame(event:UpdateFrameEvent):void {
        this.view.render(event.getTime());
    }
    
}

