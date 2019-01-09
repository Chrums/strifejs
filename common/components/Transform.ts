import Matrix4 from '@math/Matrix4';
import Quaternion from '@math/Quaternion';
import Vector3 from '@math/Vector3';

import Component from '@core/Component';
import Entity from '@core/Entity';

export default class Transform extends Component {
    
    public data: Matrix4 = new Matrix4();
    
    public rotate(r: Quaternion): Transform {
        this.data.rotate(r);
        return this;
    }
    
    public translate(t: Vector3): Transform {
        this.data.translate(t);
        return this;
    }
    
    public scale(s: Vector3): Transform {
        this.data.scale(s);
        return this;
    }
    
}