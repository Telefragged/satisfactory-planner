import _ from 'lodash';

type Producer = {
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

export type Recipe = {
    productionRate: number;
    outputAmount: number;
    inputTypes?: {
        type: OutputType,
        amount: number
    }[];
}

export type OutputType = {
    name: string;
    selectedRecipe: Recipe;
    recipes?: Recipe[];
}

export const deduceProducer = (type: OutputType): Producer => {
    switch (type.name) {
        case 'Iron Ore':
        case 'Copper Ore':
        case 'Limestone':
        case 'Coal':
        case 'Caterium Ore':
            return drill;

        case 'Iron Ingot':
            if (type.selectedRecipe.inputTypes && type.selectedRecipe.inputTypes.length > 1) {
                return foundry;
            }
        case 'Copper Ingot':
        case 'Caterium Ingot':
            return smelter;

        case 'Crude Oil':
            return oilPump;

        case 'Rubber':
        case 'Plastic':
        case 'Fuel':
            return oilRefinery;

        case 'Steel Ingot':
            return foundry;

        default:
            if (!type.selectedRecipe.inputTypes || type.selectedRecipe.inputTypes.length < 2) {
                return constructor;
            }

            if (!type.selectedRecipe.inputTypes || type.selectedRecipe.inputTypes.length >= 3) {
                return manufacturer;
            }

            return assembler
    }
}

const ironOre: OutputType = {
    name: "Iron Ore",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const copperOre: OutputType = {
    name: "Copper Ore",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const limestone: OutputType = {
    name: "Limestone",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const coal: OutputType = {
    name: "Coal",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const crudeOil: OutputType = {
    name: "Crude Oil",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const cateriumOre: OutputType = {
    name: "Caterium Ore",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 1
    }
}

const ironIngot: OutputType = {
    name: "Iron Ingot",
    selectedRecipe: {
        outputAmount: 1,
        productionRate: 30,
        inputTypes: [{ type: ironOre, amount: 1 }]
    }, recipes: [
        {
            outputAmount: 3,
            productionRate: 45,
            inputTypes: [
                { type: ironOre, amount: 1 },
                { type: copperOre, amount: 1 }
            ]
        }
    ]
}

const ironPlate: OutputType = {
    name: "Iron Plate",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [{ type: ironIngot, amount: 2 }]
    }
}

const ironRod: OutputType = {
    name: "Iron Rod",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [{ type: ironIngot, amount: 1 }]
    }
}

const copperIngot: OutputType = {
    name: "Copper Ingot",
    selectedRecipe: {
        productionRate: 30,
        outputAmount: 1,
        inputTypes: [{ type: copperOre, amount: 1 }]
    }
}

const cateriumIngot: OutputType = {
    name: "Caterium Ingot",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [{ type: cateriumOre, amount: 4 }]
    }
}

const wire: OutputType = {
    name: "Wire",
    selectedRecipe: {
        productionRate: 45,
        outputAmount: 3,
        inputTypes: [{ type: copperIngot, amount: 1 }]
    },
    recipes: [
        {
            productionRate: 67.5,
            outputAmount: 9,
            inputTypes: [{ type: ironIngot, amount: 2 }]
        },
        {
            productionRate: 67.5,
            outputAmount: 9,
            inputTypes: [{ type: cateriumIngot, amount: 1 }]
        }
    ]
}

const rubber: OutputType = {
    name: "Rubber",
    selectedRecipe: {
        productionRate: 30,
        outputAmount: 4,
        inputTypes: [{ type: crudeOil, amount: 4 }]
    }
}

const cable: OutputType = {
    name: "Cable",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [{ type: wire, amount: 2 }]
    },
    recipes: [
        {
            productionRate: 37.5,
            outputAmount: 5,
            inputTypes: [
                { type: wire, amount: 3 },
                { type: rubber, amount: 2 }
            ]
        }
    ]
}


const concrete: OutputType = {
    name: "Concrete",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [{ type: limestone, amount: 3 }]
    }
}

const screw: OutputType = {
    name: "Screw",
    selectedRecipe: {
        productionRate: 90,
        outputAmount: 6,
        inputTypes: [{ type: ironRod, amount: 1 }]
    },
    recipes: [
        {
            productionRate: 90,
            outputAmount: 12,
            inputTypes: [{ type: ironIngot, amount: 2 }]
        }
    ]
}

