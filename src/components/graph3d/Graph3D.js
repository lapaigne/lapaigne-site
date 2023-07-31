import React, { useEffect } from "react";
import Math3D, { Point, Light, Sphere } from "../../modules/Math3D";
import Graph3DUI from "./Graph3DUI";
import useGraph from "../hooks/useGraph";
// import './Graph3D.scss';

const Graph3D = () => {
    const settings = {
        canRotate: false,
        showPoints: false,
        showEdges: false,
        showPolygons: true,
        showLight: true
    }
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        FOCUS: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 50)
    };
    const LIGHT = new Light(-20, 0, 0, 5e3);
    const math3D = new Math3D({ WIN });
    let scene = [new Sphere({})];

    const Graph = useGraph(renderScene);
    let graph = null;

    useEffect(() => {
        graph = Graph({
            id: 'canvas3d',
            WIN,
            width: 500,
            height: 500,
            callbacks: {
                wheel,
                mouseup,
                mousedown,
                mousemove,
                mouseleave
            }
        });

        const interval = setInterval(() => scene.forEach(figure => {
            figure.doAnimation(math3D);
        }, 10));

        return () => {
            clearInterval(interval);
            graph = null;
        }
    }, [useGraph, renderScene, graph, Graph, clearInterval]);

    const wheel = (event) => {
        const delta = 1 + event.wheelDelta / 1200;
        scene.forEach(figure => {
            const matrix = math3D.zoom(delta);
            figure.points.forEach(point => {
                math3D.transform(matrix, point);
            });
            math3D.transform(matrix, LIGHT);
        });
    }
    const mousedown = () => {
        settings.canRotate = true;
    }
    const mouseup = () => {
        settings.canRotate = false;
    }
    const mouseleave = () => {
        settings.canRotate = false;
    }
    const mousemove = (event) => {
        if (settings.canRotate) {
            const { movementX, movementY } = event;
            scene.forEach(figure => {
                const OYmatrix = math3D.rotateOY(movementX / 180);
                const OXmatrix = math3D.rotateOX(movementY / 180);
                figure.points.forEach(point => {
                    math3D.transform(OYmatrix, point);
                    math3D.transform(OXmatrix, point);
                });
                math3D.transform(OYmatrix, LIGHT);
                math3D.transform(OXmatrix, LIGHT);
            });
        }
    }

    const updateScene = (figure) => {
        scene = [figure];
    }

    const togglePoints = (value) => {
        settings.showPoints = value;
    }

    const toggleEdges = (value) => {
        settings.showEdges = value;
    }

    const togglePolygons = (value) => {
        settings.showPolygons = value;
    }

    function renderScene(OutFPS) {
        if (!graph) return;
        graph.clear();

        const polygons = [];
        let ignoreVectorProduct = false;

        scene.forEach(figure => {
            if (figure.disableOptimization) {
                ignoreVectorProduct = true;
            }
        });


        for (let i = 0; i < scene.length; i++) {
            scene[i].polygons.forEach(polygon => {
                polygon.figureIndex = i;
                polygons.push(polygon);
            });
        }

        scene.forEach(figure => {
            math3D.calcCenters(figure);
            math3D.calcRadius(figure);
            math3D.calcDistance(figure, WIN.CAMERA, 'distance');
            math3D.calcDistance(figure, LIGHT, 'lumen');
            math3D.calcNormals(figure);

        });

        math3D.sortByArtistAlgorithm(polygons);

        if (settings.showPolygons) {
            polygons.forEach(polygon => {
                const points = [];
                for (let i = 0; i < polygon.points.length; i++) {
                    points.push(scene[polygon.figureIndex].points[polygon.points[i]]);
                }
                const cameraVector = math3D.calcVector(WIN.CAMERA, polygon.center);
                const product = math3D.calcDotProduct(cameraVector, polygon.normal)
                if (ignoreVectorProduct || product >= 0) {
                    let { r, g, b } = polygon.color;
                    const dark = math3D.calcShadow(polygon, scene, LIGHT);
                    const lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen * dark);
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);

                    graph.polygon(
                        points.map(point => {
                            return {
                                x: math3D.xs(point),
                                y: math3D.ys(point)
                            }
                        }), polygon.rgbToHex(r, g, b));
                }
            });
        }

        scene.forEach(figure => {

            if (settings.showEdges) {
                figure.edges.forEach(edge => {
                    const p1 = figure.points[edge.p1];
                    const p2 = figure.points[edge.p2];
                    graph.line(
                        math3D.xs(p1),
                        math3D.ys(p1),
                        math3D.xs(p2),
                        math3D.ys(p2),
                        '#bbbbbb',
                        1.5
                    );
                });
            }

            if (settings.showPoints) {
                figure.points.forEach(point => {
                    graph.point(
                        math3D.xs(point),
                        math3D.ys(point),
                        '#eeeeee',
                        2
                    );
                });
            }
        })

        if (settings.showLight){

            graph.point(
                math3D.xs(LIGHT),
                math3D.ys(LIGHT),
                '#ffffff',
                1.25
            );
        }

        graph.text(WIN.LEFT, 9.25, OutFPS);
        graph.render();
    }

    return (<div className="Graph3D">
        <canvas id="canvas3d"></canvas>
        <Graph3DUI
            settings={settings}
            togglePoints={togglePoints}
            toggleEdges={toggleEdges}
            togglePolygons={togglePolygons}
            updateScene={updateScene}
        />
    </div>)
}

export default Graph3D;