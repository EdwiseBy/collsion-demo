import { Const } from "./Const";

export class CollsionTest extends FYGE.Container {
    private noCollsionColor = 0x333333;
    private collsionColor = 0xFF0000;
    private draggingObj: FYGE.Graphics;
    private circle: FYGE.Graphics;
    private rect: FYGE.Graphics;
    private text: FYGE.TextField;

    constructor() {
        super();
        this.initScene();
    }

    /**初始化场景 */
    initScene() {
        this.circle = new FYGE.Graphics();
        this.addChild(this.circle);
        this.circle.mouseEnable = true;
        this.circle.mouseChildren = true;
        this.circle.beginFill(0x66ccff);
        this.circle.drawCircle(0, 0, 50);
        this.circle.endFill();
        this.rect = new FYGE.Graphics();
        this.addChild(this.rect);
        this.rect.mouseEnable = true;
        this.rect.mouseChildren = true;
        this.rect.beginFill(0x8899ff);
        this.rect.drawRect(-100, -50, 200, 100);
        this.rect.endFill();
        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.mouseDown, this)
        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.mouseMove, this)
        Const.stage.addEventListener(FYGE.MouseEvent.MOUSE_UP, this.mouseUp, this)
        this.addEventListener(FYGE.Event.ENTER_FRAME, this.updateScene, this)

    }

    updateScene() {
        if (!this.visible) return;
        if (this.rectCollsionCircle(this.circle.x, this.circle.y, 50, this.rect.x, this.rect.y, this.rect.width, this.rect.height)) {
            // console.log('碰撞了')
        } else {
            // console.log('没碰撞')
        }
    }

    rectCollsionCircle(xr, yr, r, x, y, w, h) {
        //矩形左上角的坐标
        let x1 = x - w / 2;
        let y1 = y - h / 2;
        let p1 = new FYGE.Point(x1, y1);
        let p2 = new FYGE.Point(x1 + w, y1);
        let p3 = new FYGE.Point(x1 + w, y1 + h);
        let p4 = new FYGE.Point(x1, y1 + h);
        let pr = new FYGE.Point(xr, yr);
        let rect = new FYGE.Rectangle(x1, y1, w, h);
        //以矩形为基准，在上方设置一个宽为矩形的宽，高为圆半径的矩形数据
        let rectTop = new FYGE.Rectangle(x1, y1 - r, w, r);
        //以矩形为基准，在下方设置一个宽为矩形的宽，高为圆半径的矩形数据
        let rectBottom = new FYGE.Rectangle(x1, y1 + h, w, r);
        //以矩形为基准，在左侧设置一个宽为圆半径，高为矩形的高的矩形数据
        let rectLeft = new FYGE.Rectangle(x1 - r, y1, r, h);
        //以矩形为基准，在右侧设置一个宽为圆半径，高为矩形的高的矩形数据
        let rectRight = new FYGE.Rectangle(x1 + w, y1, r, h);
        if (this.pointInRect(new FYGE.Point(xr, yr), rect) ||
            this.pointInRect(new FYGE.Point(xr, yr), rectTop) ||
            this.pointInRect(new FYGE.Point(xr, yr), rectBottom) ||
            this.pointInRect(new FYGE.Point(xr, yr), rectLeft) ||
            this.pointInRect(new FYGE.Point(xr, yr), rectRight) ||
            this.distance(p1, pr) < r || this.distance(p2, pr) < r || this.distance(p3, pr) < r || this.distance(p4, pr) < r
        ) {
            return true;
        }
        return false;

    }

    pointInRect(p: FYGE.Point, rect: FYGE.Rectangle) {
        return p.x >= rect.x && p.x <= rect.x + rect.width && p.y >= rect.y && p.y <= rect.y + rect.height;
    }

    distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
    }


    /**触摸按下 */
    mouseDown(e: FYGE.MouseEvent) {

        if (this.isInCircle(e.stageX, e.stageY, this.circle)) {
            this.draggingObj = this.circle;
        }
        if (this.isInCircle(e.stageX, e.stageY, this.rect)) {
            this.draggingObj = this.rect;
        }
    }
    /**点是否在圆内 */
    isInCircle(x, y, polygon) {
        let dx = polygon.x - x
        let dy = polygon.y - y
        return dx * dx + dy * dy <= 50 * 50
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
        console.log("?")
    }


}