const reinforcedIronPlate: OutputType = {
    name: "Reinforced Iron Plate",
    selectedRecipe: {
        productionRate: 5,
        outputAmount: 1,
        inputTypes: [
            { type: screw, amount: 24 },
            { type: ironPlate, amount: 4 },
        ]
    },
    recipes: [
        {
            productionRate: 7.5,
            outputAmount: 3,
            inputTypes: [
                { type: screw, amount: 24 },
                { type: ironPlate, amount: 10 }
            ]
        },
        {
            productionRate: 7.5,
            outputAmount: 3,
            inputTypes: [
                { type: ironPlate, amount: 6 },
                { type: wire, amount: 30 }
            ]
        }
    ]
}

const steelIngot: OutputType = {
    name: "Steel Ingot",
    selectedRecipe: {
        productionRate: 30,
        outputAmount: 2,
        inputTypes: [
            { type: ironOre, amount: 3 },
            { type: coal, amount: 3 }
        ]
    },
    recipes: [
        {
            productionRate: 45,
            outputAmount: 6,
            inputTypes: [
                { type: ironIngot, amount: 3 },
                { type: coal, amount: 6 }
            ]
        }
    ]
}

const steelPipe: OutputType = {
    name: "Steel Pipe",
    selectedRecipe: {
        productionRate: 15,
        outputAmount: 1,
        inputTypes: [
            { type: steelIngot, amount: 1 },
        ]
    }
}

const rotor: OutputType = {
    name: "Rotor",
    selectedRecipe: {
        productionRate: 6,
        outputAmount: 1,
        inputTypes: [
            { type: screw, amount: 22 },
            { type: ironRod, amount: 3 },
        ]
    },
    recipes: [
        {
            productionRate: 9,
            outputAmount: 3,
            inputTypes: [
                { type: steelPipe, amount: 6 },
                { type: wire, amount: 20 }
            ]
        }
    ]
}

const modularFrame: OutputType = {
    name: "Modular Frame",
    selectedRecipe: {
        productionRate: 5,
        outputAmount: 1,
        inputTypes: [
            { type: reinforcedIronPlate, amount: 3 },
            { type: ironRod, amount: 6 },
        ]
    },
    recipes: [
        {
            productionRate: 6,
            outputAmount: 3,
            inputTypes: [
                { type: reinforcedIronPlate, amount: 6 },
                { type: steelPipe, amount: 6 }
            ]
        }
    ]
}

const steelBeam: OutputType = {
    name: "Steel Beam",
    selectedRecipe: {
        productionRate: 10,
        outputAmount: 1,
        inputTypes: [
            { type: steelIngot, amount: 3 },
        ]
    }
}

const encasedIndustrialBeam: OutputType = {
    name: "Encased Industrial Beam",
    selectedRecipe: {
        productionRate: 4,
        outputAmount: 1,
        inputTypes: [
            { type: steelBeam, amount: 4 },
            { type: concrete, amount: 5 }
        ]
    },
    recipes: [
        {
            productionRate: 6,
            outputAmount: 3,
            inputTypes: [
                { type: steelPipe, amount: 18 },
                { type: concrete, amount: 10 }
            ]
        }
    ]
}

const quickwire: OutputType = {
    name: "Quickwire",
    selectedRecipe: {
        productionRate: 60,
        outputAmount: 4,
        inputTypes: [{ type: cateriumIngot, amount: 1 }]
    },
    recipes: [
        {
            productionRate: 90,
            outputAmount: 12,
            inputTypes: [
                { type: cateriumIngot, amount: 1 },
                { type: copperIngot, amount: 2 }
            ]
        }
    ]
}

const stator: OutputType = {
    name: "Stator",
    selectedRecipe: {
        productionRate: 6,
        outputAmount: 1,
        inputTypes: [
            { type: steelPipe, amount: 3 },
            { type: wire, amount: 10 }
        ]
    },
    recipes: [
        {
            productionRate: 9,
            outputAmount: 3,
            inputTypes: [
                { type: steelPipe, amount: 6 },
                { type: quickwire, amount: 25 }
            ]
        }
    ]
}

