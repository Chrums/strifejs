import Component from '@core/Component';
import Entity from '@core/Entity';

export default class Hierarchy extends Component {
    
    public parent?: Entity;
    public children: Entity[] = [];
    
    public move(target?: Entity): void {
        if (this.parent == target) return;
        if (this.parent) {
            const hierarchy = this.parent.components.get(Hierarchy);
            if (hierarchy) hierarchy.removeChild(this.entity);
        }
        if (target) {
            const hierarchy = target.components.get(Hierarchy);
            if (hierarchy) hierarchy.addChild(this.entity);
        }
        this.parent = target;
    }
    
    private addChild(child: Entity): void {
        this.children.push(child);
    }
    
    private removeChild(child: Entity): void {
        const index = this.children.indexOf(child);
        if (index) this.children.splice(index, 1);
    }
    
}