export type Producer = {
    name: string;
    powerConsumption: number;
}

const drill: Producer = { name: "Drill", powerConsumption: 4 }
const oilPump: Producer = { name: "Oil Pump", powerConsumption: 20 }
const smelter: Producer = { name: "Smelter", powerConsumption: 4 }
const foundry: Producer = { name: "Foundry", powerConsumption: 16 }
const constructor: Producer = { name: "Constructor", powerConsumption: 4 }
const assembler: Producer = { name: "Assembler", powerConsumption: 15 }
const manufacturer: Producer = { name: "Manufacturer", powerConsumption: 55 }
const oilRefinery: Producer = { name: "Oil Refinery", powerConsumption: 50 }


export type OutputType = {
    name: string;
    productionRate: number;
    outputAmount: number;
    producedBy: Producer;
    inputTypes: { type: OutputType, amount: number }[];
}

const ironOre: OutputType = {
    name: "Iron Ore",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const copperOre: OutputType = {
    name: "Copper Ore",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const limestone: OutputType = {
    name: "Limestone",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const coal: OutputType = {
    name: "Coal",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const crudeOil: OutputType = {
    name: "Crude Oil",
    productionRate: 60,
    outputAmount: 1,
    producedBy: oilPump,
    inputTypes: []
}

const cateriumOre: OutputType = {
    name: "Caterium Ore",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const ironIngot: OutputType = {
    name: "Iron Ingot",
    productionRate: 30,
    outputAmount: 1,
    producedBy: smelter,
    inputTypes: [{type: ironOre, amount: 1}]
}

const ironPlate: OutputType = {
    name: "Iron Plate",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [{type: ironIngot, amount: 2}]
}

const ironRod: OutputType = {
    name: "Iron Rod",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [{type: ironIngot, amount: 1}]
}

const copperIngot: OutputType = {
    name: "Copper Ingot",
    productionRate: 30,
    outputAmount: 1,
    producedBy: smelter,
    inputTypes: [{type: copperOre, amount: 1}]
}

const wire: OutputType = {
    name: "Wire",
    productionRate: 15,
    outputAmount: 3,
    producedBy: constructor,
    inputTypes: [{type: copperIngot, amount: 1}]
}

const cable: OutputType = {
    name: "Cable",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [{type: wire, amount: 2}]
}


const concrete: OutputType = {
    name: "Concrete",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [{type: limestone, amount: 3}]
}

const screw: OutputType = {
    name: "Screw",
    productionRate: 90,
    outputAmount: 6,
    producedBy: constructor,
    inputTypes: [{type: ironRod, amount: 1}]
}

const reinforcedIronPlate: OutputType = {
    name: "Reinforced Iron Plate",
    productionRate: 5,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: screw, amount: 24},
        {type: ironPlate, amount: 4},
    ]
}

const rotor: OutputType = {
    name: "Rotor",
    productionRate: 6,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: screw, amount: 22},
        {type: ironRod, amount: 3},
    ]
}

const modularFrame: OutputType = {
    name: "Modular Frame",
    productionRate: 5,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: reinforcedIronPlate, amount: 3},
        {type: ironRod, amount: 6},
    ]
}

const steelIngot: OutputType = {
    name: "Steel Ingot",
    productionRate: 30,
    outputAmount: 2,
    producedBy: foundry,
    inputTypes: [
        {type: ironOre, amount: 3},
        {type: coal, amount: 3}
    ]
}

const steelBeam: OutputType = {
    name: "Steel Beam",
    productionRate: 10,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [
        {type: steelIngot, amount: 3},
    ]
}
const steelPipe: OutputType = {
    name: "Steel Pipe",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [
        {type: steelIngot, amount: 1},
    ]
}

const encasedIndustrialBeam: OutputType = {
    name: "Encased Industrial Beam",
    productionRate: 4,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: steelBeam, amount: 4},
        {type: concrete, amount: 5}
    ]
}

const stator: OutputType = {
    name: "Stator",
    productionRate: 6,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: steelPipe, amount: 3},
        {type: wire, amount: 10}
    ]
}

const motor: OutputType = {
    name: "Motor",
    productionRate: 5,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: rotor, amount: 2},
        {type: stator, amount: 2}
    ]
}

const heavyModularFrame: OutputType = {
    name: "Heavy Modular Frame",
    productionRate: 2,
    outputAmount: 1,
    producedBy: manufacturer,
    inputTypes: [
        {type: modularFrame, amount: 5},
        {type: steelPipe, amount: 15},
        {type: encasedIndustrialBeam, amount: 5},
        {type: screw, amount: 90}
    ]
}

const cateriurmIngot: OutputType = {
    name: "Caterium Ingot",
    productionRate: 15,
    outputAmount: 1,
    producedBy: smelter,
    inputTypes: [{type: cateriumOre, amount: 4}]

}

const quickWire: OutputType = {
    name: "Quickwire",
    productionRate: 15,
    outputAmount: 4,
    producedBy: constructor,
    inputTypes: [{type: cateriurmIngot, amount: 1}]
}

const plastic: OutputType = {
    name: "Plastic",
    productionRate: 7.5,
    outputAmount: 3,
    producedBy: oilRefinery,
    inputTypes: [{type: crudeOil, amount: 4}]
}

const rubber: OutputType = {
    name: "Rubber",
    //need to check this
    productionRate: 15,
    outputAmount: 4,
    producedBy: oilRefinery,
    inputTypes: [{type: crudeOil, amount: 4}]
}

const circuitBoard: OutputType = {
    name: "Circuit Board",
    productionRate: 5,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: wire, amount: 12},
        {type: plastic, amount: 6}
    ]
}

const computer: OutputType = {
    name: "Computer",
    //wtf?
    productionRate: 1.875,
    outputAmount: 1,
    producedBy: manufacturer,
    inputTypes: [
        {type: circuitBoard, amount: 5},
        {type: cable, amount: 12},
        {type: plastic, amount: 18},
        {type: screw, amount: 60}
    ]
}

const aiLimiter: OutputType = {
    name: "AI Limiter",
    productionRate: 5,
    outputAmount: 1,
    producedBy: assembler,
    inputTypes: [
        {type: circuitBoard, amount: 1},
        {type: quickWire, amount: 18}
    ]
}

const highSpeedConnector: OutputType = {
    name: "High Speed Connector",
    //wtf?
    productionRate: 2.5,
    outputAmount: 1,
    producedBy: manufacturer,
    inputTypes: [
        {type: quickWire, amount: 40},
        {type: cable, amount: 10},
        {type: plastic, amount: 6},
    ]
}


const superComputer: OutputType = {
    name: "Supercomputer",
    //wtf?
    productionRate: 1.875,
    outputAmount: 1,
    producedBy: manufacturer,
    inputTypes: [
        {type: computer, amount: 2},
        {type: aiLimiter, amount: 2},
        {type: plastic, amount: 21},
        {type: highSpeedConnector, amount: 3}
    ]
}


export const outputTypes: OutputType[] = [
    ironOre,
    ironIngot,
    ironPlate,
    ironRod,
    copperIngot,
    wire,
    cable,
    screw,
    limestone,
    concrete,
    reinforcedIronPlate,
    rotor,
    modularFrame,
    stator,
    motor,
    cateriumOre,
    cateriurmIngot,
    quickWire,
    plastic,
    rubber,
    circuitBoard,
    computer,
    aiLimiter,
    superComputer,
    highSpeedConnector,
    coal,
    steelIngot,
    steelPipe,
    steelBeam,
    encasedIndustrialBeam,
    heavyModularFrame
];
