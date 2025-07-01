import type { QueryOperator, SumType } from '.'

/**
 * 查询条件类
 */
export interface QueryConditionOptions {
  field?: string
  operator?: QueryOperator | ''
  value?: unknown
  andOr?: 'and' | 'or' | ''
  type?: string
  clazz?: string
}
export class QueryCondition {
  field?: string
  operator?: QueryOperator | ''
  value?: unknown
  andOr?: string
  type?: string
  clazz?: string
  subCondition?: QueryCondition[]
  constructor(options: QueryConditionOptions = {}) {
    this.field = options.field || ''
    this.operator = options.operator || ''
    this.value = options.value || ''
    this.andOr = options.andOr || ''
    this.type = options.type || 'string'
    this.clazz = options.clazz || ''
    this.subCondition = []
  }
}

/**
 * 查询排序类
 */
export class SortParameter {
  sortByAsc: boolean
  sortField: string

  constructor(sortField: string, sortByAsc = true) {
    this.sortByAsc = sortByAsc
    this.sortField = sortField
  }
}

/**
 * 查询分页类
 */
export class PageParameter {
  pageIndex: number
  pageSize: number
  sort: SortParameter[]

  constructor(pageIndex: number = 1, pageSize: number = 20) {
    this.pageIndex = pageIndex
    this.pageSize = pageSize
    this.sort = []
  }
}

/**
 * 查询属性类
 */
export class QueryAttribute {
  key: string
  value: unknown
  type?: string
  constructor(key: string, value: unknown, type?: string) {
    this.key = key
    this.value = value
    this.type = type
  }
}

/**
 * 摘要参数类
 */
export class SummaryParameter {
  fieldName: string
  sumType: SumType
  sumName?: string
  sumValue?: unknown
  sumTitle?: string

  constructor(fieldName: string, sumName: string, sumType: SumType) {
    this.fieldName = fieldName
    this.sumName = sumName
    this.sumType = sumType
  }
}

/**
 * 查询条件集合类
 */
export class QueryParameter {
  queryConditions: QueryCondition[]
  pageParameter: PageParameter
  queryAttributes: QueryAttribute[]
  summaryParameters: SummaryParameter[]
  groups: SummaryParameter[]
  groupSummary: unknown[]
  constructor() {
    this.queryConditions = []
    this.pageParameter = { pageIndex: 1, pageSize: 20, sort: [] }
    this.queryAttributes = []
    this.summaryParameters = []
    this.groups = []
    this.groupSummary = []
  }
}
