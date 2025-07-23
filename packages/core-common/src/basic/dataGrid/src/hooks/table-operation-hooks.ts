import type { TableProps } from '../types'

interface UseTableOperationProps {
  operationConfig: TableProps['operationConfig']
  handleGetData: () => void
}
export function useTableOperation({
  operationConfig,
  handleGetData,
}: UseTableOperationProps) {
  const handleDelete = (row: Record<string, unknown>) => {
    console.log(row, 'row=----')
    try {
      operationConfig?.deleteHandle?.(row)
    }
    catch (error) {
      console.error(error, 'error')
    }
    finally {
      handleGetData()
    }
  }
  return {
    handleDelete,
  }
}
