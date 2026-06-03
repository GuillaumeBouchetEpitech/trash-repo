

export class Entity {
  public clientId: string;
  public posX!: number;
  public posY!: number;
  public speedX!: number;
  public speedY!: number;

  constructor(
    clientId: string,
    posX: number,
    posY: number,
  ) {
    this.clientId = clientId;
    this.reset(posX, posY);
  }

  reset(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = 0;
    this.speedY = 0;
  }

  setSpeedX(speedX: number) {
    this.speedX = speedX;
  }
  setSpeedY(speedY: number) {
    this.speedY = speedY;
  }

  update(elapsedTime: number) {
    this.posX += this.speedX * elapsedTime;
    this.posY += this.speedY * elapsedTime;
  }
}

export class EntitiesManager {

  private _allEntities: Entity[] = [];

  constructor() {
  }

  ensureEntity(clientId: string, posX: number, posY: number): Readonly<Entity> {
    let existing = this.findEntity(clientId);
    if (existing) {
      existing.reset(posX, posY);
    } else {
      existing = new Entity(clientId, posX, posY)
      this._allEntities.push(existing);
    }
    return existing;
  }

  removeEntity(clientId: string): void {
    const index = this._allEntities.findIndex((val) => val.clientId === clientId);
    if (index >= 0) {
      this._allEntities.splice(index, 1);
    }
  }

  findEntity(clientId: string): Readonly<Entity> | undefined {
    const index = this._allEntities.findIndex((val) => val.clientId === clientId);
    if (index >= 0) {
      return this._allEntities[index];
    }
  }

  get entities(): ReadonlyArray<Readonly<Entity>> {
    return this._allEntities;
  }

}
