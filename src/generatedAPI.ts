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

export interface AddRecipeToPlannerCommand {
  /** @format uuid */
  userId: string;
  /** @format uuid */
  recipeId: string;
  dates?: string[] | null;
  /** @format int32 */
  servings: number;
}

export interface AddRecipeToPlannerCommandResponse {
  plannedRecipes?: AddRecipeToPlannerCommandResponsePlannedRecipe[] | null;
}

export interface AddRecipeToPlannerCommandResponsePlannedRecipe {
  /** @format uuid */
  id: string;
}

export interface Author {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  state: AuthorState;
  name?: string | null;
  biography?: string | null;
  links?: AuthorLink[] | null;
  translations?: AuthorTranslation[] | null;
}

export interface AuthorLink {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  /** @format uuid */
  authorId: string;
  name?: string | null;
  url?: string | null;
  author?: Author | null;
  translations?: AuthorLinkTranslation[] | null;
}

export type AuthorLinkTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  authorLinkId: string;
  name?: string | null;
};

export enum AuthorState {
  Published = "Published",
  Archived = "Archived",
}

export type AuthorTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  authorId: string;
  biography?: string | null;
};

export interface ChangeEmailCommand {
  /** @format uuid */
  userId: string;
  newEmail?: string | null;
  password?: string | null;
  language?: string | null;
}

export type ChangeEmailCommandResponse = object;

export interface ChangePasswordCommand {
  /** @format uuid */
  userId: string;
  currentPassword?: string | null;
  newPassword?: string | null;
  language?: string | null;
}

export type ChangePasswordCommandResponse = object;

export interface Collection {
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
  createdByUser?: User | null;
  updatedByUser?: User | null;
  translations?: CollectionTranslation[] | null;
  recipes?: CollectionRecipe[] | null;
}

export interface CollectionRecipe {
  /** @format uuid */
  collectionId: string;
  /** @format uuid */
  recipeId: string;
  collection?: Collection | null;
  recipe?: Recipe | null;
}

export type CollectionTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  collectionId: string;
  title?: string | null;
};

export interface CreateIngredientCommand {
  languageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
  personal: boolean;
}

export interface CreateIngredientCommandResponse {
  /** @format uuid */
  id: string;
}

export interface CreatePieceOfEquipmentCommand {
  languageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  personal: boolean;
}

export interface CreatePieceOfEquipmentCommandResponse {
  /** @format uuid */
  id: string;
}

export type DeleteAccountCommandResponse = object;

export type EquipmentTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  equipmentId: string;
  name?: string | null;
  pluralName?: string | null;
};

