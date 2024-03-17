export const RecipeType = {
    Breakfast: 'Breakfast',
    Lunch: 'Lunch',
    Dinner: 'Dinner',
    Dessert: 'Dessert',
    Snack: 'Snack',
    Drink: 'Drink'
};

export const RecipeDifficulty = {
    VeryEasy: 'VeryEasy',
    Easy: 'Easy',
    Average: 'Average',
    Hard: 'Hard',
    VeryHard: 'VeryHard',
}

export const RecipeState = {
    Draft: 'Draft',
    Published: 'Published',
    Archived: 'Archived'
}

export const MeasurementSystem = {
    Metric: 'Metric',
    Imperial: 'Imperial'
}

export const MeasurementType = {
    Weight: 'Weight',
    Volume: 'Volumne',
    Unit: 'Unit'
}

export const UnitOfMeasurementRepresentation = {
    Integer: 'Integer',
    Decimal: 'Decimal',
    Fraction: 'Fraction'
}

export const enum Operation {
    Create,
    Update
}