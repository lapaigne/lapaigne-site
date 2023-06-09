import React, { useCallback, useState } from "react";

import MyCheckbox from "../MyCheckbox/MyCheckbox";
import {
    Cone,
    Cube,
    Ellipsoid,
    EllipticalCylinder,
    EllipticalParaboloid,
    HyperbolicCylinder,
    HyperbolicParaboloid,
    OneSheetedHyperboloid,
    ParabolicCylinder,
    Sphere,
    Toroid,
    TwoSheetedHyperboloid,

} from "../../modules/Math3D";

const Graph3DUI = ({ settings, togglePoints, toggleEdges, togglePolygons, updateScene }) => {
    const figures = {
        Cube: new Cube({}),
        Sphere: new Sphere({}),
        Cone: new Cone({}),
        Ellipsoid: new Ellipsoid({}),
        Toroid: new Toroid({}),
        EllipticalCylinder: new EllipticalCylinder({}),
        EllipticalParaboloid: new EllipticalParaboloid({}),
        OneSheetedHyperboloid: new OneSheetedHyperboloid({}),
        TwoSheetedHyperboloid: new TwoSheetedHyperboloid({}),
        ParabolicCylinder: new ParabolicCylinder({}),
        HyperbolicCylinder: new HyperbolicCylinder({}),
        HyperbolicParaboloid: new HyperbolicParaboloid({}),
    }

    const [showPanel, setShowPanel] = useState(false);

    const togglePanel = useCallback(() => setShowPanel(!showPanel),
        [setShowPanel, showPanel]
    );

    const selectFigure = useCallback((event) => {
        updateScene(figures[event.target.value]);
    })

    return (
        <div className="Graph3DUI">
            <button onClick={togglePanel}>{showPanel ? '<<' : '>>'}</button>
            {
                showPanel && (<div>
                    <MyCheckbox text='точки' checked={settings.showPoints} onClick={togglePoints} />
                    <MyCheckbox text='ребра' checked={settings.showEdges} onClick={toggleEdges} />
                    <MyCheckbox text='полигоны' checked={settings.showPolygons} onClick={togglePolygons} />
                </div>)
            }
            <div>
                <select onChange={selectFigure}>
                    {
                        Object.keys(figures).map((key, index) => (
                            <option key={index} className="figure-option" value={key}>
                                {key}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>)
}
export default Graph3DUI;