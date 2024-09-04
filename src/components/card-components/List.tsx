import React from 'react'
import { ArtsInfo } from '../../constants/types'

interface ListProps<T> {
    artsData: T[];
    artsConfig: T;
    renderItem: (data: T, config: T) => React.ReactNode;
}

function List<T>(props: ListProps<T>) {
  return (
    <div>
      {/* {props.artsData && props.artsData.map(props.renderItem)} */}
    </div>
  )
}

export default List
