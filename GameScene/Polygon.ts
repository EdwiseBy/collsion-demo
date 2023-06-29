/** @Author: Edwise
  * @Date: 2021-07-12 23:08:31
 * @Last Modified by: Edwise
 * @Last Modified time: 2021-07-13 22:37:35
**/

import { Vector } from "./Vector";
export class Polygon extends FYGE.Graphics {
    constructor() {
        super();
        this.initView();
    }
    _path: Vector[];    //路径
    controlPoint: FYGE.Graphics;   //控制点

    get path() { return this._path }
    set path(p) { this._path = p }

    /**初始化试图 */
    initView() {
        this.controlPoint = this.addChild(new FYGE.Graphics)
            .beginFill(0x66ccff)
            .drawCircle(0, 0, 30)
            .endFill();
    }

    /**画多边形，这里使用画线段的方法来画 */
    draw(color, path) {
        this.clear();
        this.lineStyle(4, color)
        for (let i = 0; i < path.length; i++) {
            let curP = path[i];
            let nextP = i == path.length - 1 ? path[0] : path[i + 1];
            this.moveTo(curP.x, curP.y);
            this.lineTo(nextP.x, nextP.y);
        }
        this.endFill();
        this._path = path;
    }

    /**获得多边形的边，这里使用路径点的坐标来求有向线段的向量，终点-起点 */
    getSides() {
        let _path = this.path,
            len = _path.length,
            sides = [],
            pre = _path[0]
        if (len >= 3) {
            for (let i = 1; i < len; i++) {
                let cur = _path[i];
                sides.push(Vector.sub(cur, pre));
                pre = cur;
            }
            sides.push(Vector.sub(_path[0], _path[len - 1]));
        }
        return sides;
    }

    /**获取每一个路径的当前坐标 */
    getRootCoord() {
        let _path = this.path, readlPath = [];
        for (let i = 0; i < _path.length; i++) {
            readlPath.push(new Vector(_path[i].x + this.x, _path[i].y + this.y));
        }
        return readlPath;
    }

    /**获取投影 */
    getProjection(axis:Vector) {
        let path = this.getRootCoord(), min = null, max = null;
        for (let i = 0, l = path.length; i < l; i++) {
            let p = path[i];
            let pro = Vector.dot(p, axis) / axis.length();
            if (min === null || pro < min) {
                min = pro;
            }
            if (max === null || pro > max) {
                max = pro;
            }
        }
        return { min: min, max: max };
    }


}