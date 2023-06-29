/** @Author: Edwise
  * @Date: 2021-07-13 09:43:58
 * @Last Modified by: Edwise
 * @Last Modified time: 2021-07-13 22:39:51
**/
import { Const } from "./Const";
import { Polygon } from "./Polygon";
import { Vector } from "./Vector";

export class SeparatingAxisCollsion extends FYGE.Container {
    private polygon1: Polygon;
    private polygon2: Polygon;
    private noCollsionColor = 0x333333;
    private collsionColor = 0xFF0000;
    private draggingObj: Polygon;

    constructor() {
        super();
        this.initScene();
    }

    /**初始化场景 */
    initScene() {
        this.polygon1 = this.addChild(new Polygon());
        this.drawPolyGon(false, this.getPolygonPath(7, 100), this.polygon1)
        this.polygon1.x = 100;
        this.polygon1.y = 300;

        this.polygon2 = this.addChild(new Polygon());
        this.drawPolyGon(false, this.getPolygonPath(6, 100), this.polygon2)
        this.polygon2.x = 500;
        this.polygon2.y = 300;

        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.mouseDown, this)
        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.mouseMove, this)
        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_UP, this.mouseUp, this)
        this.addEventListener(FYGE.Event.ENTER_FRAME, this.updateScene, this)
    }

    updateScene() {
        if (!this.visible) return;
        if (this.polygonsCollisionTest(this.polygon1, this.polygon2)) {
            this.drawPolyGon(true, this.polygon1.path, this.polygon1);
            this.drawPolyGon(true, this.polygon2.path, this.polygon2);
            console.log("aaaa")
            return;
        }
        this.drawPolyGon(false, this.polygon1.path, this.polygon1);
        this.drawPolyGon(false, this.polygon2.path, this.polygon2);
    }

    /**绘制多边形
     * @param isCollsion 是否碰撞
     * @param path 路径，vector[]
     * @param polygon 多边形实例
     */
    drawPolyGon(isCollsion: boolean, path: Vector[], polygon: Polygon) {
        let color = this.noCollsionColor;

        if (isCollsion) {
            color = this.collsionColor;
        }

        //写完了才发现根本不用point，全用vector完事
        // let _path;
        // if (path instanceof Vector || Array.isArray(path)) {
        //     _path = this.VectorToPoint(path);
        // } else {
        //     _path = path;
        // }
        polygon.draw(color, path);
    }

    /**获取多边形路径,这里是投机取巧，直接用规则多边形加了点随机数，先这么着吧，反正我们这次的重点是看碰撞 */
    getPolygonPath(cnt, r) {
        let base = 0, angle = 360 / cnt, ata = Math.PI / 180, path = new Array();
        for (let i = 0; i < cnt; i++) {
            let x = Math.cos(base * ata) * (r + Math.floor(Math.random() * 100 + 40)),
                y = Math.sin(base * ata) * (r + Math.floor(Math.random() * 100 + 40));
            path.push(new Vector(x, y));
            base += angle;
        }
        return path;
    }

    /**把vector转换为point，不要在意，vector类是我之前写的类，直接cv过来了
     * 然后发现好像没啥用，我根本没用point
     */
    VectorToPoint(v: Vector | Vector[]) {
        if (Array.isArray(v)) {
            let list: FYGE.Point[] = [];
            v.forEach((v, idx) => {
                list.push(new FYGE.Point(v.x, v.y))
            })
            return list;
        }
        return new FYGE.Point(v.x, v.y)
    }

    /**触摸按下 */
    mouseDown(e: FYGE.MouseEvent) {
        if (this.isInCircle(e.stageX, e.stageY, this.polygon1)) {
            this.draggingObj = this.polygon1;
        }
        if (this.isInCircle(e.stageX, e.stageY, this.polygon2)) {
            this.draggingObj = this.polygon2;
        }
    }

    /**触摸移动 */
    mouseMove(e: FYGE.MouseEvent) {
        if (this.draggingObj) {
            this.draggingObj.x = e.stageX;
            this.draggingObj.y = e.stageY;
        }
    }

    /**触摸抬起 */
    mouseUp(e: FYGE.MouseEvent) {
        this.draggingObj = null;
    }

    /**点是否在圆内 */
    isInCircle(x, y, polygon) {
        let dx = polygon.x - x
        let dy = polygon.y - y
        return dx * dx + dy * dy <= 30 * 30
    }

    /**利用投影判断碰撞 */
    polygonsCollisionTest(polygon1: Polygon, polygon2: Polygon) {
        let sides = polygon1.getSides().concat(polygon2.getSides());
        let axises = [];
        for (let j = 0, l = sides.length; j < l; j++) {
            axises.push(sides[j].normL());
        }
        for (let i = 0, len = axises.length; i < len; i++) {
            let axis = axises[i];

            let proA = polygon1.getProjection(axis),
                proB = polygon2.getProjection(axis);

            if (this.isCollsion(proA, proB)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 这里就是判断碰撞了，投影的最大值与最小值两段相减再与总值相比，即可求得了！
     */
    isCollsion(proA, proB) {
        let min, max;
        if (proA.min < proB.min) min = proA.min;
        else min = proB.min;
        if (proA.max > proB.max) max = proA.max;
        else max = proB.max;
        return (proA.max - proA.min) + (proB.max - proB.min) < max - min;
    }
}