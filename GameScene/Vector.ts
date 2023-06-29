/** @Author: Edwise
  * @Date: 2021-07-12 23:08:43
 * @Last Modified by: Edwise
 * @Last Modified time: 2021-07-13 22:27:15
**/
export class Vector {
    x;
    y;

    constructor(x: number, y:number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**相减 */
    static sub(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**点积 */
    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**法向量 */
    normL() {
        return new Vector(this.y, -this.x);
    }

    /**长度 */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}