const motor: OutputType = {
    name: "Motor",
    selectedRecipe: {
        productionRate: 5,
        outputAmount: 1,
        inputTypes: [
            { type: rotor, amount: 2 },
            { type: stator, amount: 2 }
        ]
    }
}

const heavyModularFrame: OutputType = {
    name: "Heavy Modular Frame",
    selectedRecipe: {
        productionRate: 2,
        outputAmount: 1,
        inputTypes: [
            { type: modularFrame, amount: 5 },
            { type: steelPipe, amount: 15 },
            { type: encasedIndustrialBeam, amount: 5 },
            { type: screw, amount: 90 }
        ]
    },
    recipes: [
        {
            productionRate: 2.8125,
            outputAmount: 3,
            inputTypes: [
                { type: modularFrame, amount: 8 },
                { type: encasedIndustrialBeam, amount: 10 },
                { type: steelPipe, amount: 36 },
                { type: concrete, amount: 25 }
            ]
        }
    ]
}

const plastic: OutputType = {
    name: "Plastic",
    selectedRecipe: {
        productionRate: 22.5,
        outputAmount: 3,
        inputTypes: [{ type: crudeOil, amount: 4 }]
    }
}

const fuel: OutputType = {
    name: "Fuel",
    selectedRecipe: {
        productionRate: 37.5,
        outputAmount: 5,
        inputTypes: [{ type: crudeOil, amount: 8 }]
    }
}

const circuitBoard: OutputType = {
    name: "Circuit Board",
    selectedRecipe: {
        productionRate: 5,
        outputAmount: 1,
        inputTypes: [
            { type: wire, amount: 12 },
            { type: plastic, amount: 6 }
        ]
    },
    recipes: [
        {
            productionRate: 7.5,
            outputAmount: 3,
            inputTypes: [
                { type: rubber, amount: 16 },
                { type: wire, amount: 24 }
            ]
        },
        {
            productionRate: 7.5,
            outputAmount: 3,
            inputTypes: [
                { type: plastic, amount: 12 },
                { type: quickwire, amount: 32 }
            ]
        }
    ]
}

const computer: OutputType = {
    name: "Computer",
    selectedRecipe: {
        productionRate: 1.875,
        outputAmount: 1,
        inputTypes: [
            { type: circuitBoard, amount: 5 },
            { type: cable, amount: 12 },
            { type: plastic, amount: 18 },
            { type: screw, amount: 60 }
        ]
    },
    recipes: [
        {
            productionRate: 2.8125,
            outputAmount: 3,
            inputTypes: [
                { type: circuitBoard, amount: 10 },
                { type: quickwire, amount: 112 },
                { type: rubber, amount: 48 }
            ]
        }
    ]
}

const aiLimiter: OutputType = {
    name: "AI Limiter",
    selectedRecipe: {
        productionRate: 5,
        outputAmount: 1,
        inputTypes: [
            { type: circuitBoard, amount: 1 },
            { type: quickwire, amount: 18 }
        ]
    }
}

const highSpeedConnector: OutputType = {
    name: "High Speed Connector",
    selectedRecipe: {
        productionRate: 2.5,
        outputAmount: 1,
        inputTypes: [
            { type: quickwire, amount: 40 },
            { type: cable, amount: 10 },
            { type: plastic, amount: 6 },
        ]
    }
}


const superComputer: OutputType = {
    name: "Supercomputer",
    selectedRecipe: {
        productionRate: 1.875,
        outputAmount: 1,
        inputTypes: [
            { type: computer, amount: 2 },
            { type: aiLimiter, amount: 2 },
            { type: plastic, amount: 21 },
            { type: highSpeedConnector, amount: 3 }
        ]
    }
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
    cateriumIngot,
    quickwire,
    plastic,
    rubber,
    fuel,
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
].map(t =>
    ({
        ...t,
        recipes:
            t.recipes
                ? t.recipes.concat(t.selectedRecipe)
                : [t.selectedRecipe]
    }))
    .sort((a, b) =>
        a.name < b.name
            ? -1
            : b.name < a.name
                ? 1
                : 0);
