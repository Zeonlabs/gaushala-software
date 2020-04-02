import _ from 'lodash'

export const arrangeDate = (data) => {
    const sortedData = _.orderBy(data, [datas => datas.year, data => data.month], ["asc", "asc"]);
    return sortedData
}