import Entity from '@core/Entity';
import System from '@core/System';
import Scene, { EntityAddedEvent, EntityRemovedEvent } from '@core/Scene';

import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';

export default class Core extends System {
    
    public constructor(scene: Scene) {
        super(scene);
        this.scene.dispatcher.on(EntityAddedEvent)(this.entityAdded.bind(this));
        this.scene.dispatcher.on(EntityRemovedEvent)(this.entityRemoved.bind(this));
    }
    
    public entityAdded(event: EntityAddedEvent): void {
        if (event.entity) {
            event.entity.components.add(Hierarchy);
            event.entity.components.add(Transform);
        }
    }
    
    public entityRemoved(event: EntityRemovedEvent): void {
        if (event.entity) {
            const hierarchy = event.entity.components.get(Hierarchy);
            if (hierarchy) {
                hierarchy.move();
                hierarchy.children.forEach((child: Entity) => this.scene.entities.remove(child));
            }
        }
    }
    
}