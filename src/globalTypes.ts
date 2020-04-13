/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ThreeDCategoryAngle {
  left = "left",
  right = "right",
}

export enum ThreeDResourceTargetPopulation {
  adults = "adults",
  children = "children",
  seniors = "seniors",
}

export enum ThreeDResourceType {
  category = "category",
  material = "material",
  model = "model",
  texture = "texture",
}

export interface ThreeDCategoryFields {
  id?: number | null;
  slug?: string | null;
  name?: string | null;
  zOrder?: number | null;
  detailLevel?: number | null;
  tags?: string[] | null;
  properties?: ThreeDCategoryPropertiesFields | null;
  parentCategoryId?: number | null;
  parentCategory?: ThreeDCategoryFields | null;
  delete?: boolean | null;
}

export interface ThreeDCategoryPropertiesFields {
  dimensions?: ThreeDDimensionsFields | null;
  angle?: ThreeDCategoryAngle | null;
  isSection?: boolean | null;
}

export interface ThreeDDimensionsFields {
  width?: number | null;
  length?: number | null;
  height?: number | null;
  unit?: string | null;
}

export interface ThreeDResourceFields {
  id?: number | null;
  slug?: string | null;
  name?: string | null;
  type?: ThreeDResourceType | null;
  tags?: string[] | null;
  properties?: ThreeDResourcePropertiesFields | null;
  delete?: boolean | null;
  categoryId?: number | null;
  category?: ThreeDCategoryFields | null;
  roomTypes?: (ThreeDRoomTypeFields | null)[] | null;
}

export interface ThreeDResourceFilters {
  resourceSlug?: string | null;
  resourceType?: ThreeDResourceType | null;
  freesearch?: string[] | null;
  categoryId?: number | null;
  categorySlug?: string | null;
  roomSlugs?: string[] | null;
  tags?: string[] | null;
  properties?: any | null;
}

export interface ThreeDResourcePropertiesFields {
  dimensions?: ThreeDDimensionsFields | null;
  targetPopulation?: ThreeDResourceTargetPopulation | null;
  furnisherTemp?: ThreeDResourcePropertiesFurnisherTempFields | null;
  style?: string | null;
}

export interface ThreeDResourcePropertiesFurnisherTempFields {
  type?: string | null;
}

export interface ThreeDRoomTypeFields {
  id?: number | null;
  slug?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
