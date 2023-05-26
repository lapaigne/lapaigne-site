import React, { useCallback, useState } from "react";

const Graph3DUI = ({ options, togglePoints, toggleEdges, togglePolygons }) => {
    const [showPanel, setShowPanel] = useState(false);


    //переименовать в handler
    const togglePanel = useCallback(() => setShowPanel(!showPanel),
        [setShowPanel, showPanel]
    );

    return (<div className="Graph3DUI">
        <button onClick={togglePanel}>{showPanel ? '<<' : '>>'}</button>
        {
            showPanel && <div>
                <input id="points-checkbox" type="checkbox" onClick={(event) => togglePoints(event.target.checked)} />
                <input id="edges-checkbox" type="checkbox" onClick={(event) => toggleEdges(event.target.checked)} />
                <input id="polygons-checkbox" type="checkbox" onClick={(event) => togglePolygons(event.target.checked)} />
            </div>
        }
        <label htmlFor="points-checkbox">точки</label>
        <label htmlFor="edges-checkbox">ребра</label>
        <label htmlFor="polygons-checkbox">полигоны</label>
    </div>)
}
export default Graph3DUI;