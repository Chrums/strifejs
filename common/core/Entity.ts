import Entity from '@core/Entity';

import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';

export default class extends Entity {
    
    public get hierarchy(): Hierarchy {
        return this.components.get(Hierarchy) as Hierarchy;
    }
    
    public get transform(): Transform {
        return this.components.get(Transform) as Transform;
    }
    
}