/**
 * Created with JetBrains PhpStorm.
 * User: dsgrigoryev
 * Date: 19.08.13
 * Time: 20:24
 * To change this template use File | Settings | File Templates.
 */

/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.position = position; //this.position[] = position;
    this.capacity = capacity;
    this.cargoWeight = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */

Vessel.prototype.report = function () {
    return 'Корабль "' + this.name + '". Местоположение: ' + this.position.toString() + '. ' +  (this.cargoWeight == 0 ? 'Товаров нет. ' : 'Занято  ' + this.cargoWeight + ' из ' + this.capacity + ' т.');
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */

Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.cargoWeight;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */

Vessel.prototype.getOccupiedSpace = function () {
    return this.cargoWeight;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */

Vessel.prototype.flyTo = function (newPosition) {
    this.position = newPosition;
}
/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */

function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */

Planet.prototype.report = function () {
    return 'Планета "'+this.name + '". Местоположение: ' + this.position.toString() + '. ' +  (this.availableAmountOfCargo == 0 ? 'Грузов нет. ' : 'Доступно грузов: ' + this.getAvailableAmountOfCargo() + ' т.');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */

Planet.prototype.getAvailableAmountOfCargo = function () {
    return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */

Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    vessel.flyTo(this.position); // Приземляемся
    var freeSpace = vessel.getFreeSpace();
    if( freeSpace >= cargoWeight){
        vessel.cargoWeight += cargoWeight;
        this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
        //alert('vessel.cargoWeight=' + vessel.cargoWeight)
    }
    else {
        // Сообщаем о невозможности загрузки, так как не хватает места. Либо загружаем только в свободную часть.
        alert('Не возможно загрузить груз, так как нехватает места');
    }
}
/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    vessel.flyTo(this.position); // Приземляемся
    if(vessel.cargoWeight < cargoWeight){
        // Сообщаем о невозможности выгрузки
        alert('Не возможно выгрузить больше чем есть на борту');
    }
    else{
        vessel.cargoWeight = vessel.cargoWeight - cargoWeight; // Выгружаем из корабля
        this.availableAmountOfCargo += cargoWeight; // Выгрузили на планету
    }
}