export interface FavouritedRecipe {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  /** @format uuid */
  userId: string;
  recipe?: Recipe | null;
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
  instructions: RecipeInstruction[];
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
  ingredients: FoodBookAPICommonWriteModelsRecipesRecipeUpdateDtoIngredient[];
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
  instructions: RecipeInstruction[];
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

export interface FoodBookServicesAPIModelsCollectionResultsDto1FoodBookAPICommonReadModelsLanguagesLanguageDto {
  results: FoodBookAPICommonReadModelsLanguagesLanguageDto[];
  /** @format int32 */
  totalResults: number;
}

export interface FoodBookServicesAPIModelsCollectionResultsDto1FoodBookDomainEntitiesUnitOfMeasurement {
  results: UnitOfMeasurement[];
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

export interface ForgotPasswordCommand {
  email?: string | null;
  language?: string | null;
}

export type ForgotPasswordCommandResponse = object;

export interface Ingredient {
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
  createdByUser?: User | null;
  updatedByUser?: User | null;
  translations?: IngredientTranslation[] | null;
  defaultUnitOfMeasurement?: UnitOfMeasurement | null;
}

export type IngredientTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  ingredientId: string;
  name?: string | null;
  pluralName?: string | null;
};

export enum LogLevel {
  Trace = "Trace",
  Debug = "Debug",
  Information = "Information",
  Warning = "Warning",
  Error = "Error",
  Critical = "Critical",
  None = "None",
}

export interface LoginCommand {
  email?: string | null;
  password?: string | null;
}

export interface LoginCommandResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
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

export interface PieceOfEquipment {
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
  createdByUser?: User | null;
  updatedByUser?: User | null;
  translations?: EquipmentTranslation[] | null;
}

export interface Recipe {
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
  nutrition?: RecipeNutrition | null;
  parts?: RecipePart[] | null;
  ingredients?: RecipeIngredient[] | null;
  equipment?: RecipePieceOfEquipment[] | null;
  steps?: RecipeStep[] | null;
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
  createdByUser?: User | null;
  updatedByUser?: User | null;
  translations?: RecipeTranslation[] | null;
  author?: Author | null;
  tags?: RecipeTag[] | null;
  favouriteds?: FavouritedRecipe[] | null;
  images?: RecipeImage[] | null;
  collections?: CollectionRecipe[] | null;
}

export enum RecipeDifficulty {
  VeryEasy = "VeryEasy",
  Easy = "Easy",
  Average = "Average",
  Difficult = "Difficult",
  VeryDifficult = "VeryDifficult",
}

export interface RecipeImage {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  /** @format int32 */
  sequence: number;
  s3ObjectKey?: string | null;
  /** @format date-time */
  lastUpdatedOn: Date;
  recipe?: Recipe | null;
}

export interface RecipeIngredient {
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
  recipe?: Recipe | null;
  part?: RecipePart | null;
  ingredient?: Ingredient | null;
  unitOfMeasurement?: UnitOfMeasurement | null;
}

export interface RecipeInstruction {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  instruction?: string | null;
  /** @format uuid */
  recipeStepId: string;
  step?: RecipeStep | null;
  translations?: RecipeInstructionTranslation[] | null;
}

export type RecipeInstructionTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeInstructionId: string;
  instruction?: string | null;
};

export interface RecipeNutrition {
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

export interface RecipePart {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  name?: string | null;
  /** @format uuid */
  recipeId: string;
  recipe?: Recipe | null;
  ingredients?: RecipeIngredient[] | null;
  translations?: RecipePartTranslation[] | null;
}

export type RecipePartTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipePartId: string;
  name?: string | null;
};

export interface RecipePieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
  pieceOfEquipment?: PieceOfEquipment | null;
}

export enum RecipeState {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}

export interface RecipeStep {
  /** @format uuid */
  id: string;
  /** @format int32 */
  number: number;
  name?: string | null;
  instructions?: RecipeInstruction[] | null;
  /** @format uuid */
  recipeId: string;
  recipe?: Recipe | null;
  translations?: RecipeStepTranslation[] | null;
}

export type RecipeStepTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeStepId: string;
  name?: string | null;
};

export interface RecipeTag {
  /** @format uuid */
  tagId: string;
  /** @format uuid */
  recipeId: string;
  tag?: Tag | null;
  recipe?: Recipe | null;
}

export type RecipeTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  recipeId: string;
  name?: string | null;
  description?: string | null;
};

export enum RecipeType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Dessert = "Dessert",
  Snack = "Snack",
  Drink = "Drink",
}

export interface RefreshTokensCommand {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface RefreshTokensCommandResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface RegisterUserCommand {
  email?: string | null;
  password?: string | null;
  language?: string | null;
}

export interface RegisterUserCommandResponse {
  /** @format uuid */
  id: string;
}

export type RemovePlannedRecipeCommandResponse = object;

export interface ResetPasswordCommand {
  email?: string | null;
  resetToken?: string | null;
  newPassword?: string | null;
  language?: string | null;
}

export type ResetPasswordCommandResponse = object;

export type StringTranslation = TranslationEntity & {
  key?: string | null;
  value?: string | null;
};

export enum SupportTicketStatus {
  Open = "Open",
  Resolved = "Resolved",
}

export interface Tag {
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
  createdByUser?: User | null;
  updatedByUser?: User | null;
  translations?: TagTranslation[] | null;
  recipes?: RecipeTag[] | null;
}

export type TagTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  tagId: string;
  name?: string | null;
};

