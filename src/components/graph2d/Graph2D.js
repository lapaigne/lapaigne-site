import React from "react";
import { useRef, useEffect } from "react";
import Graph from "../../modules/Graph/Graph";
import Graph2DUI from "./Graph2DUI";

const Graph2D = () => {

    const WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20
    };


    const graphRef = useRef(null);
    let canRotate = false;

    useEffect(() => {
        const graph = new Graph({
            id: "canvas2D",
            WIN,
            width: 700,
            height: 700,
            callbacks: {
                wheel: (event) => wheel(event),
                mouseup: () => mouseup(),
                mousedown: () => mousedown(),
                mousemove: (event) => mousemove(event),
                mouseleave: () => mouseleave(),
            },
        });
        graphRef.current = graph;
    }, [WIN]);

    function wheel(event) {
        // Implementation
    }

    function mouseup() {
        canRotate = false;
    }

    function mousedown() {
        canRotate = true;
    }

    function mouseleave() {
        canRotate = false;
    }

    function mousemove(event) {
        if (canRotate) {
            const { movementX, movementY } = event;
            graphRef.current.scene.forEach((figure) => {
                figure.points.forEach((point) => {
                    graphRef.current.math3D.rotateOY(movementX / 180, point);
                    graphRef.current.math3D.rotateOX(movementY / 180, point);
                });
            });
        }
    }

    return (
        <div className="graph2D">
            {/* <Graph2DUI printDerivative={(value) => printDerivative(value)} /> */}
            <center><canvas id='canvas2D'></canvas></center>
        </div>
    );
}

export default Graph2D;