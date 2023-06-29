/** @Author: Edwise
  * @Date: 2021-07-12 23:08:50
  * @Last Modified by:   Edwise
  * @Last Modified time: 2021-07-12 23:08:50  
**/
import { Vector } from "./Vector";
export class OBB {
    centerPoint;
    extents;
    axes;
    w;
    h;
    rotation;

    constructor(cenerPoint, w, h, r) {
        let radius = r * Math.PI / 180;
        this.centerPoint = cenerPoint;
        this.extents = [w / 2, h / 2];
        this.axes = [new Vector(Math.cos(radius), Math.sin(radius)), new Vector(-1 * Math.sin(radius), Math.cos(radius))];

        this.w = w;
        this.h = h;
        this.rotation = r;
    }

    getProjectionRadius(axis) {
        return this.extents[0] * Math.abs(Vector.dot(axis, this.axes[0])) + this.extents[1] * Math.abs((Vector.dot(axis, this.axes[1])));
    }
}

export function detectorOBBvsOBB(OBB1, OBB2) {
    var nv = Vector.sub(OBB1.centerPoint, OBB2.centerPoint);
    var axisA1 = OBB1.axes[0];
    if (OBB1.getProjectionRadius(axisA1) + OBB2.getProjectionRadius(axisA1) <= Math.abs(Vector.dot(nv, axisA1))) return false;
    var axisA2 = OBB1.axes[1];
    if (OBB1.getProjectionRadius(axisA2) + OBB2.getProjectionRadius(axisA2) <= Math.abs(Vector.dot(nv, axisA2))) return false;
    var axisB1 = OBB2.axes[0];
    if (OBB1.getProjectionRadius(axisB1) + OBB2.getProjectionRadius(axisB1) <= Math.abs(Vector.dot(nv, axisB1))) return false;
    var axisB2 = OBB2.axes[1];
    if (OBB1.getProjectionRadius(axisB2) + OBB2.getProjectionRadius(axisB2) <= Math.abs(Vector.dot(nv, axisB2))) return false;
    return true;

}