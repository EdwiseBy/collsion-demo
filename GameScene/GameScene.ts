/** @Author: Edwise
  * @Date: 2021-07-12 23:08:57
 * @Last Modified by: 
 * @Last Modified time: 2022-05-18 17:04:53
**/

import { CollsionTest } from "./CollsionTest";
import { Const } from "./Const";
import { RES } from "./GameCfg";
import { GUtils } from "./GUtils";
import { RotateRectCollsion } from "./RotateRectCollsion";
import { SeparatingAxisCollsion } from "./SeparatingAxisCollsion";
export class GameScene extends FYGE.Container {
    private rotateRectScene: RotateRectCollsion;
    private separatingAxisScene: SeparatingAxisCollsion;
    private CollsionTest: CollsionTest;
    private changeLabel: FYGE.TextField;
    constructor() {
        super();
        this.initGame();
    }

    /** 初始化游戏 */
    initGame() {
        this.rotateRectScene = this.addChild(new RotateRectCollsion());
        this.rotateRectScene.visible = false;

        this.separatingAxisScene = this.addChild(new SeparatingAxisCollsion());
        this.separatingAxisScene.visible = false;

        this.CollsionTest = this.addChild(new CollsionTest());
        this.CollsionTest.visible = true;

        let label = new FYGE.TextField();
        label.textWidth = 400;
        label.textAlign = FYGE.TEXT_ALIGN.CENTER;
        label.x = (Const.stage.stageWidth - 400) >> 1;
        label.y = 900;
        label.text = '多边形'
        label.fillColor = '0x66ccff'
        label.size = 60;
        label.visible = false;
        this.changeLabel = this.addChild(label);
        this.changeLabel.addEventListener(FYGE.MouseEvent.CLICK, this.changeScene, this)
    }

    changeScene() {
        if (this.changeLabel.text == '多边形') {
            this.rotateRectScene.visible = false;
            this.separatingAxisScene.visible = true;
            this.changeLabel.text = "旋转矩形"
        } else if (this.changeLabel.text == '圆矩形') {
            this.rotateRectScene.visible = true;
            this.separatingAxisScene.visible = false;
            this.changeLabel.text = "多边形"
        }
        else {
            this.rotateRectScene.visible = true;
            this.separatingAxisScene.visible = false;
            this.changeLabel.text = "多边形"
        }
    }


}