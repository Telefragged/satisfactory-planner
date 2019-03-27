export interface Producer {
    name: string;
    powerConsumption: number;
}

export const drill: Producer = { name: "Drill", powerConsumption: 4 }
export const smelter: Producer = { name: "Smelter", powerConsumption: 4 }
export const foundry: Producer = { name: "Foundry", powerConsumption: 16 }
export const constructor: Producer = { name: "Constructor", powerConsumption: 4 }
export const assembler: Producer = { name: "Assembler", powerConsumption: 15 }
export const manufacturer: Producer = { name: "Manufacturer", powerConsumption: 55 }

export interface OutputType {
    name: string;
    productionRate: number;
    producedBy: Producer;
    inputTypes: { type: OutputType, amount: number }[];
}

export const ironOre: OutputType = {
    name: "Iron Ore",
    productionRate: 60,
    producedBy: drill,
    inputTypes: []
}

export const ironIngot: OutputType = {
    name: "Iron Ingot",
    productionRate: 30,
    producedBy: smelter,
    inputTypes: [{type: ironOre, amount: 1}]
}

export const ironPlate: OutputType = {
    name: "Iron Plate",
    productionRate: 15,
    producedBy: constructor,
    inputTypes: [{type: ironIngot, amount: 2}]
}

export const ironRod: OutputType = {
    name: "Iron Rod",
    productionRate: 15,
    producedBy: constructor,
    inputTypes: [{type: ironIngot, amount: 1}]
}

export const screw: OutputType = {
    name: "Screw",
    productionRate: 90,
    producedBy: constructor,
    inputTypes: [{type: ironRod, amount: 1/6}]
}

export const limestone: OutputType = {
    name: "Limestone",
    productionRate: 60,
    producedBy: drill,
    inputTypes: []
}

export const concrete: OutputType = {
    name: "Concrete",
    productionRate: 15,
    producedBy: constructor,
    inputTypes: [{type: limestone, amount: 3}]
}

export const reinforcedIronPlate: OutputType = {
    name: "Reinforced Iron Plate",
    productionRate: 5,
    producedBy: assembler,
    inputTypes: [
        {type: screw, amount: 24},
        {type: ironPlate, amount: 4},
    ]
}

export const modularFrame: OutputType = {
    name: "Modular Frame",
    productionRate: 5,
    producedBy: assembler,
    inputTypes: [
        {type: reinforcedIronPlate, amount: 3},
        {type: ironRod, amount: 6},
    ]
}

export const coal: OutputType = {
    name: "Coal",
    productionRate: 60,
    producedBy: drill,
    inputTypes: []
}

export const steelIngot: OutputType = {
    name: "Steel Ingot",
    productionRate: 30,
    producedBy: foundry,
    inputTypes: [
        {type: ironOre, amount: 3/2},
        {type: coal, amount: 3/2}
    ]
}

export const steelPipe: OutputType = {
    name: "Steel Pipe",
    productionRate: 15,
    producedBy: constructor,
    inputTypes: [
        {type: steelIngot, amount: 1},
    ]
}

export const steelBeam: OutputType = {
    name: "Steel Beam",
    productionRate: 10,
    producedBy: constructor,
    inputTypes: [
        {type: steelIngot, amount: 3},
    ]
}

export const encasedIndustrialBeam: OutputType = {
    name: "Encased Industrial Beam",
    productionRate: 4,
    producedBy: assembler,
    inputTypes: [
        {type: steelBeam, amount: 4},
        {type: concrete, amount: 5}
    ]
}

export const heavyModularFrame: OutputType = {
    name: "Heavy Modular Frame",
    productionRate: 2,
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
