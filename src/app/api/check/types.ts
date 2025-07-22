import { IEntityContentJson } from "@beefree.io/sdk/dist/types/bee"

/* ========== COMMONS ========== */

export enum CheckAPICategory {
  MISSING_ALT_TEXT = "missingAltText",
  MISSING_IMAGE_LINK = "missingImageLink",
  MISSING_COPY_LINK = "missingCopyLink",
  OVERAGE_IMAGE_WEIGHT = "overageImageWeight",
  OVERAGE_HTML_WEIGHT = "overageHtmlWeight",
  MISSING_DETAILS_EMAIL = "missingDetailsEmail"
}

/* ========== REQUEST TYPES ========== */

export type CheckAPIRequest = {
  template: IEntityContentJson
  checks: (
    | {
      category: CheckAPICategory.OVERAGE_IMAGE_WEIGHT;
      limit: number
    }
    | {
      category: CheckAPICategory.OVERAGE_HTML_WEIGHT
      limit: number
      beautified?: boolean
    }
    | {
      category:
      | CheckAPICategory.MISSING_ALT_TEXT
      | CheckAPICategory.MISSING_IMAGE_LINK
      | CheckAPICategory.MISSING_COPY_LINK
      | CheckAPICategory.MISSING_DETAILS_EMAIL
    }
  )[]
}

/* ========== RESPONSE TYPES ========== */

type WidgetTarget = {
  uuid: string
  widgetType: string
  widgetLabel: string
  detailType: undefined
}

type NonWidgetTarget = {
  uuid: undefined
  widgetType: undefined
  widgetLabel: undefined
  detailType: undefined
}

type CheckTypeToTarget = {
  [CheckAPICategory.MISSING_ALT_TEXT]: WidgetTarget
  [CheckAPICategory.MISSING_COPY_LINK]: WidgetTarget
  [CheckAPICategory.MISSING_IMAGE_LINK]: WidgetTarget
  [CheckAPICategory.OVERAGE_IMAGE_WEIGHT]: WidgetTarget & { weight: number }
  [CheckAPICategory.OVERAGE_HTML_WEIGHT]: NonWidgetTarget & { weight: number; beautified: boolean }
  [CheckAPICategory.MISSING_DETAILS_EMAIL]: NonWidgetTarget & { detailType: string }
}

type CheckTarget = {
  [K in keyof CheckTypeToTarget]: {
    type: K
    targets: CheckTypeToTarget[K][]
  }
}[keyof CheckTypeToTarget]

export enum CheckAPIStatus {
  WARNING = "warning",
  SUGGESTION = "suggestion",
  PASSED = "passed"
}

type CheckAPIType = {
  type: CheckAPICategory
  targets: CheckTarget["targets"]
  targetsCount: number
  checkStatus: CheckAPIStatus
  limit?: number
  evaluated?: number
  errored?: boolean
  processed?: boolean
  maxWeight?: number
  displayConditions?: boolean
}

export type BasicCheckAPIResponse = {
  language: "default" | string
  checks: CheckAPIType[]
  status: CheckAPIStatus
  checksWarningCount: number // warnings
  checksSuggestionCount: number // suggestions
  checksFailedCount: number // warnings + suggestions
  dateTime: Date
}

export type CheckAPIResponse = BasicCheckAPIResponse[]
