/** @Author: Edwise
  * @Date: 2021-07-12 23:08:47
  * @Last Modified by:   Edwise
  * @Last Modified time: 2021-07-12 23:08:47  
**/
import { detectorOBBvsOBB, OBB } from "./OBB";
import { Vector } from "./Vector";

//旋转矩形碰撞demo场景
export class RotateRectCollsion extends FYGE.Container {
    rect1: FYGE.Graphics;
    rect2: FYGE.Graphics;
    constructor() {
        super();
        this.initScene();
    }

    /**初始化场景 */
    initScene() {
        let rect1: FYGE.Graphics = new FYGE.Graphics();
        rect1.beginFill(0xffffff);
        rect1.drawRect(0, 0, 150, 210);
        rect1.endFill();
        rect1.x = 0;
        rect1.y = 300;
        rect1.anchorX = rect1.width >> 1;
        rect1.anchorY = rect1.height >> 1;
        this.rect1 = this.addChild(rect1);
        FYGE.Tween.get(this.rect1, { loop: true }).to({ x: 500, rotation: 1000 }, 3000).to({ x: 0, rotation: 0 }, 3000);


        let rect2: FYGE.Graphics = new FYGE.Graphics();
        rect2.beginFill(0x666);
        rect2.drawRect(0, 0, 210, 150);
        rect2.endFill();
        rect2.x = 550;
        rect2.y = 300;
        rect2.anchorX = rect2.width >> 1;
        rect2.anchorY = rect2.height >> 1;
        this.rect2 = this.addChild(rect2);
        FYGE.Tween.get(this.rect2, { loop: true }).to({ x: 0, rotation: 1000 }, 3000).to({ x: 550, rotation: 0 }, 3000);
        this.addEventListener(FYGE.Event.ENTER_FRAME, this.updateScene, this);
    }

    /**更新场景 */
    updateScene() {
        if (!this.visible) return;
        let rect1 = this.rect1;
        let rect2 = this.rect2;
        let obb1 = new OBB(new Vector(rect1.x + rect1.width * 0.5, rect1.y + rect1.height * 0.5), rect1.width, rect1.height, rect1.rotation);
        let obb2 = new OBB(new Vector(rect2.x + rect2.width * 0.5, rect2.y + rect2.height * 0.5), rect2.width, rect2.height, rect2.rotation);
        if (detectorOBBvsOBB(obb1, obb2)) {
            this.changeColor(true)
            return;
        }
        this.changeColor(false)
    }

    /**变换颜色 */
    changeColor(isCollsion) {
        let rect1 = this.rect1;
        let rect2 = this.rect2;
        let rect1Color = [0xffffff, 0xcc0000];
        let rect2Color = [0x666, 0x33ff99];
        let index = 0;
        if (isCollsion) {
            index = 1;
        }
        let color1 = rect1Color[index];
        let color2 = rect2Color[index];

        rect1.clear();
        rect1.beginFill(color1);
        rect1.drawRect(0, 0, 150, 210);
        rect1.endFill();
        rect2.clear();
        rect2.beginFill(color2);
        rect2.drawRect(0, 0, 210, 150);
        rect2.endFill();
    }
}