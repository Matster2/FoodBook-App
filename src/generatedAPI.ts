/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum AuthorState {
  Published = "Published",
  Archived = "Archived",
}

export interface FoodBookAPICommonReadControllersQueryEmailResponse {
  isUsed: boolean;
}

export interface FoodBookAPICommonReadModelsAuthorReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
}

export interface FoodBookAPICommonReadModelsAuthorsAuthorDto {
  /** @format uuid */
  id: string;
  state: AuthorState;
  name: string;
  biography: string;
  profilePictureUrl: string;
  links: FoodBookAPICommonReadModelsAuthorsAuthorDtoLink[];
}

export interface FoodBookAPICommonReadModelsAuthorsAuthorDtoLink {
  /** @format uuid */
  id: string;
  name: string;
  url: string;
}

export interface FoodBookAPICommonReadModelsCollectionReferenceDto {
  /** @format uuid */
  id: string;
  title: string;
}

export type FoodBookAPICommonReadModelsCollectionsCollectionDto = FoodBookAPICommonReadModelsCollectionReferenceDto & {
  hidden: boolean;
  promoted: boolean;
};

export interface FoodBookAPICommonReadModelsContactUsContactUsDto {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  message: string;
}

export type FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto =
  FoodBookAPICommonReadModelsPieceOfEquipmentReferenceDto;

export interface FoodBookAPICommonReadModelsIngredientReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
  pluralName: string;
}

export type FoodBookAPICommonReadModelsIngredientsIngredientDto = FoodBookAPICommonReadModelsIngredientReferenceDto & {
  defaultUnitOfMeasurement:
    | FoodBookAPICommonReadModelsUnitOfMeasurementReferenceDto
    | FoodBookAPICommonReadModelsUnitOfMeasurementsUnitOfMeasurementDto;
};

export interface FoodBookAPICommonReadModelsLanguagesLanguageDto {
  iso639: string;
  name: string;
  nativeName: string;
}

export interface FoodBookAPICommonReadModelsPieceOfEquipmentReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
  pluralName: string;
}

export interface FoodBookAPICommonReadModelsPlannerPlannerDto {
  plannedRecipes: FoodBookAPICommonReadModelsPlannerPlannerDtoPlannedRecipe[];
}

export interface FoodBookAPICommonReadModelsPlannerPlannerDtoPlannedRecipe {
  /** @format uuid */
  id: string;
  /** @format date */
  date: string;
  /** @format int32 */
  servings: number;
  recipe: FoodBookAPICommonReadModelsPlannerPlannerDtoPlannedRecipeRecipe;
}

export type FoodBookAPICommonReadModelsPlannerPlannerDtoPlannedRecipeRecipe =
  FoodBookAPICommonReadModelsRecipeReferenceDto & {
    description: string;
    /** @format date-time */
    createdOn: Date;
    /** @format date-time */
    publishedOn?: Date | null;
    difficulty: RecipeDifficulty;
    personal: boolean;
    /** @format int32 */
    prepTime: number;
    /** @format int32 */
    cookTime: number;
    /** @format int32 */
    totalTime: number;
    /** @format int32 */
    servings: number;
    containsAlcohol: boolean;
    /** @format double */
    rating: number;
    favourited?: boolean | null;
    nutrition: FoodBookAPICommonReadModelsRecipeNutritionReferenceDto;
    ingredients: (
      | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
      | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
    )[];
    images: FoodBookAPICommonReadModelsRecipeImageReferenceDto[];
    tags: (FoodBookAPICommonReadModelsTagReferenceDto | FoodBookAPICommonReadModelsTagsTagDto | AdminTagDto)[];
  };

export interface FoodBookAPICommonReadModelsPlannerPlannerIngredientListDto {
  ingredients: (
    | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
    | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
  )[];
  breakdown: FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoBreakdown;
}

export interface FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoBreakdown {
  plannedRecipes: FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoPlannedRecipe[];
}

export interface FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoPlannedRecipe {
  /** @format uuid */
  id: string;
  /** @format date */
  date: string;
  /** @format int32 */
  servings: number;
  recipe: FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoPlannedRecipeRecipe;
  ingredients: (
    | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
    | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
  )[];
}

export type FoodBookAPICommonReadModelsPlannerPlannerIngredientListDtoPlannedRecipeRecipe =
  FoodBookAPICommonReadModelsRecipeReferenceDto & {
    description: string;
    difficulty: RecipeDifficulty;
    personal: boolean;
    /** @format int32 */
    prepTime: number;
    /** @format int32 */
    cookTime: number;
    /** @format int32 */
    totalTime: number;
    /** @format int32 */
    servings: number;
    containsAlcohol: boolean;
    ingredients: (
      | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
      | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
    )[];
    images: FoodBookAPICommonReadModelsRecipeImageReferenceDto[];
  };

export interface FoodBookAPICommonReadModelsRecipeImageReferenceDto {
  /** @format uuid */
  id: string;
  url: string;
}

export interface FoodBookAPICommonReadModelsRecipeIngredientReferenceDto {
  /** @format uuid */
  id: string;
  /** @format double */
  amount: number;
  optional: boolean;
  /** @format uuid */
  partId?: string | null;
  unitOfMeasurement:
    | FoodBookAPICommonReadModelsUnitOfMeasurementReferenceDto
    | FoodBookAPICommonReadModelsUnitOfMeasurementsUnitOfMeasurementDto;
  ingredient:
    | FoodBookAPICommonReadModelsIngredientReferenceDto
    | FoodBookAPICommonReadModelsIngredientsIngredientDto
    | AdminIngredientDto;
}

export interface FoodBookAPICommonReadModelsRecipeNutritionReferenceDto {
  /** @format int32 */
  calories?: number | null;
  /** @format double */
  sugar?: number | null;
  /** @format double */
  fat?: number | null;
  /** @format double */
  saturatedFat?: number | null;
  /** @format double */
  sodium?: number | null;
  /** @format double */
  protein?: number | null;
  /** @format double */
  carbohydrates?: number | null;
  /** @format double */
  fiber?: number | null;
}

export interface FoodBookAPICommonReadModelsRecipeReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
  type: RecipeType;
  createdBy: FoodBookAPICommonReadModelsUserReferenceDto;
  author?: FoodBookAPICommonReadModelsAuthorReferenceDto | null;
}

export type FoodBookAPICommonReadModelsRecipesRecipeDto = FoodBookAPICommonReadModelsRecipeReferenceDto & {
  description: string;
  state: RecipeState;
  /** @format date-time */
  createdOn: Date;
  /** @format date-time */
  publishedOn?: Date | null;
  difficulty: RecipeDifficulty;
  personal: boolean;
  /** @format int32 */
  prepTime: number;
  /** @format int32 */
  cookTime: number;
  /** @format int32 */
  totalTime: number;
  /** @format int32 */
  servings: number;
  containsAlcohol: boolean;
  /** @format double */
  rating: number;
  favourited?: boolean | null;
  referenceUrl?: string | null;
  parts: FoodBookAPICommonReadModelsRecipesRecipeDtoPart[];
  steps: FoodBookAPICommonReadModelsRecipesRecipeDtoStep[];
  ingredients: (
    | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
    | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
  )[];
  equipment: FoodBookAPICommonReadModelsRecipesRecipeDtoRecipePieceOfEquipment[];
  nutrition: FoodBookAPICommonReadModelsRecipeNutritionReferenceDto;
  images: FoodBookAPICommonReadModelsRecipeImageReferenceDto[];
  tags: (FoodBookAPICommonReadModelsTagReferenceDto | FoodBookAPICommonReadModelsTagsTagDto | AdminTagDto)[];
};

export interface FoodBookAPICommonReadModelsRecipesRecipeDtoPart {
  /** @format uuid */
  id: string;
  name: string;
}

export type FoodBookAPICommonReadModelsRecipesRecipeDtoRecipePieceOfEquipment =
  FoodBookAPICommonReadModelsPieceOfEquipmentReferenceDto & {
    /** @format int32 */
    amount: number;
    dependsOnServings: boolean;
  };

export interface FoodBookAPICommonReadModelsRecipesRecipeDtoStep {
  /** @format uuid */
  id: string;
  name: string;
  instructions: FoodBookAPICommonReadModelsRecipesRecipeDtoStepInstruction[];
}

export interface FoodBookAPICommonReadModelsRecipesRecipeDtoStepInstruction {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  instruction: string;
}

export interface FoodBookAPICommonReadModelsRecipesRecipeIngredientsDto {
  ingredients: FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient[];
}

export type FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient =
  FoodBookAPICommonReadModelsRecipeIngredientReferenceDto & {
    recipePart?: FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredientRecipePart | null;
  };

export interface FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredientRecipePart {
  /** @format uuid */
  id?: string | null;
}

export interface FoodBookAPICommonReadModelsRecipesRecipeInstructionsDto {
  steps: FoodBookAPICommonReadModelsRecipesRecipeInstructionsDtoStep[];
}

export interface FoodBookAPICommonReadModelsRecipesRecipeInstructionsDtoStep {
  /** @format uuid */
  id: string;
  name: string;
  instructions: FoodBookAPICommonReadModelsRecipesRecipeInstructionsDtoStepInstruction[];
}

export interface FoodBookAPICommonReadModelsRecipesRecipeInstructionsDtoStepInstruction {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  instruction: string;
}

export interface FoodBookAPICommonReadModelsRecipesRecipeRatingDto {
  /** @format double */
  rating?: number | null;
}

export interface FoodBookAPICommonReadModelsSystemSystemDto {
  version: string;
  maintenance: boolean;
}

export interface FoodBookAPICommonReadModelsTagReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
}

export type FoodBookAPICommonReadModelsTagsTagDto = FoodBookAPICommonReadModelsTagReferenceDto & {
  icon: string;
  hidden: boolean;
  promoted: boolean;
};

export interface FoodBookAPICommonReadModelsUnitOfMeasurementReferenceDto {
  /** @format uuid */
  id: string;
  name: string;
  pluralName: string;
  abbreviation: string;
  type: MeasurementType;
  system?: MeasurementSystem | null;
  representAs: UnitOfMeasurementRepresentation;
}

export type FoodBookAPICommonReadModelsUnitOfMeasurementsUnitOfMeasurementDto =
  FoodBookAPICommonReadModelsUnitOfMeasurementReferenceDto;

export interface FoodBookAPICommonReadModelsUserReferenceDto {
  /** @format uuid */
  id: string;
}

