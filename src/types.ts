export type Producer = {
    name: string;
    powerConsumption: number;
}

const drill: Producer = { name: "Drill", powerConsumption: 4 }
const smelter: Producer = { name: "Smelter", powerConsumption: 4 }
const foundry: Producer = { name: "Foundry", powerConsumption: 16 }
const constructor: Producer = { name: "Constructor", powerConsumption: 4 }
const assembler: Producer = { name: "Assembler", powerConsumption: 15 }
const manufacturer: Producer = { name: "Manufacturer", powerConsumption: 55 }

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

const screw: OutputType = {
    name: "Screw",
    productionRate: 90,
    outputAmount: 6,
    producedBy: constructor,
    inputTypes: [{type: ironRod, amount: 1}]
}

const limestone: OutputType = {
    name: "Limestone",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
}

const concrete: OutputType = {
    name: "Concrete",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [{type: limestone, amount: 3}]
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

const coal: OutputType = {
    name: "Coal",
    productionRate: 60,
    outputAmount: 1,
    producedBy: drill,
    inputTypes: []
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

const steelPipe: OutputType = {
    name: "Steel Pipe",
    productionRate: 15,
    outputAmount: 1,
    producedBy: constructor,
    inputTypes: [
        {type: steelIngot, amount: 1},
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

export const outputTypes: OutputType[] = [
    ironOre,
    ironIngot,
    ironPlate,
    ironRod,
    screw,
    limestone,
    concrete,
    reinforcedIronPlate,
    modularFrame,
    coal,
    steelIngot,
    steelPipe,
    steelBeam,
    encasedIndustrialBeam,
    heavyModularFrame
];
