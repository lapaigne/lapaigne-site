import React, { useEffect, useRef, useState } from "react";
import Math3D, { Point, Edge, Polygon, Vector, Light, Cone, Cube, Cylinder, Ellipsoid, Sphere, Toroid } from "../../modules/Math3D";
import Graph3DUI from "./Graph3DUI";
import useGraph from "../hooks/useGraph";
// import './Graph3D.scss';

const Graph3D = () => {
    const settings = {
        pointsVisible: false,
        edgesVisible: false,
        polygonsVisible: true,
        canRotate: false
    }
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        FOCUS: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 50)
    };
    const LIGHT = new Light(-20, 0, 10, 5e3);
    const math3D = new Math3D({ WIN });
    const scene = [new Sphere({ segments: 40 })];

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
            figure.points.forEach(point => {
                const matrix = math3D.zoom(delta);
                math3D.transform(matrix, point);
            });
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
                figure.points.forEach(point => {
                    const OYmatrix = math3D.rotateOY(movementX / 180);
                    const OXmatrix = math3D.rotateOX(movementY / 180);
                    math3D.transform(OYmatrix, point);
                    math3D.transform(OXmatrix, point);
                });
            });
        }
    }


    const togglePoints = (value) => {
        settings.pointsVisible = value;
    }
    const toggleEdges = (value) => {
        settings.edgesVisible = value;
    }
    const togglePolygons = (value) => {
        settings.polygonsVisible = value;
    }

    function renderScene(OutFPS) {
        if (graph == null) return;
        graph.clear();

        const polygons = [];

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

        if (settings.polygonsVisible) {
            polygons.forEach(polygon => {
                const points = [];
                for (let i = 0; i < polygon.points.length; i++) {
                    points.push(scene[polygon.figureIndex].points[polygon.points[i]]);
                }
                const cameraVector = math3D.calcVector(WIN.CAMERA, polygon.center);
                const product = math3D.calcDotProduct(cameraVector, polygon.normal)
                if (product > 0) {
                    let { r, g, b } = polygon.color;
                    const dark = math3D.calcShadow(polygon, scene, LIGHT);
                    const lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen
                        * dark
                    );
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);

                    const color = polygon.rgbToHex(r, g, b);

                    graph.polygon(
                        points.map(point => {
                            return {
                                x: math3D.xs(point),
                                y: math3D.ys(point)
                            }
                        }), color);
                }
            });
        }

        scene.forEach(figure => {

            if (settings.edgesVisible) {
                figure.edges.forEach(edge => {
                    const p1 = figure.points[edge.p1];
                    const p2 = figure.points[edge.p2];
                    graph.line(
                        math3D.xs(p1),
                        math3D.ys(p1),
                        math3D.xs(p2),
                        math3D.ys(p2),
                        '#bbb',
                        1.5
                    );
                });
            }

            if (settings.pointsVisible) {
                figure.points.forEach(point => {
                    graph.point(
                        math3D.xs(point),
                        math3D.ys(point),
                        '#eee',
                        2
                    );
                });
            }
        })

        graph.text(WIN.LEFT, 9.25, OutFPS);
        // const center = new Point();
        // graph.point(
        //     math3D.xs(center),
        //     math3D.ys(center),
        // '#fff', 1)
        graph.render();
    }

    return (<div className="Graph3D">
        <canvas id="canvas3d"></canvas>
        <Graph3DUI
            options={settings}
            togglePoints={(value) => togglePoints(value)}
            toggleEdges={(value) => toggleEdges(value)}
            togglePolygons={(value) => togglePolygons(value)}
        />
    </div>)
}

export default Graph3D;