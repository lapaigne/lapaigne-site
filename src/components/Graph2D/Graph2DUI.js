// import React, { useState } from "react";

// import MyCheckbox from "../../components/MyCheckbox/MyCheckbox";

// const Graph2DUI = () =>
// {
//         this.showHidePoints = props.showHidePoints;
//         this.state = { showPanel: false };

//     const [showPanel, setShowPanel] = useState(false);
// return (
//     <div>
//         <button onClick={() => this.showHidePanel()}>{showPanel ? '<-' : '->'}</button>
//         {showPanel && (
//             <>
//                 <MyCheckbox
//                     text={'Показывать нули функции'}
//                     checked={false}
//                     onClick={(checked) => showHidePoints(checked)}
//                 />
//                 <MyCheckbox
//                     text={'Показывать производную'}
//                     checked={false}
//                     onClick={(checked) => showHideEdges(checked)}
//                 />
//                 <input className="GraphName" placeholder="Функция"></input>
//             </>
// )}
//     </div>
// );}
// export default Graph2DUI;