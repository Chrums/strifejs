import Component, { IComponent } from '@core/Component';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';

class Components {
    
    private entity: Entity;
    
    public constructor(entity: Entity) {
        this.entity = entity;
    }
    
    public add<C extends Component>(type: IComponent<C>): C {
        return this.entity.scene.components.add(type)(this.entity);
    }
    
    public remove<C extends Component>(type: IComponent<C>): boolean {
        return this.entity.scene.components.remove(type)(this.entity);
    }
    
    public get<C extends Component>(type: IComponent<C>): Optional<C> {
        return this.entity.scene.components.get(type)(this.entity);
    }
    
}

export default class Entity extends Unique {
    
    public scene: Scene;
    public components: Components = new Components(this);
    
    public get hierarchy(): Hierarchy {
        return this.components.get(Hierarchy) as Hierarchy;
    }
    
    public get transform(): Transform {
        return this.components.get(Transform) as Transform;
    }
    
    public constructor(scene: Scene) {
        super();
        this.scene = scene;
    }
    
}