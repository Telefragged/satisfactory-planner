import * as React from 'react';
import { OutputType, Recipe, outputTypes } from '../types';
import zimaReducer from 'zima-reducer'

interface State {
    outputTypes: OutputType[]
}

interface RecipeSelectorProps {
    onChangeRecipe?: ((types: OutputType[]) => void);
}

const actions = {
    setOutputTypes: (state: State, outputTypes: OutputType[]): State => ({ ...state, outputTypes }),
    resetRecipes: (state: State): State => ({ ...state, outputTypes })
}

export const RecipeSelector: React.FunctionComponent<RecipeSelectorProps> = (props) => {

    const { onChangeRecipe } = props;

    const [state, dispatch] = zimaReducer(actions, { outputTypes: outputTypes.map(t => ({ ...t })) });

    const selectRecipe = (outputType: OutputType, newRecipe: Recipe) => {
        const { outputTypes } = state;
        const oldIndex = outputTypes.findIndex(t => t.name === outputType.name);

        const newType: OutputType = { ...outputTypes[oldIndex], selectedRecipe: newRecipe };

        const replaceTypeInRecipe = (recipe: Recipe) => {
            if (recipe.inputTypes) {
                const typeIndex = recipe.inputTypes.findIndex(t => t.type.name === newType.name);

                if (typeIndex >= 0) {
                    const newInputType = { ...recipe.inputTypes[typeIndex], type: newType };
                    const newInputTypes =
                        recipe.inputTypes
                            .slice(0, typeIndex)
                            .concat(newInputType)
                            .concat(recipe.inputTypes.slice(typeIndex + 1));

                    return { ...recipe, inputTypes: newInputTypes };
                }
            }

            return recipe;
        };

        const replaceTypeInTree = (type: OutputType): OutputType => {

            const replaceTypeInInputType = (inputType: {type: OutputType, amount: number}) =>
                ({...inputType, type: replaceTypeInTree(inputType.type)})

            const selectedRecipe = replaceTypeInRecipe(type.selectedRecipe);

            const newSelectedRecipe: Recipe = {
                ...selectedRecipe,
                inputTypes: selectedRecipe.inputTypes
                    ? selectedRecipe.inputTypes.map(replaceTypeInInputType) : undefined
            }

            return {
                ...type,
                selectedRecipe: newSelectedRecipe,
                recipes: type.recipes ? type.recipes.map(r => {
                    const newRecipe = replaceTypeInRecipe(r);

                    newRecipe.inputTypes =
                        newRecipe.inputTypes
                            ? newRecipe.inputTypes.map(replaceTypeInInputType)
                            : undefined;

                    return newRecipe;
                }) : undefined
            };
        };

        const newOutputTypes = outputTypes.map(replaceTypeInTree);

        newOutputTypes.splice(oldIndex, 1, newType);

        if (onChangeRecipe) {
            onChangeRecipe(newOutputTypes);
        }

        dispatch.setOutputTypes(newOutputTypes);
    }

    return (<>
        {state.outputTypes.filter(t => t.recipes && t.recipes.length > 1).map(t => {
            return (
                <>
                    <p>{t.name}</p>
                    {t.recipes!.map((r, i) =>
                        <button onClick={() => selectRecipe(t, r)}>{i}</button>)}
                </>
            );
        })}
    </>);
};