export interface TranslationEntity {
  languageCode?: string | null;
}

export interface UnitOfMeasurement {
  /** @format uuid */
  id: string;
  originalLanguageCode?: string | null;
  name?: string | null;
  pluralName?: string | null;
  abbreviation?: string | null;
  type: MeasurementType;
  system?: MeasurementSystem | null;
  representAs: UnitOfMeasurementRepresentation;
  translations?: UnitOfMeasurementTranslation[] | null;
}

export enum UnitOfMeasurementRepresentation {
  Integer = "Integer",
  Decimal = "Decimal",
  Fraction = "Fraction",
}

export type UnitOfMeasurementTranslation = TranslationEntity & {
  /** @format uuid */
  id: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  name?: string | null;
  pluralName?: string | null;
};

export interface UpdatePlannedRecipeCommand {
  /** @format uuid */
  id: string;
  /** @format int32 */
  servings: number;
}

export type UpdatePlannedRecipeCommandResponse = object;

export interface User {
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

export interface AdminCreateAuthorDto {
  /** @minLength 1 */
  name: string;
  biography: string;
  links: AdminCreateAuthorDtoLink[];
}

export interface AdminCreateAuthorDtoLink {
  name: string;
  url: string;
}

export interface AdminCreateAuthorResponseDto {
  /** @format uuid */
  id: string;
}

export interface AdminCreateCollectionDto {
  /** @minLength 1 */
  title: string;
}

export interface AdminCreateCollectionResponseDto {
  /** @format uuid */
  id: string;
}

export interface AdminCreateIngredientDto {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pluralName: string;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
}

export interface AdminCreateIngredientResponseDto {
  /** @format uuid */
  id: string;
}

export interface AdminCreatePieceOfEquipmentDto {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pluralName: string;
}

export interface AdminCreatePieceOfEquipmentResponseDto {
  /** @format uuid */
  id: string;
}

export interface AdminCreateRecipeDto {
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
  parts: AdminCreateRecipeDtoPart[];
  steps: AdminCreateRecipeDtoStep[];
  ingredients: AdminCreateRecipeDtoIngredient[];
  equipment: AdminCreateRecipeDtoPieceOfEquipment[];
  nutrition: AdminCreateRecipeDtoNutrition;
  tags: AdminCreateRecipeDtoTag[];
}

export interface AdminCreateRecipeDtoIngredient {
  /** @format uuid */
  ingredientId: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  /** @format double */
  amount: number;
  optional: boolean;
}

export interface AdminCreateRecipeDtoNutrition {
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

export interface AdminCreateRecipeDtoPart {
  name: string;
  ingredients: AdminCreateRecipeDtoIngredient[];
}

export interface AdminCreateRecipeDtoPieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
}

export interface AdminCreateRecipeDtoStep {
  /** @format int32 */
  number: number;
  name: string;
  instructions: RecipeInstruction[];
}

export interface AdminCreateRecipeDtoTag {
  /** @format uuid */
  id: string;
}

export interface AdminCreateRecipeResponseDto {
  /** @format uuid */
  id: string;
}

export interface AdminCreateTagDto {
  /** @minLength 1 */
  name: string;
  icon: string;
}

export interface AdminCreateTagResponseDto {
  /** @format uuid */
  id: string;
}

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

export interface AdminUpdateAuthorDto {
  /** @minLength 1 */
  name: string;
  biography: string;
  links: AdminUpdateAuthorDtoLink[];
}

export interface AdminUpdateAuthorDtoLink {
  name: string;
  url: string;
}

export type AdminUpdateAuthorResponseDto = object;

export interface AdminUpdateCollectionDto {
  /** @minLength 1 */
  title: string;
  hidden: boolean;
  promoted: boolean;
}

export type AdminUpdateCollectionResponseDto = object;

export interface AdminUpdateIngredientDto {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pluralName: string;
  /** @format uuid */
  defaultUnitOfMeasurementId: string;
}

export type AdminUpdateIngredientResponseDto = object;

export interface AdminUpdatePieceOfEquipmentDto {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pluralName: string;
}

export type AdminUpdatePieceOfEquipmentResponseDto = object;

export interface AdminUpdateRecipeDto {
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
  parts: AdminUpdateRecipeDtoPart[];
  steps: AdminUpdateRecipeDtoStep[];
  ingredients: AdminUpdateRecipeDtoIngredient[];
  equipment: AdminUpdateRecipeDtoPieceOfEquipment[];
  nutrition: AdminUpdateRecipeDtoNutrition;
}

export interface AdminUpdateRecipeDtoIngredient {
  /** @format uuid */
  ingredientId: string;
  /** @format uuid */
  unitOfMeasurementId: string;
  /** @format double */
  amount: number;
  optional: boolean;
}

export interface AdminUpdateRecipeDtoNutrition {
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

export interface AdminUpdateRecipeDtoPart {
  name: string;
  ingredients: AdminUpdateRecipeDtoIngredient[];
}

export interface AdminUpdateRecipeDtoPieceOfEquipment {
  /** @format uuid */
  equipmentId: string;
  /** @format int32 */
  amount: number;
  dependsOnServings: boolean;
}

export interface AdminUpdateRecipeDtoStep {
  /** @format int32 */
  number: number;
  name: string;
  instructions: RecipeInstruction[];
}

export type AdminUpdateRecipeResponseDto = object;

export interface AdminUpdateTagDto {
  /** @minLength 1 */
  name: string;
  icon: string;
  hidden: boolean;
  promoted: boolean;
}

export type AdminUpdateTagResponseDto = object;

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
    export type RequestBody = LoginCommand;
    export type RequestHeaders = {};
    export type ResponseBody = LoginCommandResponse;
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
    export type RequestBody = RefreshTokensCommand;
    export type RequestHeaders = {};
    export type ResponseBody = RefreshTokensCommandResponse;
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
    export type RequestBody = ForgotPasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = ForgotPasswordCommandResponse;
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
    export type RequestBody = ResetPasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = ResetPasswordCommandResponse;
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
    export type RequestBody = ChangeEmailCommand;
    export type RequestHeaders = {};
    export type ResponseBody = ChangeEmailCommandResponse;
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
    export type RequestBody = ChangePasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = ChangePasswordCommandResponse;
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
    export type RequestBody = AddRecipeToPlannerCommand;
    export type RequestHeaders = {};
    export type ResponseBody = AddRecipeToPlannerCommandResponse;
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
    export type RequestBody = AdminCreateAuthorDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateAuthorResponseDto;
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
    export type RequestBody = AdminUpdateAuthorDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateAuthorResponseDto;
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
    export type RequestBody = AdminCreateCollectionDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateCollectionResponseDto;
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
    export type RequestBody = AdminUpdateCollectionDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateCollectionResponseDto;
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
    export type ResponseBody = void;
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
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Equipment
   * @name AdminCreatePieceOfEquipment
   * @request POST:/admin/equipment
   * @secure
   */
  export namespace AdminCreatePieceOfEquipment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminCreatePieceOfEquipmentDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreatePieceOfEquipmentResponseDto;
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
    export type RequestBody = AdminUpdatePieceOfEquipmentDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdatePieceOfEquipmentResponseDto;
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
   * @tags Ingredient
   * @name AdminCreateIngredient
   * @request POST:/admin/ingredients
   * @secure
   */
  export namespace AdminCreateIngredient {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminCreateIngredientDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateIngredientResponseDto;
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
    export type RequestBody = AdminUpdateIngredientDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateIngredientResponseDto;
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
   * @name AdminCreateRecipe
   * @request POST:/admin/recipes
   * @secure
   */
  export namespace AdminCreateRecipe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminCreateRecipeDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateRecipeResponseDto;
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
   * @tags Recipe
   * @name AdminUpdateRecipe
   * @request PUT:/admin/recipes/{id}
   * @secure
   */
  export namespace AdminUpdateRecipe {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminUpdateRecipeDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateRecipeResponseDto;
  }
  /**
   * No description
   * @tags Recipe
   * @name AdminDeleteRecipe
   * @request DELETE:/admin/recipes/{id}
   * @secure
   */
  export namespace AdminDeleteRecipe {
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
   * @name AdminTagRecipe
   * @request POST:/admin/recipes/{recipeId}/tags/{tagId}
   * @secure
   */
  export namespace AdminTagRecipe {
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
   * @name AdminUntagRecipe
   * @request DELETE:/admin/recipes/{recipeId}/tags/{tagId}
   * @secure
   */
  export namespace AdminUntagRecipe {
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
   * @tags SupportTicket
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
    export type RequestBody = AdminCreateTagDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateTagResponseDto;
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
    export type RequestBody = AdminUpdateTagDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateTagResponseDto;
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
    export type RequestBody = CreatePieceOfEquipmentCommand;
    export type RequestHeaders = {};
    export type ResponseBody = CreatePieceOfEquipmentCommandResponse;
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
    export type RequestBody = CreateIngredientCommand;
    export type RequestHeaders = {};
    export type ResponseBody = CreateIngredientCommandResponse;
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
    export type RequestBody = UpdatePlannedRecipeCommand;
    export type RequestHeaders = {};
    export type ResponseBody = UpdatePlannedRecipeCommandResponse;
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
    export type ResponseBody = RemovePlannedRecipeCommandResponse;
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
    export type RequestBody = RegisterUserCommand;
    export type RequestHeaders = {};
    export type ResponseBody = RegisterUserCommandResponse;
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
    export type ResponseBody = DeleteAccountCommandResponse;
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
    login: (data: LoginCommand, params: RequestParams = {}) =>
      this.request<LoginCommandResponse, any>({
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
    refreshTokens: (data: RefreshTokensCommand, params: RequestParams = {}) =>
      this.request<RefreshTokensCommandResponse, any>({
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
    forgotPassword: (data: ForgotPasswordCommand, params: RequestParams = {}) =>
      this.request<ForgotPasswordCommandResponse, any>({
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
    resetPassword: (data: ResetPasswordCommand, params: RequestParams = {}) =>
      this.request<ResetPasswordCommandResponse, any>({
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
    changeEmail: (userId: string, data: ChangeEmailCommand, params: RequestParams = {}) =>
      this.request<ChangeEmailCommandResponse, any>({
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
    changePassword: (userId: string, data: ChangePasswordCommand, params: RequestParams = {}) =>
      this.request<ChangePasswordCommandResponse, any>({
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
    addRecipeToPlanner: (userId: string, data: AddRecipeToPlannerCommand, params: RequestParams = {}) =>
      this.request<AddRecipeToPlannerCommandResponse, any>({
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
    admin_CreateAuthor: (data: AdminCreateAuthorDto, params: RequestParams = {}) =>
      this.request<AdminCreateAuthorResponseDto, any>({
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
    admin_UpdateAuthor: (id: string, data: AdminUpdateAuthorDto, params: RequestParams = {}) =>
      this.request<AdminUpdateAuthorResponseDto, any>({
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
    admin_CreateCollection: (data: AdminCreateCollectionDto, params: RequestParams = {}) =>
      this.request<AdminCreateCollectionResponseDto, any>({
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
    admin_UpdateCollection: (id: string, data: AdminUpdateCollectionDto, params: RequestParams = {}) =>
      this.request<AdminUpdateCollectionResponseDto, any>({
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
      this.request<void, any>({
        path: `/admin/collections/${collectionId}/recipes/${recipeId}`,
        method: "POST",
        secure: true,
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
      this.request<void, any>({
        path: `/admin/collections/${collectionId}/recipes/${recipeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Equipment
     * @name AdminCreatePieceOfEquipment
     * @request POST:/admin/equipment
     * @secure
     */
    admin_CreatePieceOfEquipment: (data: AdminCreatePieceOfEquipmentDto, params: RequestParams = {}) =>
      this.request<AdminCreatePieceOfEquipmentResponseDto, any>({
        path: `/admin/equipment`,
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
     * @tags Equipment
     * @name AdminUpdatePieceOfEquipment
     * @request PUT:/admin/equipment/{id}
     * @secure
     */
    admin_UpdatePieceOfEquipment: (id: string, data: AdminUpdatePieceOfEquipmentDto, params: RequestParams = {}) =>
      this.request<AdminUpdatePieceOfEquipmentResponseDto, any>({
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
     * @tags Ingredient
     * @name AdminCreateIngredient
     * @request POST:/admin/ingredients
     * @secure
     */
    admin_CreateIngredient: (data: AdminCreateIngredientDto, params: RequestParams = {}) =>
      this.request<AdminCreateIngredientResponseDto, any>({
        path: `/admin/ingredients`,
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
     * @tags Ingredient
     * @name AdminUpdateIngredient
     * @request PUT:/admin/ingredients/{id}
     * @secure
     */
    admin_UpdateIngredient: (id: string, data: AdminUpdateIngredientDto, params: RequestParams = {}) =>
      this.request<AdminUpdateIngredientResponseDto, any>({
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
     * @name AdminCreateRecipe
     * @request POST:/admin/recipes
     * @secure
     */
    admin_CreateRecipe: (data: AdminCreateRecipeDto, params: RequestParams = {}) =>
      this.request<AdminCreateRecipeResponseDto, any>({
        path: `/admin/recipes`,
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
     * @tags Recipe
     * @name AdminUpdateRecipe
     * @request PUT:/admin/recipes/{id}
     * @secure
     */
    admin_UpdateRecipe: (id: string, data: AdminUpdateRecipeDto, params: RequestParams = {}) =>
      this.request<AdminUpdateRecipeResponseDto, any>({
        path: `/admin/recipes/${id}`,
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
     * @tags Recipe
     * @name AdminDeleteRecipe
     * @request DELETE:/admin/recipes/{id}
     * @secure
     */
    admin_DeleteRecipe: (id: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/admin/recipes/${id}`,
        method: "DELETE",
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
     * @name AdminTagRecipe
     * @request POST:/admin/recipes/{recipeId}/tags/{tagId}
     * @secure
     */
    admin_TagRecipe: (recipeId: string, tagId: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/admin/recipes/${recipeId}/tags/${tagId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recipe
     * @name AdminUntagRecipe
     * @request DELETE:/admin/recipes/{recipeId}/tags/{tagId}
     * @secure
     */
    admin_UntagRecipe: (recipeId: string, tagId: string, params: RequestParams = {}) =>
      this.request<void, MicrosoftAspNetCoreMvcProblemDetails | MicrosoftAspNetCoreHttpHttpValidationProblemDetails>({
        path: `/admin/recipes/${recipeId}/tags/${tagId}`,
        method: "DELETE",
        secure: true,
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
     * @tags SupportTicket
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
    admin_CreateTag: (data: AdminCreateTagDto, params: RequestParams = {}) =>
      this.request<AdminCreateTagResponseDto, any>({
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
    admin_UpdateTag: (id: string, data: AdminUpdateTagDto, params: RequestParams = {}) =>
      this.request<AdminUpdateTagResponseDto, any>({
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
    createPieceOfRequipment: (data: CreatePieceOfEquipmentCommand, params: RequestParams = {}) =>
      this.request<CreatePieceOfEquipmentCommandResponse, any>({
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
    createIngredient: (data: CreateIngredientCommand, params: RequestParams = {}) =>
      this.request<CreateIngredientCommandResponse, any>({
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
    updatePlannedRecipe: (id: string, data: UpdatePlannedRecipeCommand, params: RequestParams = {}) =>
      this.request<UpdatePlannedRecipeCommandResponse, any>({
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
      this.request<RemovePlannedRecipeCommandResponse, any>({
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
    registerUser: (data: RegisterUserCommand, params: RequestParams = {}) =>
      this.request<RegisterUserCommandResponse, any>({
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
      this.request<DeleteAccountCommandResponse, any>({
        path: `/me`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