export interface FoodBookAPICommonReadModelsUsersUserDto {
  /** @format uuid */
  id: string;
  firstName: string;
}

export interface FoodBookAPICommonWriteControllersAddVariantDto {
  /** @format uuid */
  variantRecipeId: string;
}

export interface FoodBookAPICommonWriteControllersRecipeCreationResponseDto {
  /** @format uuid */
  id: string;
}

export interface FoodBookAPICommonWriteControllersRecipeImageUploadResponseDto {
  /** @format uuid */
  id: string;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDto {
  languageCode: string;
  /** @minLength 1 */
  name: string;
  description: string;
  type: RecipeType;
  difficulty: RecipeDifficulty;
  personal: boolean;
  /** @format int32 */
  prepTime: number;
  /** @format int32 */
  cookTime: number;
  /** @format int32 */
  totalTime: number;
  /** @format int32 */
  servings: number;
  containsAlcohol: boolean;
  /** @format uuid */
  authorId?: string | null;
  referenceUrl?: string | null;
  /** @format uuid */
  descendantOfRecipeId?: string | null;
  parts: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoPart[];
  steps: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoStep[];
  ingredients: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoIngredient[];
  equipment: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoPieceOfEquipment[];
  nutrition: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoNutrition;
  tags: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoTag[];
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoIngredient {
  /** @format uuid */
  ingredientId: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  /** @format double */
  amount: number;
  optional: boolean;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoNutrition {
  /** @format int32 */
  calories?: number | null;
  /** @format double */
  sugar?: number | null;
  /** @format double */
  fat?: number | null;
  /** @format double */
  saturatedFat?: number | null;
  /** @format double */
  sodium?: number | null;
  /** @format double */
  protein?: number | null;
  /** @format double */
  carbohydrates?: number | null;
  /** @format double */
  fiber?: number | null;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoPart {
  name: string;
  ingredients: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoIngredient[];
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoPieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoStep {
  /** @format int32 */
  number: number;
  name: string;
  instructions: FoodBookDomainEntitiesRecipeInstruction[];
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoTag {
  /** @format uuid */
  id: string;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeImageIndexUpdateDto {
  /** @format int32 */
  sequence: number;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDto {
  languageCode: string;
  /** @minLength 1 */
  name: string;
  description: string;
  type: RecipeType;
  difficulty: RecipeDifficulty;
  /** @format int32 */
  prepTime: number;
  /** @format int32 */
  cookTime: number;
  /** @format int32 */
  totalTime: number;
  /** @format int32 */
  servings: number;
  containsAlcohol: boolean;
  /** @format uuid */
  authorId?: string | null;
  referenceUrl?: string | null;
  parts: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoPart[];
  steps: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoStep[];
  ingredients: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoIngredient[];
  equipment: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoPieceOfEquipment[];
  nutrition: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoNutrition;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoIngredient {
  /** @format uuid */
  ingredientId: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  /** @format double */
  amount: number;
  optional: boolean;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoNutrition {
  /** @format int32 */
  calories?: number | null;
  /** @format double */
  sugar?: number | null;
  /** @format double */
  fat?: number | null;
  /** @format double */
  saturatedFat?: number | null;
  /** @format double */
  sodium?: number | null;
  /** @format double */
  protein?: number | null;
  /** @format double */
  carbohydrates?: number | null;
  /** @format double */
  fiber?: number | null;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoPart {
  name: string;
  ingredients: FoodBookAPICommonWriteModelsRecipesRecipeCreationDtoIngredient[];
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoPieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
}

export interface FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoStep {
  /** @format int32 */
  number: number;
  name: string;
  instructions: FoodBookDomainEntitiesRecipeInstruction[];
}

export type FoodBookCommandsFavouriteRecipeCommandResponse = object;

export interface FoodBookCommandsRateRecipeCommand {
  /** @format uuid */
  recipeId: string;
  /** @format uuid */
  userId: string;
  /** @format double */
  rating: number;
}

export type FoodBookCommandsRateRecipeCommandResponse = object;

export type FoodBookCommandsUnfavouriteRecipeCommandResponse = object;

export interface FoodBookDomainAuthorsCommandsCreateAuthorCommand {
  languageCode?: string | null;
  name?: string | null;
  biography?: string | null;
  links?: FoodBookDomainAuthorsCommandsCreateAuthorCommandLink[] | null;
}

export interface FoodBookDomainAuthorsCommandsCreateAuthorCommandResponse {
  /** @format uuid */
  id: string;
}

export interface FoodBookDomainAuthorsCommandsCreateAuthorCommandLink {
  name?: string | null;
  description?: string | null;
  url?: string | null;
}

export interface FoodBookDomainAuthorsCommandsUpdateAuthorCommand {
  /** @format uuid */
  id: string;
  languageCode?: string | null;
  name?: string | null;
  biography?: string | null;
  links?: FoodBookDomainAuthorsCommandsUpdateAuthorCommandLink[] | null;
}

export type FoodBookDomainAuthorsCommandsUpdateAuthorCommandResponse = object;

export interface FoodBookDomainAuthorsCommandsUpdateAuthorCommandLink {
  name?: string | null;
  description?: string | null;
  url?: string | null;
}

export type FoodBookDomainCollectionsCommandsAddRecipeToCollectionCommandResponse = object;

export interface FoodBookDomainCollectionsCommandsCreateCollectionCommand {
  /** @minLength 1 */
  languageCode: string;
  /** @minLength 1 */
  title: string;
}

export interface FoodBookDomainCollectionsCommandsCreateCollectionCommandResponse {
  /** @format uuid */
  id: string;
}

export type FoodBookDomainCollectionsCommandsRemoveRecipeFromCollectionCommandResponse = object;

export interface FoodBookDomainCollectionsCommandsUpdateCollectionCommand {
  /** @format uuid */
  id: string;
  title?: string | null;
  hidden: boolean;
  promoted: boolean;
}

export type FoodBookDomainCollectionsCommandsUpdateCollectionCommandResponse = object;

export interface FoodBookDomainCommandsAuthChangeEmailCommand {
  /** @format uuid */
  userId: string;
  newEmail?: string | null;
  password?: string | null;
  language?: string | null;
}

export type FoodBookDomainCommandsAuthChangeEmailCommandResponse = object;

export interface FoodBookDomainCommandsAuthChangePasswordCommand {
  /** @format uuid */
  userId: string;
  currentPassword?: string | null;
  newPassword?: string | null;
  language?: string | null;
}

export type FoodBookDomainCommandsAuthChangePasswordCommandResponse = object;

export type FoodBookDomainCommandsAuthDeleteAccountCommandResponse = object;

export interface FoodBookDomainCommandsAuthForgotPasswordCommand {
  email?: string | null;
  language?: string | null;
}

export type FoodBookDomainCommandsAuthForgotPasswordCommandResponse = object;

export interface FoodBookDomainCommandsAuthLoginCommand {
  email?: string | null;
  password?: string | null;
}

export interface FoodBookDomainCommandsAuthLoginCommandResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface FoodBookDomainCommandsAuthRefreshTokensCommand {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface FoodBookDomainCommandsAuthRefreshTokensCommandResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface FoodBookDomainCommandsAuthRegisterUserCommand {
  email?: string | null;
  password?: string | null;
  language?: string | null;
}

export interface FoodBookDomainCommandsAuthRegisterUserCommandResponse {
  /** @format uuid */
  id: string;
}

export interface FoodBookDomainCommandsAuthResetPasswordCommand {
  email?: string | null;
  resetToken?: string | null;
  newPassword?: string | null;
  language?: string | null;
}

export type FoodBookDomainCommandsAuthResetPasswordCommandResponse = object;

export interface FoodBookDomainCommandsEquipmentCreateEquipmentCommand {
  languageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  personal: boolean;
}

export interface FoodBookDomainCommandsEquipmentCreateEquipmentCommandResponse {
  /** @format uuid */
  id: string;
}

export interface FoodBookDomainCommandsEquipmentUpdateEquipmentCommand {
  /** @format uuid */
  id: string;
  name?: string | null;
  pluralName?: string | null;
}

export type FoodBookDomainCommandsEquipmentUpdateEquipmentCommandResponse = object;

export interface FoodBookDomainCommandsIngredientsCreateIngredientCommand {
  languageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
  personal: boolean;
}

export interface FoodBookDomainCommandsIngredientsCreateIngredientCommandResponse {
  /** @format uuid */
  id: string;
}

export interface FoodBookDomainCommandsIngredientsUpdateIngredientCommand {
  /** @format uuid */
  id: string;
  name?: string | null;
  pluralName?: string | null;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
}

export type FoodBookDomainCommandsIngredientsUpdateIngredientCommandResponse = object;

export interface FoodBookDomainCommandsPlannerAddRecipeToPlannerCommand {
  /** @format uuid */
  userId: string;
  /** @format uuid */
  recipeId: string;
  dates?: string[] | null;
  /** @format int32 */
  servings: number;
}

export interface FoodBookDomainCommandsPlannerAddRecipeToPlannerCommandResponse {
  plannedRecipes?: FoodBookDomainCommandsPlannerAddRecipeToPlannerCommandResponsePlannedRecipe[] | null;
}

export interface FoodBookDomainCommandsPlannerAddRecipeToPlannerCommandResponsePlannedRecipe {
  /** @format uuid */
  id: string;
}

export type FoodBookDomainCommandsPlannerRemovePlannedRecipeCommandResponse = object;

export interface FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommand {
  /** @format uuid */
  id: string;
  /** @format int32 */
  servings: number;
}

export type FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommandResponse = object;

export interface FoodBookDomainEntitiesAuthor {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  state: AuthorState;
  name?: string | null;
  biography?: string | null;
  links?: FoodBookDomainEntitiesAuthorLink[] | null;
  translations?: FoodBookDomainEntitiesTranslationsAuthorTranslation[] | null;
}

export interface FoodBookDomainEntitiesAuthorLink {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  /** @format uuid */
  authorId: string;
  name?: string | null;
  url?: string | null;
  author?: FoodBookDomainEntitiesAuthor | null;
  translations?: FoodBookDomainEntitiesTranslationsAuthorLinkTranslation[] | null;
}

export interface FoodBookDomainEntitiesCollection {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  title?: string | null;
  hidden: boolean;
  promoted: boolean;
  /** @format uuid */
  createdByUserId: string;
  /** @format date-time */
  createdOn: Date;
  /** @format uuid */
  updatedByUserId?: string | null;
  /** @format date-time */
  updatedOn?: Date | null;
  createdByUser?: FoodBookDomainEntitiesUser | null;
  updatedByUser?: FoodBookDomainEntitiesUser | null;
  translations?: FoodBookDomainEntitiesTranslationsCollectionTranslation[] | null;
  recipes?: FoodBookDomainEntitiesCollectionRecipe[] | null;
}

export interface FoodBookDomainEntitiesCollectionRecipe {
  /** @format uuid */
  collectionId: string;
  /** @format uuid */
  recipeId: string;
  collection?: FoodBookDomainEntitiesCollection | null;
  recipe?: FoodBookDomainEntitiesRecipe | null;
}

export interface FoodBookDomainEntitiesCoreTranslationEntity {
  languageCode?: string | null;
}

export interface FoodBookDomainEntitiesFavouritedRecipe {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  /** @format uuid */
  userId: string;
  recipe?: FoodBookDomainEntitiesRecipe | null;
}

export interface FoodBookDomainEntitiesIngredient {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
  personal: boolean;
  /** @format uuid */
  createdByUserId: string;
  /** @format date-time */
  createdOn: Date;
  /** @format uuid */
  updatedByUserId?: string | null;
  /** @format date-time */
  updatedOn?: Date | null;
  createdByUser?: FoodBookDomainEntitiesUser | null;
  updatedByUser?: FoodBookDomainEntitiesUser | null;
  translations?: FoodBookDomainEntitiesTranslationsIngredientTranslation[] | null;
  defaultUnitOfMeasurement?: FoodBookDomainEntitiesUnitOfMeasurement | null;
}

export interface FoodBookDomainEntitiesPieceOfEquipment {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  personal: boolean;
  /** @format uuid */
  createdByUserId: string;
  /** @format date-time */
  createdOn: Date;
  /** @format uuid */
  updatedByUserId?: string | null;
  /** @format date-time */
  updatedOn?: Date | null;
  createdByUser?: FoodBookDomainEntitiesUser | null;
  updatedByUser?: FoodBookDomainEntitiesUser | null;
  translations?: FoodBookDomainEntitiesTranslationsEquipmentTranslation[] | null;
}

export interface FoodBookDomainEntitiesRecipe {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  description?: string | null;
  state: RecipeState;
  /** @format uuid */
  authorId?: string | null;
  /** @format date-time */
  publishedOn?: Date | null;
  personal: boolean;
  type: RecipeType;
  difficulty: RecipeDifficulty;
  /** @format int32 */
  prepTime: number;
  /** @format int32 */
  cookTime: number;
  /** @format int32 */
  totalTime: number;
  /** @format int32 */
  servings: number;
  containsAlcohol: boolean;
  referenceUrl?: string | null;
  /** @format uuid */
  descendantOfRecipeId?: string | null;
  nutrition?: FoodBookDomainEntitiesRecipeNutrition | null;
  parts?: FoodBookDomainEntitiesRecipePart[] | null;
  ingredients?: FoodBookDomainEntitiesRecipeIngredient[] | null;
  equipment?: FoodBookDomainEntitiesRecipePieceOfEquipment[] | null;
  steps?: FoodBookDomainEntitiesRecipeStep[] | null;
  /** @format double */
  rating: number;
  /** @format uuid */
  createdByUserId: string;
  /** @format date-time */
  createdOn: Date;
  /** @format uuid */
  updatedByUserId?: string | null;
  /** @format date-time */
  updatedOn?: Date | null;
  createdByUser?: FoodBookDomainEntitiesUser | null;
  updatedByUser?: FoodBookDomainEntitiesUser | null;
  translations?: FoodBookDomainEntitiesTranslationsRecipeTranslation[] | null;
  author?: FoodBookDomainEntitiesAuthor | null;
  tags?: FoodBookDomainEntitiesRecipeTag[] | null;
  favouriteds?: FoodBookDomainEntitiesFavouritedRecipe[] | null;
  images?: FoodBookDomainEntitiesRecipeImage[] | null;
  collections?: FoodBookDomainEntitiesCollectionRecipe[] | null;
}

export interface FoodBookDomainEntitiesRecipeImage {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  /** @format int32 */
  sequence: number;
  s3ObjectKey?: string | null;
  /** @format date-time */
  lastUpdatedOn: Date;
  recipe?: FoodBookDomainEntitiesRecipe | null;
}

export interface FoodBookDomainEntitiesRecipeIngredient {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  /** @format uuid */
  ingredientId: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  /** @format double */
  amount: number;
  optional: boolean;
  /** @format uuid */
  recipePartId?: string | null;
  recipe?: FoodBookDomainEntitiesRecipe | null;
  part?: FoodBookDomainEntitiesRecipePart | null;
  ingredient?: FoodBookDomainEntitiesIngredient | null;
  unitOfMeasurement?: FoodBookDomainEntitiesUnitOfMeasurement | null;
}

export interface FoodBookDomainEntitiesRecipeInstruction {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  instruction?: string | null;
  /** @format uuid */
  recipeStepId: string;
  step?: FoodBookDomainEntitiesRecipeStep | null;
  translations?: FoodBookDomainEntitiesTranslationsRecipeInstructionTranslation[] | null;
}

export interface FoodBookDomainEntitiesRecipeNutrition {
  /** @format int32 */
  calories?: number | null;
  /** @format double */
  sugar?: number | null;
  /** @format double */
  fat?: number | null;
  /** @format double */
  saturatedFat?: number | null;
  /** @format double */
  sodium?: number | null;
  /** @format double */
  protein?: number | null;
  /** @format double */
  carbohydrates?: number | null;
  /** @format double */
  fiber?: number | null;
}

export interface FoodBookDomainEntitiesRecipePart {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  name?: string | null;
  /** @format uuid */
  recipeId: string;
  recipe?: FoodBookDomainEntitiesRecipe | null;
  ingredients?: FoodBookDomainEntitiesRecipeIngredient[] | null;
  translations?: FoodBookDomainEntitiesTranslationsRecipePartTranslation[] | null;
}

export interface FoodBookDomainEntitiesRecipePieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
  pieceOfEquipment?: FoodBookDomainEntitiesPieceOfEquipment | null;
}

export interface FoodBookDomainEntitiesRecipeStep {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  name?: string | null;
  instructions?: FoodBookDomainEntitiesRecipeInstruction[] | null;
  /** @format uuid */
  recipeId: string;
  recipe?: FoodBookDomainEntitiesRecipe | null;
  translations?: FoodBookDomainEntitiesTranslationsRecipeStepTranslation[] | null;
}

export interface FoodBookDomainEntitiesRecipeTag {
  /** @format uuid */
  tagId: string;
  /** @format uuid */
  recipeId: string;
  tag?: FoodBookDomainEntitiesTag | null;
  recipe?: FoodBookDomainEntitiesRecipe | null;
}

export interface FoodBookDomainEntitiesTag {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  hidden: boolean;
  promoted: boolean;
  icon?: string | null;
  /** @format uuid */
  createdByUserId: string;
  /** @format date-time */
  createdOn: Date;
  /** @format uuid */
  updatedByUserId?: string | null;
  /** @format date-time */
  updatedOn?: Date | null;
  createdByUser?: FoodBookDomainEntitiesUser | null;
  updatedByUser?: FoodBookDomainEntitiesUser | null;
  translations?: FoodBookDomainEntitiesTranslationsTagTranslation[] | null;
  recipes?: FoodBookDomainEntitiesRecipeTag[] | null;
}

export type FoodBookDomainEntitiesTranslationsAuthorLinkTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  authorLinkId: string;
  name?: string | null;
  description?: string | null;
};

export type FoodBookDomainEntitiesTranslationsAuthorTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  authorId: string;
  biography?: string | null;
};

export type FoodBookDomainEntitiesTranslationsCollectionTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  collectionId: string;
  title?: string | null;
};

export type FoodBookDomainEntitiesTranslationsEquipmentTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  equipmentId: string;
  name?: string | null;
  pluralName?: string | null;
};

export type FoodBookDomainEntitiesTranslationsIngredientTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  ingredientId: string;
  name?: string | null;
  pluralName?: string | null;
};

export type FoodBookDomainEntitiesTranslationsRecipeInstructionTranslation =
  FoodBookDomainEntitiesCoreTranslationEntity & {
    /** @format uuid */
    id: string;
    /** @format uuid */
    recipeInstructionId: string;
    instruction?: string | null;
  };

export type FoodBookDomainEntitiesTranslationsRecipePartTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipePartId: string;
  name?: string | null;
};

export type FoodBookDomainEntitiesTranslationsRecipeStepTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeStepId: string;
  name?: string | null;
};

export type FoodBookDomainEntitiesTranslationsRecipeTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  name?: string | null;
  description?: string | null;
};

export type FoodBookDomainEntitiesTranslationsStringTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  key?: string | null;
  value?: string | null;
};

export type FoodBookDomainEntitiesTranslationsTagTranslation = FoodBookDomainEntitiesCoreTranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  tagId: string;
  name?: string | null;
};

export type FoodBookDomainEntitiesTranslationsUnitOfMeasurementTranslation =
  FoodBookDomainEntitiesCoreTranslationEntity & {
    /** @format uuid */
    id: string;
    /** @format uuid */
    unitOfMeasurementId: string;
    name?: string | null;
    pluralName?: string | null;
  };

export interface FoodBookDomainEntitiesUnitOfMeasurement {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  abbreviation?: string | null;
  type: MeasurementType;
  system?: MeasurementSystem | null;
  representAs: UnitOfMeasurementRepresentation;
  translations?: FoodBookDomainEntitiesTranslationsUnitOfMeasurementTranslation[] | null;
}

export interface FoodBookDomainEntitiesUser {
  /** @format uuid */
  id: string;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  /** @format date-time */
  lockoutEnd?: Date | null;
  lockoutEnabled: boolean;
  /** @format int32 */
  accessFailedCount: number;
  /** @format date-time */
  lastLoggedInOn?: Date | null;
  /** @format date-time */
  registeredOn: Date;
  firstName?: string | null;
  deactivated: boolean;
}

export interface FoodBookDomainTagsCommandsCreateTagCommand {
  languageCode?: string | null;
  name?: string | null;
  icon?: string | null;
}

export interface FoodBookDomainTagsCommandsCreateTagCommandResponse {
  /** @format uuid */
  id: string;
}

export interface FoodBookDomainTagsCommandsUpdateTagCommand {
  name?: string | null;
  icon?: string | null;
  hidden: boolean;
  promoted: boolean;
}

export type FoodBookDomainTagsCommandsUpdateTagCommandResponse = object;

export interface FoodBookServicesAPIModelsCollectionResultsDto1FoodBookAPICommonReadModelsLanguagesLanguageDto {
  results: FoodBookAPICommonReadModelsLanguagesLanguageDto[];
  /** @format int32 */
  totalResults: number;
}

export interface FoodBookServicesAPIModelsCollectionResultsDto1FoodBookDomainEntitiesUnitOfMeasurement {
  results: FoodBookDomainEntitiesUnitOfMeasurement[];
  /** @format int32 */
  totalResults: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsAuthorsAuthorDto {
  results: AdminAuthorDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsCollectionsCollectionDto {
  results: AdminCollectionDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsEquipmentPieceOfEquipmentDto {
  results: AdminPieceOfEquipmentDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsIngredientsIngredientDto {
  results: AdminIngredientDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsLogsLogDto {
  results: AdminLogDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsRecipesRecipeDto {
  results: AdminRecipeDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsSupportTicketsSupportTicketDto {
  results: AdminSupportTicketDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsTagsTagDto {
  results: AdminTagDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsAuthorsAuthorDto {
  results: FoodBookAPICommonReadModelsAuthorsAuthorDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsCollectionsCollectionDto {
  results: FoodBookAPICommonReadModelsCollectionsCollectionDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto {
  results: FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsIngredientsIngredientDto {
  results: FoodBookAPICommonReadModelsIngredientsIngredientDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsRecipesRecipeDto {
  results: FoodBookAPICommonReadModelsRecipesRecipeDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export interface FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsTagsTagDto {
  results: FoodBookAPICommonReadModelsTagsTagDto[];
  /** @format int32 */
  totalResults: number;
  /** @format int32 */
  page: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
}

export enum LogLevel {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
}

export enum MeasurementSystem {
  Imperial = "Imperial",
  Metric = "Metric",
}

export enum MeasurementType {
  Weight = "Weight",
  Volume = "Volume",
  Unit = "Unit",
}

export type MicrosoftAspNetCoreHttpHttpValidationProblemDetails = MicrosoftAspNetCoreMvcProblemDetails & {
  errors: Record<string, string[]>;
  [key: string]: any;
};

export interface MicrosoftAspNetCoreMvcProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export enum RecipeDifficulty {
  VeryEasy = "VeryEasy",
  Easy = "Easy",
  Average = "Average",
  Difficult = "Difficult",
  VeryDifficult = "VeryDifficult",
}

export enum RecipeState {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}

export enum RecipeType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Dessert = "Dessert",
  Snack = "Snack",
  Drink = "Drink",
}

export enum SupportTicketStatus {
  Open = "Open",
  Resolved = "Resolved",
}

export enum UnitOfMeasurementRepresentation {
  Integer = "Integer",
  Decimal = "Decimal",
  Fraction = "Fraction",
}

export interface AdminAuthorDto {
  /** @format uuid */
  id: string;
  state: AuthorState;
  name: string;
  biography: string;
  profilePictureUrl: string;
  links: AdminAuthorDtoLink[];
}

export interface AdminAuthorDtoLink {
  /** @format uuid */
  id: string;
  name: string;
  url: string;
}

export type AdminCollectionDto = FoodBookAPICommonReadModelsCollectionReferenceDto & {
  hidden: boolean;
  promoted: boolean;
};

export type AdminIngredientDto = FoodBookAPICommonReadModelsIngredientReferenceDto & {
  defaultUnitOfMeasurement:
    | FoodBookAPICommonReadModelsUnitOfMeasurementReferenceDto
    | FoodBookAPICommonReadModelsUnitOfMeasurementsUnitOfMeasurementDto;
};

export interface AdminLogDto {
  /** @format uuid */
  id: string;
  /** @format date-time */
  createdOn: Date;
  level: LogLevel;
  message: string;
  stackTrace: string;
}

export type AdminPieceOfEquipmentDto = FoodBookAPICommonReadModelsPieceOfEquipmentReferenceDto;

export type AdminRecipeDto = FoodBookAPICommonReadModelsRecipeReferenceDto & {
  description: string;
  state: RecipeState;
  /** @format date-time */
  createdOn: Date;
  /** @format date-time */
  publishedOn?: Date | null;
  difficulty: RecipeDifficulty;
  personal: boolean;
  /** @format int32 */
  prepTime: number;
  /** @format int32 */
  cookTime: number;
  /** @format int32 */
  totalTime: number;
  /** @format int32 */
  servings: number;
  containsAlcohol: boolean;
  /** @format double */
  rating: number;
  referenceUrl?: string | null;
  parts: AdminRecipeDtoPart[];
  steps: AdminRecipeDtoStep[];
  ingredients: (
    | FoodBookAPICommonReadModelsRecipeIngredientReferenceDto
    | FoodBookAPICommonReadModelsRecipesRecipeIngredientsDtoRecipeIngredientsDtoRecipeIngredient
  )[];
  equipment: AdminRecipeDtoRecipePieceOfEquipment[];
  nutrition: FoodBookAPICommonReadModelsRecipeNutritionReferenceDto;
  images: FoodBookAPICommonReadModelsRecipeImageReferenceDto[];
  tags: (FoodBookAPICommonReadModelsTagReferenceDto | FoodBookAPICommonReadModelsTagsTagDto | AdminTagDto)[];
};

export interface AdminRecipeDtoPart {
  /** @format uuid */
  id: string;
  name: string;
}

export type AdminRecipeDtoRecipePieceOfEquipment = FoodBookAPICommonReadModelsPieceOfEquipmentReferenceDto & {
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
};

export interface AdminRecipeDtoStep {
  /** @format uuid */
  id: string;
  name: string;
  instructions: AdminRecipeDtoStepInstruction[];
}

export interface AdminRecipeDtoStepInstruction {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  instruction: string;
}

export interface AdminSupportTicketDto {
  /** @format uuid */
  id: string;
  /** @format date-time */
  createdOn: Date;
  status: SupportTicketStatus;
  email: string;
  message: string;
}

export type AdminTagDto = FoodBookAPICommonReadModelsTagReferenceDto & {
  icon: string;
  hidden: boolean;
  promoted: boolean;
};

export namespace Auth {
  /**
   * No description
   * @tags Auth
   * @name Login
   * @request POST:/auth/login
   * @secure
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthLoginCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthLoginCommandResponse;
  }
  /**
   * No description
   * @tags Auth
   * @name RefreshTokens
   * @request POST:/auth/tokens/refresh
   * @secure
   */
  export namespace RefreshTokens {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthRefreshTokensCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthRefreshTokensCommandResponse;
  }
}

export namespace ForgotPassword {
  /**
   * No description
   * @tags Auth
   * @name ForgotPassword
   * @request POST:/forgot-password
   * @secure
   */
  export namespace ForgotPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthForgotPasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthForgotPasswordCommandResponse;
  }
}

export namespace ResetPassword {
  /**
   * No description
   * @tags Auth
   * @name ResetPassword
   * @request POST:/reset-password
   * @secure
   */
  export namespace ResetPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthResetPasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthResetPasswordCommandResponse;
  }
}

export namespace Users {
  /**
   * No description
   * @tags Auth
   * @name ChangeEmail
   * @request POST:/users/{userId}/change-email
   * @secure
   */
  export namespace ChangeEmail {
    export type RequestParams = {
      /** @format uuid */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthChangeEmailCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthChangeEmailCommandResponse;
  }
  /**
   * No description
   * @tags Auth
   * @name ChangePassword
   * @request POST:/users/{userId}/change-password
   * @secure
   */
  export namespace ChangePassword {
    export type RequestParams = {
      /** @format uuid */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthChangePasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthChangePasswordCommandResponse;
  }
  /**
   * No description
   * @tags Planner
   * @name AddRecipeToPlanner
   * @request POST:/users/{userId}/planner
   * @secure
   */
  export namespace AddRecipeToPlanner {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsPlannerAddRecipeToPlannerCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsPlannerAddRecipeToPlannerCommandResponse;
  }
  /**
   * No description
   * @tags Planner
   * @name GetPlanner
   * @request GET:/users/{userId}/planner
   * @secure
   */
  export namespace GetPlanner {
    export type RequestParams = {
      /** @format uuid */
      userId: string;
    };
    export type RequestQuery = {
      measurementSystem?: MeasurementSystem;
      /** @format date */
      dateFrom?: string;
      /** @format date */
      dateTo?: string;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsPlannerPlannerDto;
  }
  /**
   * No description
   * @tags PlannerIngredientList
   * @name GetPlannerIngredientList
   * @request GET:/users/{userId}/planner/ingredients
   * @secure
   */
  export namespace GetPlannerIngredientList {
    export type RequestParams = {
      /** @format uuid */
      userId: string;
    };
    export type RequestQuery = {
      /** @format date */
      dateFrom?: string;
      /** @format date */
      dateTo?: string;
      excludedPlannedRecipeIds?: string[];
      measurementSystem?: MeasurementSystem;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsPlannerPlannerIngredientListDto;
  }
  /**
   * No description
   * @tags User
   * @name QueryEmail
   * @request GET:/users/email/{email}
   * @secure
   */
  export namespace QueryEmail {
    export type RequestParams = {
      email: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadControllersQueryEmailResponse;
  }
  /**
   * No description
   * @tags User
   * @name GetMe
   * @request GET:/users/me
   * @secure
   */
  export namespace GetMe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsUsersUserDto;
  }
}

export namespace Authors {
  /**
   * No description
   * @tags Author
   * @name GetAuthor
   * @request GET:/authors/{id}
   * @secure
   */
  export namespace GetAuthor {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsAuthorsAuthorDto;
  }
  /**
   * No description
   * @tags Author
   * @name GetAuthors
   * @request GET:/authors
   * @secure
   */
  export namespace GetAuthors {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsAuthorsAuthorDto;
  }
}

export namespace Admin {
  /**
   * No description
   * @tags Author
   * @name AdminCreateAuthor
   * @request POST:/admin/authors
   * @secure
   */
  export namespace AdminCreateAuthor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainAuthorsCommandsCreateAuthorCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainAuthorsCommandsCreateAuthorCommandResponse;
  }
  /**
   * No description
   * @tags Author
   * @name AdminGetAuthors
   * @request GET:/admin/authors
   * @secure
   */
  export namespace AdminGetAuthors {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsAuthorsAuthorDto;
  }
  /**
   * No description
   * @tags Author
   * @name AdminUpdateAuthor
   * @request PUT:/admin/authors/{id}
   * @secure
   */
  export namespace AdminUpdateAuthor {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainAuthorsCommandsUpdateAuthorCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainAuthorsCommandsUpdateAuthorCommandResponse;
  }
  /**
   * No description
   * @tags Author
   * @name AdminGetAuthor
   * @request GET:/admin/authors/{id}
   * @secure
   */
  export namespace AdminGetAuthor {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminAuthorDto;
  }
  /**
   * No description
   * @tags Author
   * @name AdminUpdateAuthorProfilePicture
   * @request PUT:/admin/authors/{authorId}/profile-picture
   * @secure
   */
  export namespace AdminUpdateAuthorProfilePicture {
    export type RequestParams = {
      /** @format uuid */
      authorId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = {
      /** @format binary */
      file: File;
    };
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminCreateCollection
   * @request POST:/admin/collections
   * @secure
   */
  export namespace AdminCreateCollection {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCollectionsCommandsCreateCollectionCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCollectionsCommandsCreateCollectionCommandResponse;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminGetCollections
   * @request GET:/admin/collections
   * @secure
   */
  export namespace AdminGetCollections {
    export type RequestParams = {};
    export type RequestQuery = {
      hidden?: boolean;
      promoted?: boolean;
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsCollectionsCollectionDto;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminUpdateCollection
   * @request PUT:/admin/collections/{id}
   * @secure
   */
  export namespace AdminUpdateCollection {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCollectionsCommandsUpdateCollectionCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCollectionsCommandsUpdateCollectionCommandResponse;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminGetCollection
   * @request GET:/admin/collections/{id}
   * @secure
   */
  export namespace AdminGetCollection {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCollectionDto;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminAddRecipeToCollection
   * @request POST:/admin/collections/{collectionId}/recipes/{recipeId}
   * @secure
   */
  export namespace AdminAddRecipeToCollection {
    export type RequestParams = {
      /** @format uuid */
      collectionId: string;
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCollectionsCommandsAddRecipeToCollectionCommandResponse;
  }
  /**
   * No description
   * @tags Collection
   * @name AdminRemoveRecipeFromCollection
   * @request DELETE:/admin/collections/{collectionId}/recipes/{recipeId}
   * @secure
   */
  export namespace AdminRemoveRecipeFromCollection {
    export type RequestParams = {
      /** @format uuid */
      collectionId: string;
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCollectionsCommandsRemoveRecipeFromCollectionCommandResponse;
  }
  /**
   * No description
   * @tags ContactUs
   * @name AdminResolveSupportTicket
   * @request POST:/admin/support-tickets/{id}/resolve
   * @secure
   */
  export namespace AdminResolveSupportTicket {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Equipment
   * @name AdminUpdatePieceOfEquipment
   * @request PUT:/admin/equipment/{id}
   * @secure
   */
  export namespace AdminUpdatePieceOfEquipment {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsEquipmentUpdateEquipmentCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsEquipmentUpdateEquipmentCommandResponse;
  }
  /**
   * No description
   * @tags Equipment
   * @name AdminGetPieceOfEquipment
   * @request GET:/admin/equipment/{id}
   * @secure
   */
  export namespace AdminGetPieceOfEquipment {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminPieceOfEquipmentDto;
  }
  /**
   * No description
   * @tags Equipment
   * @name AdminGetEquipment
   * @request GET:/admin/equipment
   * @secure
   */
  export namespace AdminGetEquipment {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      personal?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsEquipmentPieceOfEquipmentDto;
  }
  /**
   * No description
   * @tags Ingredient
   * @name AdminUpdateIngredient
   * @request PUT:/admin/ingredients/{id}
   * @secure
   */
  export namespace AdminUpdateIngredient {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsIngredientsUpdateIngredientCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsIngredientsUpdateIngredientCommandResponse;
  }
  /**
   * No description
   * @tags Ingredient
   * @name AdminGetIngredient
   * @request GET:/admin/ingredients/{id}
   * @secure
   */
  export namespace AdminGetIngredient {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminIngredientDto;
  }
  /**
   * No description
   * @tags Ingredient
   * @name AdminGetIngredients
   * @request GET:/admin/ingredients
   * @secure
   */
  export namespace AdminGetIngredients {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      personal?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsIngredientsIngredientDto;
  }
  /**
   * No description
   * @tags Log
   * @name AdminGetLog
   * @request GET:/admin/logs/{id}
   * @secure
   */
  export namespace AdminGetLog {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminLogDto;
  }
  /**
   * No description
   * @tags Log
   * @name AdminGetLogs
   * @request GET:/admin/logs
   * @secure
   */
  export namespace AdminGetLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      levels?: LogLevel[];
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsLogsLogDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name AdminPublishRecipe
   * @request POST:/admin/recipes/{id}/publish
   * @secure
   */
  export namespace AdminPublishRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Recipe
   * @name AdminGetRecipe
   * @request GET:/admin/recipes/{id}
   * @secure
   */
  export namespace AdminGetRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminRecipeDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name AdminGetRecipes
   * @request GET:/admin/recipes
   * @secure
   */
  export namespace AdminGetRecipes {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      ingredientIds?: string[];
      equipmentIds?: string[];
      tagIds?: string[];
      collectionIds?: string[];
      /** @format int32 */
      minTotalTime?: number;
      /** @format int32 */
      maxTotalTime?: number;
      types?: RecipeType[];
      difficulties?: RecipeDifficulty[];
      states?: RecipeState[];
      personal?: boolean;
      /** @format uuid */
      variantOfRecipeId?: string;
      containsAlcohol?: boolean;
      /** @format uuid */
      authorId?: string;
      /** @format date-time */
      publishedAfter?: Date;
      /** @format date-time */
      publishedBefore?: Date;
      hidden?: boolean;
      promoted?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsRecipesRecipeDto;
  }
  /**
   * No description
   * @tags SupportTicket
   * @name AdminGetSupportTicket
   * @request GET:/admin/support-tickets/{id}
   * @secure
   */
  export namespace AdminGetSupportTicket {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminSupportTicketDto;
  }
  /**
   * No description
   * @tags SupportTicket
   * @name AdminGetSupportTickets
   * @request GET:/admin/support-tickets
   * @secure
   */
  export namespace AdminGetSupportTickets {
    export type RequestParams = {};
    export type RequestQuery = {
      status?: SupportTicketStatus;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsSupportTicketsSupportTicketDto;
  }
  /**
   * No description
   * @tags Tag
   * @name AdminCreateTag
   * @request POST:/admin/tags
   * @secure
   */
  export namespace AdminCreateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainTagsCommandsCreateTagCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainTagsCommandsCreateTagCommandResponse;
  }
  /**
   * No description
   * @tags Tag
   * @name AdminGetTags
   * @request GET:/admin/tags
   * @secure
   */
  export namespace AdminGetTags {
    export type RequestParams = {};
    export type RequestQuery = {
      hidden?: boolean;
      promoted?: boolean;
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsTagsTagDto;
  }
  /**
   * No description
   * @tags Tag
   * @name AdminUpdateTag
   * @request PUT:/admin/tags/{id}
   * @secure
   */
  export namespace AdminUpdateTag {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainTagsCommandsUpdateTagCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainTagsCommandsUpdateTagCommandResponse;
  }
  /**
   * No description
   * @tags Tag
   * @name AdminGetTag
   * @request GET:/admin/tags/{id}
   * @secure
   */
  export namespace AdminGetTag {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminTagDto;
  }
}

export namespace Collections {
  /**
   * No description
   * @tags Collection
   * @name GetCollection
   * @request GET:/collections/{id}
   * @secure
   */
  export namespace GetCollection {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsCollectionsCollectionDto;
  }
  /**
   * No description
   * @tags Collection
   * @name GetCollections
   * @request GET:/collections
   * @secure
   */
  export namespace GetCollections {
    export type RequestParams = {};
    export type RequestQuery = {
      hidden?: boolean;
      promoted?: boolean;
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsCollectionsCollectionDto;
  }
}

export namespace ContactUs {
  /**
   * No description
   * @tags ContactUs
   * @name ContactUs
   * @request POST:/contact-us
   * @secure
   */
  export namespace ContactUs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookAPICommonReadModelsContactUsContactUsDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Equipment {
  /**
   * No description
   * @tags Equipment
   * @name CreatePieceOfRequipment
   * @request POST:/equipment
   * @secure
   */
  export namespace CreatePieceOfRequipment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsEquipmentCreateEquipmentCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsEquipmentCreateEquipmentCommandResponse;
  }
  /**
   * No description
   * @tags Equipment
   * @name GetEquipment
   * @request GET:/equipment
   * @secure
   */
  export namespace GetEquipment {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      personal?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto;
  }
  /**
   * No description
   * @tags Equipment
   * @name GetPieceOfEquipment
   * @request GET:/equipment/{id}
   * @secure
   */
  export namespace GetPieceOfEquipment {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto;
  }
}

export namespace Recipes {
  /**
   * No description
   * @tags Favourite
   * @name FavouriteRecipe
   * @request POST:/recipes/{recipeId}/favourite
   * @secure
   */
  export namespace FavouriteRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookCommandsFavouriteRecipeCommandResponse;
  }
  /**
   * No description
   * @tags Favourite
   * @name UnfavouriteRecipe
   * @request POST:/recipes/{recipeId}/unfavourite
   * @secure
   */
  export namespace UnfavouriteRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookCommandsUnfavouriteRecipeCommandResponse;
  }
  /**
   * No description
   * @tags Rating
   * @name RateRecipe
   * @request PUT:/recipes/{recipeId}/rate
   * @secure
   */
  export namespace RateRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookCommandsRateRecipeCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookCommandsRateRecipeCommandResponse;
  }
  /**
   * No description
   * @tags Rating
   * @name GetUserRecipeRating
   * @request GET:/recipes/{recipeId}/rating/users/{userId}
   * @secure
   */
  export namespace GetUserRecipeRating {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
      /** @format uuid */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsRecipesRecipeRatingDto;
  }
  /**
   * No description
   * @tags Rating
   * @name GetRecipeRating
   * @request GET:/recipes/{recipeId}/rating
   * @secure
   */
  export namespace GetRecipeRating {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsRecipesRecipeRatingDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name CreateRecipe
   * @request POST:/recipes
   * @secure
   */
  export namespace CreateRecipe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookAPICommonWriteModelsRecipesRecipeCreationDto;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonWriteControllersRecipeCreationResponseDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name GetRecipes
   * @request GET:/recipes
   * @secure
   */
  export namespace GetRecipes {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      ingredientIds?: string[];
      equipmentIds?: string[];
      tagIds?: string[];
      collectionIds?: string[];
      /** @format int32 */
      minTotalTime?: number;
      /** @format int32 */
      maxTotalTime?: number;
      types?: RecipeType[];
      difficulties?: RecipeDifficulty[];
      states?: RecipeState[];
      personal?: boolean;
      /** @format uuid */
      variantOfRecipeId?: string;
      containsAlcohol?: boolean;
      /** @format uuid */
      authorId?: string;
      /** @format date-time */
      publishedAfter?: Date;
      /** @format date-time */
      publishedBefore?: Date;
      favourited?: boolean;
      hidden?: boolean;
      promoted?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsRecipesRecipeDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name UpdateRecipe
   * @request PUT:/recipes/{id}
   * @secure
   */
  export namespace UpdateRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookAPICommonWriteModelsRecipesRecipeUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Recipe
   * @name DeleteRecipe
   * @request DELETE:/recipes/{id}
   * @secure
   */
  export namespace DeleteRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Recipe
   * @name GetRecipe
   * @request GET:/recipes/{id}
   * @secure
   */
  export namespace GetRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsRecipesRecipeDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name TagRecipe
   * @request POST:/recipes/{recipeId}/tags/{tagId}
   * @secure
   */
  export namespace TagRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
      /** @format uuid */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Recipe
   * @name UntagRecipe
   * @request DELETE:/recipes/{recipeId}/tags/{tagId}
   * @secure
   */
  export namespace UntagRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
      /** @format uuid */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Recipe
   * @name GetRecipeIngredients
   * @request GET:/recipes/{recipeId}/ingredients
   * @secure
   */
  export namespace GetRecipeIngredients {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {
      measurementSystem?: MeasurementSystem;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsRecipesRecipeIngredientsDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name GetRecipeInstructions
   * @request GET:/recipes/{id}/instructions
   * @secure
   */
  export namespace GetRecipeInstructions {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsRecipesRecipeInstructionsDto;
  }
  /**
   * No description
   * @tags RecipeImage
   * @name UploadImageForRecipe
   * @request POST:/recipes/{recipeId}/images
   * @secure
   */
  export namespace UploadImageForRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = {
      /** @format binary */
      file: File;
      /** @format int32 */
      sequence?: number;
    };
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonWriteControllersRecipeImageUploadResponseDto;
  }
  /**
   * No description
   * @tags RecipeImage
   * @name GetImagesForRecipe
   * @request GET:/recipes/{recipeId}/images
   * @secure
   */
  export namespace GetImagesForRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags RecipeVariant
   * @name CreateVariantOfRecipe
   * @request POST:/recipes/{recipeId}/variants
   * @secure
   */
  export namespace CreateVariantOfRecipe {
    export type RequestParams = {
      /** @format uuid */
      recipeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookAPICommonWriteControllersAddVariantDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Ingredients {
  /**
   * No description
   * @tags Ingredient
   * @name CreateIngredient
   * @request POST:/ingredients
   * @secure
   */
  export namespace CreateIngredient {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsIngredientsCreateIngredientCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsIngredientsCreateIngredientCommandResponse;
  }
  /**
   * No description
   * @tags Ingredient
   * @name GetIngredients
   * @request GET:/ingredients
   * @secure
   */
  export namespace GetIngredients {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: string;
      random?: boolean;
      personal?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsIngredientsIngredientDto;
  }
  /**
   * No description
   * @tags Ingredient
   * @name GetIngredient
   * @request GET:/ingredients/{id}
   * @secure
   */
  export namespace GetIngredient {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsIngredientsIngredientDto;
  }
}

export namespace Languages {
  /**
   * No description
   * @tags Language
   * @name GetLanguages
   * @request GET:/languages
   * @secure
   */
  export namespace GetLanguages {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      FoodBookServicesAPIModelsCollectionResultsDto1FoodBookAPICommonReadModelsLanguagesLanguageDto;
  }
}

export namespace PlannedRecipes {
  /**
   * No description
   * @tags Planner
   * @name UpdatePlannedRecipe
   * @request PUT:/planned-recipes/{id}
   * @secure
   */
  export namespace UpdatePlannedRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommandResponse;
  }
  /**
   * No description
   * @tags Planner
   * @name RemovePlannedRecipe
   * @request DELETE:/planned-recipes/{id}
   * @secure
   */
  export namespace RemovePlannedRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsPlannerRemovePlannedRecipeCommandResponse;
  }
}

export namespace RecipeImages {
  /**
   * No description
   * @tags RecipeImage
   * @name DeleteRecipeImage
   * @request DELETE:/recipe-images/{id}
   * @secure
   */
  export namespace DeleteRecipeImage {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags RecipeImage
   * @name UpdateRecipeImageIndex
   * @request PUT:/recipe-images/{id}/index
   * @secure
   */
  export namespace UpdateRecipeImageIndex {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FoodBookAPICommonWriteModelsRecipesRecipeImageIndexUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Resize {
  /**
   * No description
   * @tags Resize
   * @name Resize
   * @request GET:/resize
   * @secure
   */
  export namespace Resize {
    export type RequestParams = {};
    export type RequestQuery = {
      key: string;
      /** @format int32 */
      width?: number;
      /** @format int32 */
      height?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
}

export namespace Version {
  /**
   * No description
   * @tags System
   * @name GetVersion
   * @request GET:/version
   * @secure
   */
  export namespace GetVersion {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
}

export namespace System {
  /**
   * No description
   * @tags System
   * @name GetSystem
   * @request GET:/system
   * @secure
   */
  export namespace GetSystem {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsSystemSystemDto;
  }
}

export namespace Tags {
  /**
   * No description
   * @tags Tag
   * @name GetTag
   * @request GET:/tags/{id}
   * @secure
   */
  export namespace GetTag {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookAPICommonReadModelsTagsTagDto;
  }
  /**
   * No description
   * @tags Tag
   * @name GetTags
   * @request GET:/tags
   * @secure
   */
  export namespace GetTags {
    export type RequestParams = {};
    export type RequestQuery = {
      hidden?: boolean;
      promoted?: boolean;
      search?: string;
      random?: boolean;
      /** @format int32 */
      page?: number;
      /** @format int32 */
      pageSize?: number;
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsTagsTagDto;
  }
}

export namespace UnitOfMeasurements {
  /**
   * No description
   * @tags UnitOfMeasurement
   * @name GetUnitOfMeasurements
   * @request GET:/unit-of-measurements
   * @secure
   */
  export namespace GetUnitOfMeasurements {
    export type RequestParams = {};
    export type RequestQuery = {
      sortBy?: string;
      sortDesc?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookServicesAPIModelsCollectionResultsDto1FoodBookDomainEntitiesUnitOfMeasurement;
  }
}

export namespace Register {
  /**
   * No description
   * @tags User
   * @name RegisterUser
   * @request POST:/register
   * @secure
   */
  export namespace RegisterUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoodBookDomainCommandsAuthRegisterUserCommand;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthRegisterUserCommandResponse;
  }
}

export namespace Me {
  /**
   * No description
   * @tags User
   * @name DeleteAccount
   * @request DELETE:/me
   * @secure
   */
  export namespace DeleteAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FoodBookDomainCommandsAuthDeleteAccountCommandResponse;
  }
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title FoodBook.API
 * @version v1
 * @contact Matthew Chambers
 *
 * FoodBook API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/auth/login
     * @secure
     */
    login: (data: FoodBookDomainCommandsAuthLoginCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthLoginCommandResponse, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RefreshTokens
     * @request POST:/auth/tokens/refresh
     * @secure
     */
    refreshTokens: (data: FoodBookDomainCommandsAuthRefreshTokensCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthRefreshTokensCommandResponse, any>({
        path: `/auth/tokens/refresh`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  forgotPassword = {
    /**
     * No description
     *
     * @tags Auth
     * @name ForgotPassword
     * @request POST:/forgot-password
     * @secure
     */
    forgotPassword: (data: FoodBookDomainCommandsAuthForgotPasswordCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthForgotPasswordCommandResponse, any>({
        path: `/forgot-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  resetPassword = {
    /**
     * No description
     *
     * @tags Auth
     * @name ResetPassword
     * @request POST:/reset-password
     * @secure
     */
    resetPassword: (data: FoodBookDomainCommandsAuthResetPasswordCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthResetPasswordCommandResponse, any>({
        path: `/reset-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Auth
     * @name ChangeEmail
     * @request POST:/users/{userId}/change-email
     * @secure
     */
    changeEmail: (userId: string, data: FoodBookDomainCommandsAuthChangeEmailCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthChangeEmailCommandResponse, any>({
        path: `/users/${userId}/change-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name ChangePassword
     * @request POST:/users/{userId}/change-password
     * @secure
     */
    changePassword: (
      userId: string,
      data: FoodBookDomainCommandsAuthChangePasswordCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsAuthChangePasswordCommandResponse, any>({
        path: `/users/${userId}/change-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name AddRecipeToPlanner
     * @request POST:/users/{userId}/planner
     * @secure
     */
    addRecipeToPlanner: (
      userId: string,
      data: FoodBookDomainCommandsPlannerAddRecipeToPlannerCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsPlannerAddRecipeToPlannerCommandResponse, any>({
        path: `/users/${userId}/planner`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name GetPlanner
     * @request GET:/users/{userId}/planner
     * @secure
     */
    getPlanner: (
      userId: string,
      query?: {
        measurementSystem?: MeasurementSystem;
        /** @format date */
        dateFrom?: string;
        /** @format date */
        dateTo?: string;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookAPICommonReadModelsPlannerPlannerDto, any>({
        path: `/users/${userId}/planner`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PlannerIngredientList
     * @name GetPlannerIngredientList
     * @request GET:/users/{userId}/planner/ingredients
     * @secure
     */
    getPlannerIngredientList: (
      userId: string,
      query?: {
        /** @format date */
        dateFrom?: string;
        /** @format date */
        dateTo?: string;
        excludedPlannedRecipeIds?: string[];
        measurementSystem?: MeasurementSystem;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookAPICommonReadModelsPlannerPlannerIngredientListDto, any>({
        path: `/users/${userId}/planner/ingredients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name QueryEmail
     * @request GET:/users/email/{email}
     * @secure
     */
    queryEmail: (email: string, params: RequestParams = {}) =>
      this.request<FoodBookAPICommonReadControllersQueryEmailResponse, any>({
        path: `/users/email/${email}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetMe
     * @request GET:/users/me
     * @secure
     */
    getMe: (params: RequestParams = {}) =>
      this.request<FoodBookAPICommonReadModelsUsersUserDto, any>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  authors = {
    /**
     * No description
     *
     * @tags Author
     * @name GetAuthor
     * @request GET:/authors/{id}
     * @secure
     */
    getAuthor: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsAuthorsAuthorDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/authors/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name GetAuthors
     * @request GET:/authors
     * @secure
     */
    getAuthors: (
      query?: {
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsAuthorsAuthorDto, any>({
        path: `/authors`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags Author
     * @name AdminCreateAuthor
     * @request POST:/admin/authors
     * @secure
     */
    admin_CreateAuthor: (data: FoodBookDomainAuthorsCommandsCreateAuthorCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainAuthorsCommandsCreateAuthorCommandResponse, any>({
        path: `/admin/authors`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AdminGetAuthors
     * @request GET:/admin/authors
     * @secure
     */
    admin_GetAuthors: (
      query?: {
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsAuthorsAuthorDto, any>({
        path: `/admin/authors`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AdminUpdateAuthor
     * @request PUT:/admin/authors/{id}
     * @secure
     */
    admin_UpdateAuthor: (
      id: string,
      data: FoodBookDomainAuthorsCommandsUpdateAuthorCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainAuthorsCommandsUpdateAuthorCommandResponse, any>({
        path: `/admin/authors/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AdminGetAuthor
     * @request GET:/admin/authors/{id}
     * @secure
     */
    admin_GetAuthor: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminAuthorDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/authors/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AdminUpdateAuthorProfilePicture
     * @request PUT:/admin/authors/{authorId}/profile-picture
     * @secure
     */
    admin_UpdateAuthorProfilePicture: (
      authorId: string,
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/admin/authors/${authorId}/profile-picture`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminCreateCollection
     * @request POST:/admin/collections
     * @secure
     */
    admin_CreateCollection: (
      data: FoodBookDomainCollectionsCommandsCreateCollectionCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCollectionsCommandsCreateCollectionCommandResponse, any>({
        path: `/admin/collections`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminGetCollections
     * @request GET:/admin/collections
     * @secure
     */
    admin_GetCollections: (
      query?: {
        hidden?: boolean;
        promoted?: boolean;
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsCollectionsCollectionDto, any>({
        path: `/admin/collections`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminUpdateCollection
     * @request PUT:/admin/collections/{id}
     * @secure
     */
    admin_UpdateCollection: (
      id: string,
      data: FoodBookDomainCollectionsCommandsUpdateCollectionCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCollectionsCommandsUpdateCollectionCommandResponse, any>({
        path: `/admin/collections/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminGetCollection
     * @request GET:/admin/collections/{id}
     * @secure
     */
    admin_GetCollection: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminCollectionDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/collections/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminAddRecipeToCollection
     * @request POST:/admin/collections/{collectionId}/recipes/{recipeId}
     * @secure
     */
    admin_AddRecipeToCollection: (collectionId: string, recipeId: string, params: RequestParams = {}) =>
      this.request<FoodBookDomainCollectionsCommandsAddRecipeToCollectionCommandResponse, any>({
        path: `/admin/collections/${collectionId}/recipes/${recipeId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name AdminRemoveRecipeFromCollection
     * @request DELETE:/admin/collections/{collectionId}/recipes/{recipeId}
     * @secure
     */
    admin_RemoveRecipeFromCollection: (collectionId: string, recipeId: string, params: RequestParams = {}) =>
      this.request<FoodBookDomainCollectionsCommandsRemoveRecipeFromCollectionCommandResponse, any>({
        path: `/admin/collections/${collectionId}/recipes/${recipeId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ContactUs
     * @name AdminResolveSupportTicket
     * @request POST:/admin/support-tickets/{id}/resolve
     * @secure
     */
    admin_ResolveSupportTicket: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/support-tickets/${id}/resolve`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name AdminUpdatePieceOfEquipment
     * @request PUT:/admin/equipment/{id}
     * @secure
     */
    admin_UpdatePieceOfEquipment: (
      id: string,
      data: FoodBookDomainCommandsEquipmentUpdateEquipmentCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsEquipmentUpdateEquipmentCommandResponse, any>({
        path: `/admin/equipment/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name AdminGetPieceOfEquipment
     * @request GET:/admin/equipment/{id}
     * @secure
     */
    admin_GetPieceOfEquipment: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminPieceOfEquipmentDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/equipment/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name AdminGetEquipment
     * @request GET:/admin/equipment
     * @secure
     */
    admin_GetEquipment: (
      query?: {
        search?: string;
        personal?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsEquipmentPieceOfEquipmentDto,
        any
      >({
        path: `/admin/equipment`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name AdminUpdateIngredient
     * @request PUT:/admin/ingredients/{id}
     * @secure
     */
    admin_UpdateIngredient: (
      id: string,
      data: FoodBookDomainCommandsIngredientsUpdateIngredientCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsIngredientsUpdateIngredientCommandResponse, any>({
        path: `/admin/ingredients/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name AdminGetIngredient
     * @request GET:/admin/ingredients/{id}
     * @secure
     */
    admin_GetIngredient: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminIngredientDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/ingredients/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name AdminGetIngredients
     * @request GET:/admin/ingredients
     * @secure
     */
    admin_GetIngredients: (
      query?: {
        search?: string;
        random?: boolean;
        personal?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsIngredientsIngredientDto, any>({
        path: `/admin/ingredients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Log
     * @name AdminGetLog
     * @request GET:/admin/logs/{id}
     * @secure
     */
    admin_GetLog: (id: string, params: RequestParams = {}) =>
      this.request<AdminLogDto, any>({
        path: `/admin/logs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Log
     * @name AdminGetLogs
     * @request GET:/admin/logs
     * @secure
     */
    admin_GetLogs: (
      query?: {
        levels?: LogLevel[];
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsLogsLogDto, any>({
        path: `/admin/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name AdminPublishRecipe
     * @request POST:/admin/recipes/{id}/publish
     * @secure
     */
    admin_PublishRecipe: (id: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/admin/recipes/${id}/publish`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name AdminGetRecipe
     * @request GET:/admin/recipes/{id}
     * @secure
     */
    admin_GetRecipe: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminRecipeDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/recipes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name AdminGetRecipes
     * @request GET:/admin/recipes
     * @secure
     */
    admin_GetRecipes: (
      query?: {
        search?: string;
        random?: boolean;
        ingredientIds?: string[];
        equipmentIds?: string[];
        tagIds?: string[];
        collectionIds?: string[];
        /** @format int32 */
        minTotalTime?: number;
        /** @format int32 */
        maxTotalTime?: number;
        types?: RecipeType[];
        difficulties?: RecipeDifficulty[];
        states?: RecipeState[];
        personal?: boolean;
        /** @format uuid */
        variantOfRecipeId?: string;
        containsAlcohol?: boolean;
        /** @format uuid */
        authorId?: string;
        /** @format date-time */
        publishedAfter?: Date;
        /** @format date-time */
        publishedBefore?: Date;
        hidden?: boolean;
        promoted?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsRecipesRecipeDto, any>({
        path: `/admin/recipes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SupportTicket
     * @name AdminGetSupportTicket
     * @request GET:/admin/support-tickets/{id}
     * @secure
     */
    admin_GetSupportTicket: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminSupportTicketDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/support-tickets/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SupportTicket
     * @name AdminGetSupportTickets
     * @request GET:/admin/support-tickets
     * @secure
     */
    admin_GetSupportTickets: (
      query?: {
        status?: SupportTicketStatus;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsSupportTicketsSupportTicketDto,
        any
      >({
        path: `/admin/support-tickets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name AdminCreateTag
     * @request POST:/admin/tags
     * @secure
     */
    admin_CreateTag: (data: FoodBookDomainTagsCommandsCreateTagCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainTagsCommandsCreateTagCommandResponse, any>({
        path: `/admin/tags`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name AdminGetTags
     * @request GET:/admin/tags
     * @secure
     */
    admin_GetTags: (
      query?: {
        hidden?: boolean;
        promoted?: boolean;
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPIAdminReadModelsTagsTagDto, any>({
        path: `/admin/tags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name AdminUpdateTag
     * @request PUT:/admin/tags/{id}
     * @secure
     */
    admin_UpdateTag: (id: string, data: FoodBookDomainTagsCommandsUpdateTagCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainTagsCommandsUpdateTagCommandResponse, any>({
        path: `/admin/tags/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name AdminGetTag
     * @request GET:/admin/tags/{id}
     * @secure
     */
    admin_GetTag: (id: string, params: RequestParams = {}) =>
      this.request<
        AdminTagDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/admin/tags/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  collections = {
    /**
     * No description
     *
     * @tags Collection
     * @name GetCollection
     * @request GET:/collections/{id}
     * @secure
     */
    getCollection: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsCollectionsCollectionDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/collections/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection
     * @name GetCollections
     * @request GET:/collections
     * @secure
     */
    getCollections: (
      query?: {
        hidden?: boolean;
        promoted?: boolean;
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsCollectionsCollectionDto, any>({
        path: `/collections`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  contactUs = {
    /**
     * No description
     *
     * @tags ContactUs
     * @name ContactUs
     * @request POST:/contact-us
     * @secure
     */
    contactUs: (data: FoodBookAPICommonReadModelsContactUsContactUsDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/contact-us`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  equipment = {
    /**
     * No description
     *
     * @tags Equipment
     * @name CreatePieceOfRequipment
     * @request POST:/equipment
     * @secure
     */
    createPieceOfRequipment: (
      data: FoodBookDomainCommandsEquipmentCreateEquipmentCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsEquipmentCreateEquipmentCommandResponse, any>({
        path: `/equipment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name GetEquipment
     * @request GET:/equipment
     * @secure
     */
    getEquipment: (
      query?: {
        search?: string;
        personal?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto,
        any
      >({
        path: `/equipment`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name GetPieceOfEquipment
     * @request GET:/equipment/{id}
     * @secure
     */
    getPieceOfEquipment: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsEquipmentPieceOfEquipmentDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/equipment/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  recipes = {
    /**
     * No description
     *
     * @tags Favourite
     * @name FavouriteRecipe
     * @request POST:/recipes/{recipeId}/favourite
     * @secure
     */
    favouriteRecipe: (recipeId: string, params: RequestParams = {}) =>
      this.request<FoodBookCommandsFavouriteRecipeCommandResponse, any>({
        path: `/recipes/${recipeId}/favourite`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favourite
     * @name UnfavouriteRecipe
     * @request POST:/recipes/{recipeId}/unfavourite
     * @secure
     */
    unfavouriteRecipe: (recipeId: string, params: RequestParams = {}) =>
      this.request<FoodBookCommandsUnfavouriteRecipeCommandResponse, any>({
        path: `/recipes/${recipeId}/unfavourite`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rating
     * @name RateRecipe
     * @request PUT:/recipes/{recipeId}/rate
     * @secure
     */
    rateRecipe: (recipeId: string, data: FoodBookCommandsRateRecipeCommand, params: RequestParams = {}) =>
      this.request<FoodBookCommandsRateRecipeCommandResponse, any>({
        path: `/recipes/${recipeId}/rate`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rating
     * @name GetUserRecipeRating
     * @request GET:/recipes/{recipeId}/rating/users/{userId}
     * @secure
     */
    getUserRecipeRating: (recipeId: string, userId: string, params: RequestParams = {}) =>
      this.request<FoodBookAPICommonReadModelsRecipesRecipeRatingDto, any>({
        path: `/recipes/${recipeId}/rating/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rating
     * @name GetRecipeRating
     * @request GET:/recipes/{recipeId}/rating
     * @secure
     */
    getRecipeRating: (recipeId: string, params: RequestParams = {}) =>
      this.request<FoodBookAPICommonReadModelsRecipesRecipeRatingDto, any>({
        path: `/recipes/${recipeId}/rating`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name CreateRecipe
     * @request POST:/recipes
     * @secure
     */
    createRecipe: (data: FoodBookAPICommonWriteModelsRecipesRecipeCreationDto, params: RequestParams = {}) =>
      this.request<FoodBookAPICommonWriteControllersRecipeCreationResponseDto, any>({
        path: `/recipes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipes
     * @request GET:/recipes
     * @secure
     */
    getRecipes: (
      query?: {
        search?: string;
        random?: boolean;
        ingredientIds?: string[];
        equipmentIds?: string[];
        tagIds?: string[];
        collectionIds?: string[];
        /** @format int32 */
        minTotalTime?: number;
        /** @format int32 */
        maxTotalTime?: number;
        types?: RecipeType[];
        difficulties?: RecipeDifficulty[];
        states?: RecipeState[];
        personal?: boolean;
        /** @format uuid */
        variantOfRecipeId?: string;
        containsAlcohol?: boolean;
        /** @format uuid */
        authorId?: string;
        /** @format date-time */
        publishedAfter?: Date;
        /** @format date-time */
        publishedBefore?: Date;
        favourited?: boolean;
        hidden?: boolean;
        promoted?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsRecipesRecipeDto, any>({
        path: `/recipes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name UpdateRecipe
     * @request PUT:/recipes/{id}
     * @secure
     */
    updateRecipe: (id: string, data: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDto, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/recipes/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name DeleteRecipe
     * @request DELETE:/recipes/{id}
     * @secure
     */
    deleteRecipe: (id: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/recipes/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipe
     * @request GET:/recipes/{id}
     * @secure
     */
    getRecipe: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsRecipesRecipeDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/recipes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name TagRecipe
     * @request POST:/recipes/{recipeId}/tags/{tagId}
     * @secure
     */
    tagRecipe: (recipeId: string, tagId: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/recipes/${recipeId}/tags/${tagId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name UntagRecipe
     * @request DELETE:/recipes/{recipeId}/tags/{tagId}
     * @secure
     */
    untagRecipe: (recipeId: string, tagId: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/recipes/${recipeId}/tags/${tagId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipeIngredients
     * @request GET:/recipes/{recipeId}/ingredients
     * @secure
     */
    getRecipeIngredients: (
      recipeId: string,
      query?: {
        measurementSystem?: MeasurementSystem;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookAPICommonReadModelsRecipesRecipeIngredientsDto, any>({
        path: `/recipes/${recipeId}/ingredients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name GetRecipeInstructions
     * @request GET:/recipes/{id}/instructions
     * @secure
     */
    getRecipeInstructions: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsRecipesRecipeInstructionsDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/recipes/${id}/instructions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeImage
     * @name UploadImageForRecipe
     * @request POST:/recipes/{recipeId}/images
     * @secure
     */
    uploadImageForRecipe: (
      recipeId: string,
      data: {
        /** @format binary */
        file: File;
        /** @format int32 */
        sequence?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookAPICommonWriteControllersRecipeImageUploadResponseDto, any>({
        path: `/recipes/${recipeId}/images`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeImage
     * @name GetImagesForRecipe
     * @request GET:/recipes/{recipeId}/images
     * @secure
     */
    getImagesForRecipe: (recipeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipes/${recipeId}/images`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeVariant
     * @name CreateVariantOfRecipe
     * @request POST:/recipes/{recipeId}/variants
     * @secure
     */
    createVariantOfRecipe: (
      recipeId: string,
      data: FoodBookAPICommonWriteControllersAddVariantDto,
      params: RequestParams = {},
    ) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/recipes/${recipeId}/variants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  ingredients = {
    /**
     * No description
     *
     * @tags Ingredient
     * @name CreateIngredient
     * @request POST:/ingredients
     * @secure
     */
    createIngredient: (data: FoodBookDomainCommandsIngredientsCreateIngredientCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsIngredientsCreateIngredientCommandResponse, any>({
        path: `/ingredients`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name GetIngredients
     * @request GET:/ingredients
     * @secure
     */
    getIngredients: (
      query?: {
        search?: string;
        random?: boolean;
        personal?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsIngredientsIngredientDto, any>({
        path: `/ingredients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingredient
     * @name GetIngredient
     * @request GET:/ingredients/{id}
     * @secure
     */
    getIngredient: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsIngredientsIngredientDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/ingredients/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  languages = {
    /**
     * No description
     *
     * @tags Language
     * @name GetLanguages
     * @request GET:/languages
     * @secure
     */
    getLanguages: (params: RequestParams = {}) =>
      this.request<FoodBookServicesAPIModelsCollectionResultsDto1FoodBookAPICommonReadModelsLanguagesLanguageDto, any>({
        path: `/languages`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  plannedRecipes = {
    /**
     * No description
     *
     * @tags Planner
     * @name UpdatePlannedRecipe
     * @request PUT:/planned-recipes/{id}
     * @secure
     */
    updatePlannedRecipe: (
      id: string,
      data: FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommand,
      params: RequestParams = {},
    ) =>
      this.request<FoodBookDomainCommandsPlannerUpdatePlannedRecipeCommandResponse, any>({
        path: `/planned-recipes/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Planner
     * @name RemovePlannedRecipe
     * @request DELETE:/planned-recipes/{id}
     * @secure
     */
    removePlannedRecipe: (id: string, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsPlannerRemovePlannedRecipeCommandResponse, any>({
        path: `/planned-recipes/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  recipeImages = {
    /**
     * No description
     *
     * @tags RecipeImage
     * @name DeleteRecipeImage
     * @request DELETE:/recipe-images/{id}
     * @secure
     */
    deleteRecipeImage: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipe-images/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RecipeImage
     * @name UpdateRecipeImageIndex
     * @request PUT:/recipe-images/{id}/index
     * @secure
     */
    updateRecipeImageIndex: (
      id: string,
      data: FoodBookAPICommonWriteModelsRecipesRecipeImageIndexUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/recipe-images/${id}/index`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  resize = {
    /**
     * No description
     *
     * @tags Resize
     * @name Resize
     * @request GET:/resize
     * @secure
     */
    resize: (
      query: {
        key: string;
        /** @format int32 */
        width?: number;
        /** @format int32 */
        height?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/resize`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  version = {
    /**
     * No description
     *
     * @tags System
     * @name GetVersion
     * @request GET:/version
     * @secure
     */
    getVersion: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/version`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  system = {
    /**
     * No description
     *
     * @tags System
     * @name GetSystem
     * @request GET:/system
     * @secure
     */
    getSystem: (params: RequestParams = {}) =>
      this.request<FoodBookAPICommonReadModelsSystemSystemDto, any>({
        path: `/system`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * No description
     *
     * @tags Tag
     * @name GetTag
     * @request GET:/tags/{id}
     * @secure
     */
    getTag: (id: string, params: RequestParams = {}) =>
      this.request<
        FoodBookAPICommonReadModelsTagsTagDto,
        MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails
      >({
        path: `/tags/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name GetTags
     * @request GET:/tags
     * @secure
     */
    getTags: (
      query?: {
        hidden?: boolean;
        promoted?: boolean;
        search?: string;
        random?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsPagedResultsDto1FoodBookAPICommonReadModelsTagsTagDto, any>({
        path: `/tags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  unitOfMeasurements = {
    /**
     * No description
     *
     * @tags UnitOfMeasurement
     * @name GetUnitOfMeasurements
     * @request GET:/unit-of-measurements
     * @secure
     */
    getUnitOfMeasurements: (
      query?: {
        sortBy?: string;
        sortDesc?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodBookServicesAPIModelsCollectionResultsDto1FoodBookDomainEntitiesUnitOfMeasurement, any>({
        path: `/unit-of-measurements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags User
     * @name RegisterUser
     * @request POST:/register
     * @secure
     */
    registerUser: (data: FoodBookDomainCommandsAuthRegisterUserCommand, params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthRegisterUserCommandResponse, any>({
        path: `/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  me = {
    /**
     * No description
     *
     * @tags User
     * @name DeleteAccount
     * @request DELETE:/me
     * @secure
     */
    deleteAccount: (params: RequestParams = {}) =>
      this.request<FoodBookDomainCommandsAuthDeleteAccountCommandResponse, any>({
        path: `/me`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
