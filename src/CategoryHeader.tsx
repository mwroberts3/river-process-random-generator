import { useState } from 'react';

const CategoryHeader = ({ categoryInfo, totalMinutes, minToHours }: { categoryInfo: any, totalMinutes: number, minToHours: Function }) => {

  const [showSubs, setShowSubs] = useState(false);

  return (
    <div onClick={() => setShowSubs(!showSubs)}>{categoryInfo.category} {Math.round(categoryInfo.totalMin / totalMinutes * 100)}% {minToHours(categoryInfo.totalMin)}
      {showSubs && categoryInfo.subCategories.map((sub: any, index: number) => {
        return <li key={index}>{sub.category} {Math.round(sub.totalMin / categoryInfo.totalMin * 100)}% {minToHours(sub.totalMin)}</li>
      })}
    </div>
  )
}

export default CategoryHeader