import Graph from "../../modules/Graph/Graph";

const useGraph = (render = () => { }) => {

    let FPS = 0;
    let outFPS = 0;
    let lastTimestamp = Date.now();
    const animLoop = () => {
        FPS++;
        const timestamp = Date.now();
        if (timestamp - lastTimestamp >= 1000){
            outFPS = FPS;
            FPS = 0;
            lastTimestamp = timestamp;
        }
        render(outFPS);
        window.requestAnimationFrame(animLoop);
    }
    return (params) => {
        animLoop();
        return new Graph(params);
    }
}

export default useGraph;